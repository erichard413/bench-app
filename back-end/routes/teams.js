// routes for teams

const jsonschema = require("jsonschema");
const teamNew = require("../schema/teamNew.json");
const teamUpdate = require("../schema/teamUpdate.json");
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

// PATCH /teams/:id
// updates team information for team ID
router.patch("/:id", async function (req, res, next) {
  const data = req.body;
  const id = req.params.id;
  const validator = jsonschema.validate(req.body, teamUpdate);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }
  // check if team exists
  const doesExist = await Teams.doesTeamExist(id);
  if (!doesExist) throw new BadRequestError(`Team not found!`);
  try {
    const updatedTeam = await Teams.updateTeam(id, data);
    return res.json(updatedTeam);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
