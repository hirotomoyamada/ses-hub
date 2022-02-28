const functions = require("firebase-functions");
const Twitter = require("twitter-api-v2");

const seshub = new Twitter({
  appKey: functions.config().twitter.ses_hub.consumer_key,
  appSecret: functions.config().twitter.ses_hub.consumer_secret,
  accessToken: functions.config().twitter.ses_hub.access_token_key,
  accessSecret: functions.config().twitter.ses_hub.access_token_secret,
});

// const freelanceDirect = new Twitter({
//   appKey: functions.config().twitter.freelance_direct.consumer_key,
//   appSecret: functions.config().twitter.freelance_direct.consumer_secret,
//   accessToken: functions.config().twitter.freelance_direct.access_token_key,
//   accessSecret: functions.config().twitter.freelance_direct.access_token_secret,
// });

export const tweet = {
  seshub: async (data) => {
    await seshub.v1.tweet(data);
  },

  freelanceDirect: async (data) => {
    // await freelanceDirect.v1.tweet(data);
  },
};
