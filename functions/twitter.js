const functions = require("firebase-functions");
const Twitter = require("twitter");

const twitter = new Twitter({
  consumer_key: functions.config().twitter.consumer_key,
  consumer_secret: functions.config().twitter.consumer_secret,
  access_token_key: functions.config().twitter.access_token_key,
  access_token_secret: functions.config().twitter.access_token_secret,
});

exports.tweet = (data) => {
  twitter.post("statuses/update", { status: data }, (error) => {
    if (error) {
      throw new functions.https.HttpsError("data-loss", error);
    }
  });
};
