// routes for users

const jsonschema = require("jsonschema");
const rosterAddSchema = require("../schema/rosterAdd.json");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError, NotFoundError } = require("../expressError");
const Roster = require("../models/roster");
const User = require("../models/user");
const Season = require("../models/season");
const Teams = require("../models/teams");
const router = new express.Router();

// GET /:id
// Gets basic roster information
router.get("/:id", async function (req, res, next) {
  const seasonId = req.query.season || null;
  try {
    const id = req.params.id;
    const result = await Roster.getRoster(id, seasonId);
    if (result.rows.length === 0) throw new NotFoundError("No roster found!");
    return res.status(200).json(result.rows);
  } catch (err) {
    return next(err);
  }
});

// POST /add/:teamId
// Adds player to roster
router.post("/add/:teamId", async function (req, res, next) {
  try {
    const teamId = req.params.teamId;
    const validator = jsonschema.validate(req.body, rosterAddSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new NotFoundError(errs);
    }
    const { userId, seasonId, jerseyNumber, position } = req.body;
    // make sure player isn't already on roster:
    if (await Roster.isPlayerOnRoster(userId, teamId, seasonId))
      throw new BadRequestError("Player is already on roster!");
    // check for valid team:
    const isValidTeam = await Teams.doesTeamExist(teamId);
    if (!isValidTeam) throw new NotFoundError("Team not found!");
    // check for valid user id:
    const userCheck = await User.getUserById(userId);
    if (userCheck.rows.length === 0) throw new NotFoundError("User not found!");
    // check for valid season id:
    const seasonCheck = await Season.getSeason(seasonId);
    if (seasonCheck.rows.length === 0)
      throw new NotFoundError("Season not found!");
    // check if jerseyNumber is available:
    const isValidNumber = await Roster.isValidJerseyNumber(
      jerseyNumber,
      teamId,
      seasonId,
    );

    if (!isValidNumber)
      throw new BadRequestError(
        "Jersey number is taken. Please choose another!",
      );

    const result = await Roster.addPlayer({ teamId, ...req.body });
    return res.status(201).json({ message: "Player added successfully!" });
  } catch (err) {
    return next(err);
  }
});

// DELETE /rosters/delete/:roster_id/season/:season_id/player/:player_id
// removes player from roster
router.delete(
  "/delete/:team_id/season/:season_id/player/:player_id",
  async function (req, res, next) {
    try {
      const player = req.params.player_id;
      const team = req.params.team_id;
      const season = req.params.season_id;
      // make sure player is already on the roster:
      const playerCheck = await Roster.isPlayerOnRoster(player, team, season);
      if (!playerCheck) {
        throw new BadRequestError("Player is not on roster.");
      }
      // make sure season is valid
      const seasonCheck = await Season.getSeason(season);
      if (seasonCheck.rows.length === 0)
        throw new NotFoundError("Season not found!");
      // check for valid team:
      const isValidTeam = await Teams.doesTeamExist(team);
      if (!isValidTeam) throw new NotFoundError("Team not found!");
      // do SQL deletion
      const result = await Roster.removePlayer(player, team, season);
      // NOTE: I am not sure what information I want to return here. Might change this later on.
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
