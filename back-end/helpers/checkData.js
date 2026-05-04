"use strict";

const db = require("../db");
const { axios } = require("axios");

class Checks {
  static async emailCheck(email) {
    const res = await db.query(
      `SELECT CASE WHEN EXISTS (SELECT email FROM users WHERE email=$1) THEN 1 ELSE 0 END`,
      [email.toLowerCase()],
    );
    return res.rows[0].case == 1 ? true : false;
  }
  static async usernameCheck(username) {
    const res = await db.query(
      `SELECT CASE WHEN EXISTS (SELECT username FROM users WHERE username=$1) THEN 1 ELSE 0 END`,
      [username.toLowerCase()],
    );
    return res.rows[0].case == 1 ? true : false;
  }
}

module.exports = Checks;
