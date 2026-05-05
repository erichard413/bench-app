const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const teamRoutes = require("./routes/teams");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// routes go here
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);
app.use("/api/teams", teamRoutes);

// handle 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// generic error - anything unhandled goes here

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
