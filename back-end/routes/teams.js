// routes for teams

const jsonschema = require("jsonschema");
const teamNew = require("../schema/teamNew.json");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Teams = require("../models/teams");
const router = new express.Router();

const defaultPage = 1;
const defaultLimit = 15;
const orderOptions = ["team_name", "created_at", "id"];
const sortdir = ["ASC", "DESC"];

// GET /teams
// Gets all teams
router.get("/", async function (req, res, next) {
  const teamName = req.query.teamName || null;
  const page = req.query.page || defaultPage;
  const limit = req.query.limit || defaultLimit;
  const orderby = orderOptions.includes(req.query.orderby)
    ? req.query.orderby
    : "team_name";
  const dir = sortdir.includes(req.query.sortdir) ? req.query.sortdir : "ASC";
  const offset = (page - 1) * limit;
  try {
    const totalCount = await Teams.getCount(teamName);
    const teams = await Teams.getTeams({
      teamName,
      limit,
      offset,
      orderby,
      dir,
    });
    return res.json({
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      teams,
    });
  } catch (err) {
    return next(err);
  }
});

// POST /teams
// Creates a new team
router.post("/", async function (req, res, next) {
  const data = req.body;
  const validator = jsonschema.validate(req.body, teamNew);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }
  try {
    const newTeam = await Teams.createTeam(data);
    return res.json(newTeam);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
