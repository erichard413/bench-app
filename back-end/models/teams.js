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

    if (!result.rows[0])
      throw new BadRquestError("Could not create team! Please try again.");
    return result.rows[0];
  }
  static async doesTeamExist(id) {
    const res = await db.query("SELECT * FROM teams WHERE id=$1", [id]);
    return res.rows.length == 0 ? false : true;
  }
  static async updateTeam(id, data) {
    const { logoUrl, owner, teamName } = data;
    const { setCols, values } = sqlForPartialUpdate(data, {
      logoUrl: "logo_url",
      owner: "owner",
      teamName: "team_name",
    });
    const teamIdx = "$" + (values.length + 1);
    const querySQL = `UPDATE teams SET ${setCols} WHERE id=${teamIdx} RETURNING id, team_name AS "teamName", team_owner AS "teamOwner", logo_url AS "logoUrl", created_at AS "createdAt"`;
    const result = await db.query(querySQL, [...values, id]);
    return result.rows[0];
  }
  static async getTeam(id) {
    const res = await db.query(`SELECT * FROM teams`);
    if (!res.rows[0]) throw new BadRequestError("Team not found!");
    return res.rows[0];
  }
}

module.exports = Teams;
