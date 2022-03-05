import * as Firestore from "../../types/firestore";

export const admin = (
  user: Firestore.Company["profile"],
  url: string
): string => {
  return `
以下のユーザーから法人アカウントの申請があります。

会社名：
${user.name}

担当者名：
${user.person}
${
  user.position
    ? `
役職：
${user.position}

`
    : ``
}
住所：
${user.postal && user.address ? `〒${user.postal} ${user.address}` : "記入なし"}

電話番号：
${user.tel ? user.tel : "記入無し"}

メールアドレス：
${user.email}

SES_HUB 管理画面
URL : ${url}
`;
};
