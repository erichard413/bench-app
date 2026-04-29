"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { axios } = require("axios");

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
      [username],
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
    const duplicateCheck = await db.query(
      `SELECT username FROM users WHERE username=$1`,
      [username.toLowerCase()],
    );
    // check for duplicate email address
    const emailCheck = await db.query(
      `SELECT username FROM users WHERE email=$1`,
      [email.toLowerCase()],
    );
    if (emailCheck.rows[0])
      throw new BadRequestError(
        `Email ${email.toLowerCase()} is already associated with an account!`,
      );
    if (duplicateCheck.rows[0])
      throw new BadRequestError(
        `Username is already taken! Please choose another.`,
      );
    if (username.toLowerCase() === "anonymous")
      throw new BadRequestError(`Invalid username, please choose another.`);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, created_at, is_admin) VALUES ($1, $2, $3, $4, $5, NOW(), FALSE) RETURNING username, first_name AS "firstName", last_name AS "lastName", email, created_at AS "createdAt", is_admin AS "isAdmin"`,
      [
        username.toLowerCase(),
        password,
        firstName,
        lastName,
        email.toLowerCase(),
      ],
    );
    const user = result.rows[0];
    return user;
  }
  static async getCount({ username, uexact }) {
    let sql = `SELECT COUNT(*) FROM users`;
    let params = [];
    if (username && !uexact) {
      sql += ` WHERE username ILIKE $1`;
      params.push(`%${username}%`);
    }
    if (username && uexact) {
      sql += ` WHERE username=$1`;
    }
    const result = await db.query(sql, params);
    return parseInt(result.rows[0].count);
  }
  static async getPage({ username, limit, offset }) {
    let sql = `SELECT username, first_name AS "firstName", last_name AS "lastName", email, created_at AS "createdAt" FROM users`;
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
}

module.exports = User;
