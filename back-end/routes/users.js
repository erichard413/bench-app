// routes for users

const jsonschema = require("jsonschema");
const userNew = require("../schema/userNew.json");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { paginatedResults } = require("../helpers/paginatedResults");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const router = new express.Router();

const defaultPage = 1;
const defaultLimit = 15;

// GET /
// Gets list of all users. Admin required.
router.get("/", ensureAdmin, async function (req, res, next) {
  const username = req.query.username || null;

  try {
    const page = req.query.page || defaultPage;
    const limit = req.query.limit || defaultLimit;
    const offset = (page - 1) * limit;
    // query the database using pagination:
    const users = await User.getPage({ username, limit, offset });
    const totalCount = await User.getCount({ username });

    return res.json({
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      users,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
