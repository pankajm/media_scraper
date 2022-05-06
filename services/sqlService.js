const { db } = require("../startup/database");

/**
 *
 * @param {Array} mediaUrls
 * @returns {Promise}
 */
const storeMediaInDB = (mediaUrls) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO media_info (media_url, type) VALUES ?";
    const values = [...mediaUrls];

    db.query(sql, [values], function (err) {
      if (err) return reject(err);
      else return resolve();
    });
  });
};

/**
 *
 * @returns {Promise}
 */
const getMediaFromDB = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from media_info";
    console.log("hehe");
    db.query(sql, function (err, result) {
      if (err) return reject(err);
      else return resolve(result);
    });
  });
};

module.exports = {
  storeMediaInDB,
  getMediaFromDB,
};
