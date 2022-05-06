/**
 * This is express Error middleware. It gets invoked when first argument is passed
 * as err
 */

const { logger } = require("../startup/logging");

const Error = (err, req, res, next) => {
  logger.error("Something went wrong ", err);
  // Ideally this should be logged to some remote error logging service like sentry
  res.status(500).send("Server error occured!");
};

module.exports = Error;
