"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { axios } = require("axios");
const Checks = require("../helpers/checkData");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const randomstring = require("randomstring");

/** related functions for users */

class User {
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
        id,
        password,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        created_at,
        is_admin AS "isAdmin"
        FROM users
        WHERE username=$1
        `,
      [username.toLowerCase()],
    );
    const user = result.rows[0];

    if (user) {
      // validate hash password to user inputted password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }
    // if not valid, return error for invalid password/username
    throw new UnauthorizedError("Invalid username/password");
  }
  static async register({ username, password, firstName, lastName, email }) {
    // check for duplicate username

    if (await Checks.usernameCheck(username))
      throw new BadRequestError(
        `Username is already taken! Please choose another.`,
      );
    if (await Checks.emailCheck(email))
      throw new BadRequestError(
        `Email ${email.toLowerCase()} is already associated with an account!`,
      );

    if (username.toLowerCase() === "anonymous")
      throw new BadRequestError(`Invalid username, please choose another.`);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, created_at, is_admin, display_name) VALUES ($1, $2, $3, $4, $5, NOW(), FALSE, $6) RETURNING username, first_name AS "firstName", last_name AS "lastName", email, created_at AS "createdAt", is_admin AS "isAdmin", display_name AS "displayName"`,
      [
        username.toLowerCase(),
        hashedPassword,
        firstName,
        lastName,
        email.toLowerCase(),
        username,
      ],
    );
    const user = result.rows[0];
    return user;
  }
  static async getCount({ username }) {
    let sql = `SELECT COUNT(*) FROM users`;
    let params = [];
    sql += ` WHERE username ILIKE $1`;
    params.push(`%${username}%`);

    const result = await db.query(sql, params);
    return parseInt(result.rows[0].count);
  }
  static async getPage({ username, limit, offset }) {
    let sql = `SELECT username, first_name AS "firstName", last_name AS "lastName", email, created_at AS "createdAt", display_name AS "displayName" FROM users`;
    let params = [];
    if (username) {
      params.push(`%${username}%`);
      sql += ` WHERE username ILIKE $${params.length}`;
    }
    if (limit) {
      params.push(limit);
      sql += ` LIMIT $${params.length}`;
    }

    const result = await db.query(sql, params);
    return result.rows;
  }
  static async getUser(username) {
    let sql = `SELECT username, first_name AS "firstName", last_name AS "lastName", display_name AS "displayName" FROM users WHERE username=$1`;
    const result = await db.query(sql, [username]);
    return result.rows;
  }
  static async getUserById(id) {
    let sql = `SELECT username, first_name AS "firstName", last_name AS "lastName", display_name AS "displayName" FROM users WHERE id=$1`;
    const result = await db.query(sql, [id]);
    return result;
  }

  static async adminGetUser(username) {
    let sql = `SELECT username, first_name AS "firstName", last_name AS "lastName", email, created_at AS "createdAt", is_admin AS "isAdmin" FROM users WHERE username=$1`;
    const result = await db.query(sql, [username]);
    return result.rows;
  }
  static async updateUser(username, data) {
    // delete is_admin to prevent authorization attack
    delete data.is_admin;
    // encrypt the password, if data contains it.
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }
    if (data.email && (await Checks.emailCheck(data.email)))
      throw new BadRequestError(
        `Email ${data.email.toLowerCase()} is already associated with an account!`,
      );
    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      email: "email",
    });
    const usernameVarIdx = "$" + (values.length + 1);
    const querySQL = `UPDATE users SET ${setCols} WHERE username=${usernameVarIdx} RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`;
    const result = await db.query(querySQL, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
    delete user.password;
    return user;
  }
  static async deleteUser(username) {
    const userCheck = await db.query(
      `SELECT first_name FROM users WHERE username=$1`,
      [username],
    );
    if (!userCheck.rows[0])
      throw new NotFoundError(`Couldn't find username of ${username}`);
    await db.query(`DELETE FROM users WHERE username=$1`, [username]);
    return;
  }
}

module.exports = User;
