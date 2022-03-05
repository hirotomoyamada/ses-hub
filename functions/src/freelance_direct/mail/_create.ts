import * as functions from "firebase-functions";
import * as Firestore from "../../types/firestore";

export const admin = (
  user: Firestore.Person["profile"],
  url: string
): string => {
  return `
以下のユーザーが承認を待っています。

お名前：
${user.name}

メールアドレス：
${user.email}

年齢：
${user.age}歳

性別：
${user.sex}

ポジション：
${user.position}

エリア：
${user.location}

Freelance Direct 管理画面
URL : ${url}
`;
};

export const user = (
  user: Firestore.Person["profile"],
  url: string
): string => {
  return `
${user.name} 様

ご登録いただきありがとうございます。

登録の確認メールをお送りします。
尚、承認が完了するまで翌３営業日程掛かる場合がございます。ご了承くださいませ。

以下の内容でお問い合わせを承りました。

お名前：
${user.name}

メールアドレス：
${user.email}

年齢：
${user.age}歳

性別：
${user.sex}

ポジション：
${user.position}

エリア：
${user.location}

※ ユーザー登録にお心当たりの無い場合は、このメールを破棄してください。
※ 翌３営業日以上、承認が無い場合はお手数ですが下記のメールアドレスへお問い合わせください。

Freelance Direct ${url}

${functions.config().admin.freelance_direct}
`;
};
