import * as functions from "firebase-functions";
import * as Firestore from "../../types/firestore";

export const user = ({
  user,
  nickName,
  url,
}: {
  user: Firestore.Company["profile"];
  nickName: string;
  url: string;
}): string => {
  return `
${user.name} ${user.person} さん

${nickName}さんへのリクエストが承認されました。

【${nickName}さんのプロフィール】
${url}

SES_HUB ${functions.config().app.ses_hub.url}
`;
};
