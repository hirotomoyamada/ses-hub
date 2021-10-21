const functions = require("firebase-functions");

exports.user = ({ user, nickName, url }) => {
  return `
${user.name} ${user.person} さん

${nickName}さんへのリクエストが承認されました。

【${nickName}さんのプロフィール】
${url}

SES_HUB ${functions.config().app.ses_hub.url}
`;
};
