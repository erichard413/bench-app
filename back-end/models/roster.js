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
// USERS id | first_name | last_name |         email         |          created_at           |  username   |                           password                           | is_admin | display_name
//  ROSTERS user_id | team_id | season_id | jersey_number |  role
// SEASONS id |    name     |     start_date      |      end_date
// ROSTER_POSITIONS user_id | team_id | season_id | position_id
class Teams {
  static async getRoster(teamId, seasonId) {
    let sql = `SELECT
      c.first_name AS "first_name",
      c.last_name AS "last_name",
      c.display_name,
      rosters.team_id AS "team_id",
      rosters.season_id AS "season_id",
      s.name AS "season_name",
      s.start_date AS "season_start",
      s.end_date AS "season_end",
      rosters.jersey_number,
      rosters.role,
      JSON_AGG(p.position_id) AS "positions"

    FROM rosters

    JOIN users AS c
      ON rosters.user_id = c.id

    JOIN seasons AS s
      ON rosters.season_id = s.id

    JOIN roster_positions AS p
      ON rosters.user_id = p.user_id
      AND rosters.team_id = p.team_id
      AND rosters.season_id = p.season_id

    WHERE rosters.team_id = $1
  `;
    let params = [teamId];
    if (seasonId) {
      sql += " AND s.id = $2";
      params.push(seasonId);
    } else {
      sql +=
        " AND s.id = (SELECT id FROM seasons ORDER BY start_date DESC LIMIT 1)";
    }
    sql += `
    GROUP BY
      c.first_name,
      c.last_name,
      c.display_name,
      rosters.team_id,
      rosters.season_id,
      s.name,
      s.start_date,
      s.end_date,
      rosters.jersey_number,
      rosters.role

    ORDER BY rosters.jersey_number ASC
  `;

    const res = await db.query(sql, params);
    return res;
  }
  // add player to roster -> takes incoming user id and adds player to team_id's roster.
  // static async addPlayer({user_id, pos_id, role, team_id, jersey_number, season_id}) {
  //   await db.query(`INSERT INTO roster_positions (user_id, team_id, season_id, position_id) VALUES ($1, $2, $3, $4)`, [user_id, team_id, season_id, pos_id]);
  //   const res = await db.query(`INSERT INTO rosters (user_id, team_id, season_id, jersey_number, role) VALUES ($1, $2, $3, $4, $5)`, [user_id, team_id, season_id, jersey_number, role])
  // }
  static async addPlayer({
    userId,
    position,
    role,
    teamId,
    jerseyNumber,
    seasonId,
  }) {
    const res = await db.query(
      `
    WITH inserted_position AS (
      INSERT INTO roster_positions
        (user_id, team_id, season_id, position_id)
      VALUES ($1, $2, $3, $4)
    )
    INSERT INTO rosters
      (user_id, team_id, season_id, jersey_number, role)
    VALUES ($1, $2, $3, $5, $6)
    RETURNING *;
    `,
      [userId, teamId, seasonId, position, jerseyNumber, role],
    );
    return res.rows[0];
  }
  static async isPlayerOnRoster(playerId, teamId, seasonId) {
    const res = await db.query(
      "SELECT * FROM rosters WHERE user_id=$1 AND team_id=$2 AND season_id=$3",
      [playerId, teamId, seasonId],
    );
    return res.rows.length === 0 ? false : true;
  }
  static async isValidJerseyNumber(number, teamId, seasonId) {
    const res = await db.query(
      "SELECT * FROM rosters WHERE jersey_number=$1 AND team_id=$2 AND season_id=$3",
      [number, teamId, seasonId],
    );
    return res.rows.length === 0 ? true : false;
  }
  // remove player from roster -> takes player id, season, team id
  static async removePlayer(player, team, season) {
    const res = await db.query(
      "DELETE FROM rosters WHERE user_id=$1 AND team_id=$2 AND season_id=$3 RETURNING *",
      [player, team, season],
    );
    console.log(res.rows);
    return res.rows;
  }
}

module.exports = Teams;
