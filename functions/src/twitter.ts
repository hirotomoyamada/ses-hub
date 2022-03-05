import * as functions from "firebase-functions";
import Twitter from "twitter-api-v2";

// const seshub = new Twitter({
//   appKey: functions.config().twitter.ses_hub.api_key,
//   appSecret: functions.config().twitter.ses_hub.api_secret_key,
//   accessToken: functions.config().twitter.ses_hub.access_token_key,
//   accessSecret: functions.config().twitter.ses_hub.access_token_secret_key,
// });

const freelanceDirect = new Twitter({
  appKey: functions.config().twitter.freelance_direct.api_key,
  appSecret: functions.config().twitter.freelance_direct.api_secret_key,
  accessToken: functions.config().twitter.freelance_direct.access_token_key,
  accessSecret:
    functions.config().twitter.freelance_direct.access_token_secret_key,
});

export const tweet = {
  seshub: async (data: string): Promise<void> => {
    // await seshub.v1.tweet(data);
    return;
  },

  freelanceDirect: async (data: string): Promise<void> => {
    await freelanceDirect.v1.tweet(data);
  },
};
