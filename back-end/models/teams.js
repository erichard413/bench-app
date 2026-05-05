"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { axios } = require("axios");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const randomstring = require("randomstring");

/** related functions for teams */

class Teams {
  static async getTeams({ teamName, limit, offset, orderby, dir }) {
    let sql = `SELECT * FROM teams`;
    let params = [];
    if (teamName) {
      params.push(`%${teamName}%`);
      sql += ` WHERE team_name ILIKE $${params.length}`;
    }

    sql += ` ORDER BY ${orderby} ${dir}`;
    if (limit) {
      params.push(limit);
      sql += ` LIMIT $${params.length}`;
    }
    console.log(sql);
    const result = await db.query(sql, params);
    return result.rows;
  }
  static async getCount(teamName) {
    let sql = `SELECT COUNT(*) FROM teams`;
    let params = [];
    sql += ` WHERE team_name ILIKE $1`;
    params.push(`%${teamName}%`);
    const result = await db.query(sql, params);
    return parseInt(result.rows[0].count);
  }
  static async createTeam({ teamName }) {
    const result = await db.query(
      `INSERT INTO teams (team_name) VALUES ($1) RETURNING id`,
      [teamName],
    );
    console.log(result);
    if (!result.rows[0])
      throw new BadRquestError("Could not create team! Please try again.");
    return result.rows[0];
  }
}

module.exports = Teams;
