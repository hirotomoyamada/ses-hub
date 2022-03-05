import * as functions from "firebase-functions";
import * as Firestore from "../../types/firestore";

export const admin = (
  user: Firestore.Company["profile"],
  url: string
): string => {
  return `
以下のユーザーが承認を待っています。

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

export const user = (
  user: Firestore.Company["profile"],
  url: string
): string => {
  return `
${user.name} ${user.person} 様

ご登録いただきありがとうございます。

登録の確認メールをお送りします。
尚、承認が完了するまで翌３営業日程掛かる場合がございます。ご了承くださいませ。

以下の内容でお問い合わせを承りました。

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

※ ユーザー登録にお心当たりの無い場合は、このメールを破棄してください。
※ 翌３営業日以上、承認が無い場合はお手数ですが下記のメールアドレスへお問い合わせください。

SES_HUB ${url}

${functions.config().admin.ses_hub}
`;
};
