const functions = require("firebase-functions");

const BitlyClient = require("bitly").BitlyClient;

const bitly = new BitlyClient(functions.config().bitly.access_token);

exports.shortUrl = async (data) => {
  const { link } = await bitly.shorten(data);

  return link;
};
