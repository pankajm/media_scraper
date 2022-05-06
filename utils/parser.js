const cheerio = require("cheerio");

/**
 *
 * @param {String} html
 */
function parseMedia(html) {
  let $ = cheerio.load(html);
  const media = {
    images: [],
    videos: [],
  };
  $("video").each((index, element) => {
    const videoSrc = $(element).attr("src");
    if (videoSrc.includes("https")) media.videos.push(videoSrc);
  });
  $("img").each((index, element) => {
    const imageSrc = $(element).attr("src");
    if (imageSrc.includes("https")) media.images.push(imageSrc);
  });
  return media;
}

module.exports = {
  parseMedia,
};
