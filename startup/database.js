/* Database connection file */

const config = require("config");
const logger = require("./logging").logger;
const mysql = require("mysql2");

const db = mysql.createConnection(config.get("dbConnectionDetails"));

const connectDB = function () {
  db.connect((err) => {
    if (err) {
      logger.error(`error connecting to ${db}...${err}`);
    } else {
      logger.info(`connected to database.`);
    }
  });
};

module.exports = {
  connectDB,
  db,
};
