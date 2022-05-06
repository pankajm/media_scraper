const md5 = require("md5"); // passwords are stored in md5 format in database
const { db } = require("../startup/database");

function authenticate(username, password) {
  // Get user from db
  return new Promise((resolve, reject) => {
    const md5password = md5(password);
    const sql =
      "SELECT id, username FROM users WHERE username = ? AND password = ?";

    db.query(sql, [username, md5password], function (err, results) {
      if (err) return reject(err);
      console.log(results);
      return resolve(results);
    });
  });
}

module.exports = {
  authenticate,
};
