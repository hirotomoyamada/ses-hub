import * as functions from "firebase-functions";
import * as Firestore from "../../types/firestore";

export const user = ({
  user,
  body,
  url,
}: {
  user: Firestore.Company["profile"];
  body: string;
  url: string;
}): string => {
  return `
以下の内容でリクエストをしました。

会社名：
${user.name}

お名前：
${user.person}

メッセージ：
${body}

【エンジニア情報】
${url}

SES_HUB ${functions.config().app.ses_hub.url}
`;
};

export const selectUser = ({
  user,
  body,
  url,
}: {
  user: Firestore.Person["profile"];
  body: string;
  url: string;
}): string => {
  return `
${user.nickName} ( ${user.name} ) さんへ、リクエストがあります。

メッセージ：
${body}

ユーザー情報：
${url}

Freelance Direct ${functions.config().app.freelance_direct.url}
`;
};
