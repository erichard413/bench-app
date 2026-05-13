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

/** related functions for seasons */

class Season {
  static async getSeason(id) {
    const res = await db.query(`SELECT * FROM seasons WHERE id=$1`, [id]);
    return res;
  }
}

module.exports = Season;
