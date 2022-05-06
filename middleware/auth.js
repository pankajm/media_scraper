/**
 * This is basicAuth server middleware. It uses authentication service to validate
 * credentials sent in request header
 */

const userService = require("../services/user");
const { logger } = require("../startup/logging");

async function basicAuth(req, res, next) {
  // check for basic auth header
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing in the request" });
  }

  // verify auth credentials
  const authorizationString = req.headers.authorization.split(" ")[1];
  const [username, password] = authorizationString.split(":");

  try {
    const user = await userService.authenticate(username, password);
    if (!user.length) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials" });
    }

    // add user to request object so that next middlware have access to user data
    req.user = user[0];
    next();
  } catch (ex) {
    logger.error("error while athenticating credentials", ex);
    next(ex);
  }
}

module.exports = basicAuth;
