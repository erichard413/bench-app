// routes for users

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const router = new express.Router();

// GET /:username
// Gets basic user information
// Will output full data for admin or correct user
router.get("/:username", async function (req, res, next) {
  try {
    const username = req.params.username;
    const user = res.locals.user;

    // add boolean check for admin vs regular user here
    let foundUser = null;
    if (user && user.isAdmin) {
      foundUser = await User.adminGetUser(username);
    } else {
      foundUser = await User.getUser(username);
    }

    if (foundUser.length == 0) throw new BadRequestError("No user found!");
    return res.json(foundUser[0]);
  } catch (err) {
    return next(err);
  }
});
// PATCH /:username
// Updates user information
// Will output mutated information
router.patch(
  "/:username",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      const username = req.params.username;
      const result = await User.updateUser(req.params.username, req.body);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  },
);

// DELETE /:username
// Deletes user from DB.
// Auth required: Admin ONLY
router.delete("/:username", ensureAdmin, async function (req, res, next) {
  try {
    await User.deleteUser(req.params.username);
    return res
      .status(200)
      .json({ message: `User of username ${req.params.username} deleted!` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
