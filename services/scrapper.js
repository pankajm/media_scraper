/** Promise API to fetch events from provided URL  */

const axios = require("axios");
const parser = require("../utils/parser");
const logger = require("../startup/logging").logger;

/**
 *
 * @param {String} url
 * @returns {Promise}
 */
function scrapForMedia(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const parserResult = parser.parseMedia(response.data);
        resolve(parserResult);
      })
      .catch((error) => {
        logger.error("error while scrapping URL", url);
        reject(error);
      });
  });
}

module.exports = {
  scrapForMedia,
};
