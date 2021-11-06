const functions = require("firebase-functions");

exports.user = ({ user, type, body, url }) => {
  return `
以下の内容でリクエストをしました。

会社名：
${user.name}
${
  type !== "corporate"
    ? `
お名前：
${user.person}

`
    : ``
}
メッセージ：
${body}

【エンジニア情報】
${url}

SES_HUB ${functions.config().app.ses_hub.url}
`;
};

exports.selectUser = ({ user, type, body, url }) => {
  return `
${user.nickName} ( ${user.name} ) さんへ、リクエストがあります。

メッセージ：
${body}

${type !== "corporate" ? "ユーザー" : "企業"}情報：

${url}

Freelance Direct ${functions.config().app.freelance_direct.url}
`;
};
