const express = require("express");
const router = express.Router();
const { httpCodes } = require("../constants");
const { logger } = require("../startup/logging");
const scrappingService = require("../services/scrapper");
const basicAuth = require("../middleware/auth");
const { storeMediaInDB, getMediaFromDB } = require("../services/sqlService");

/** Get API for scrapping events data */
router.post("/scrapMedia", [basicAuth], async (req, res, next) => {
  try {
    const urls = req.body.urlArray;

    /**
     * 1. If there are thousands of URLs in an array then it would be more feasible
     *    to process them in batches of lets say 100 (depending on server capacity)
     * 2. It will take more time but it will make sure that server wont crash
     * 3. Real time scrapping is time consuming so, this scrapping should be asynchronous one
     *    it can be triggered via CRON job and the results here are exposed via
     *    different API.
     */

    const promises = urls.map((url) => {
      return scrappingService.scrapForMedia(url);
    });

    // Promise.allSettled will return result of every promise either fulfilled or rejected

    Promise.allSettled(promises).then(async (results) => {
      let mediaUrls = [];
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          result.value.images.forEach((image) => {
            mediaUrls.push([image, "image"]);
          });
          result.value.videos.forEach((video) => {
            mediaUrls.push([video, "video"]);
          });
        }
      });

      try {
        const response = await storeMediaInDB(mediaUrls);
        return res.status(200).send(httpCodes["200"]);
      } catch (err) {
        logger.error("error while storing data in db", err);
        next(err);
      }
    });
  } catch (err) {
    // Log this error to remote logging service like sentry or bugsnag
    logger.error("error in Scrapping api");
    next(err);
  }
});

/* API to expose media data to client */
router.get("/getMedia", [basicAuth], async (req, res, next) => {
  try {
    const response = await getMediaFromDB();
    return res.status(200).json(response);
  } catch (err) {
    logger.error("error while geting media data from db", err);
    next(err);
  }
});

module.exports = router;
