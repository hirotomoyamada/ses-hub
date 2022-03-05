import * as functions from "firebase-functions";
import * as Firestore from "../../types/firestore";

export const user = (
  user: Firestore.Person["profile"],
  url: string
): string => {
  return `
${user.name} 様

いつもFreelance Directをご利用いただきありがとうございます。

お客様のアカウントは、利用規約第●条・第●●条に抵触していると判断したため、無期限利用制限の措置を行いました。

恐縮ですが、該当する具体的な禁止行為や判断基準についてはご案内しておりませんのでご了承ください。

また、利用制限・禁止行為にお心当たりの無い場合は、恐れ入りますが下記のサポートメールまでお問い合わせください。

サポートメール： ${functions.config().admin.freelance_direct}

※ このメ－ルアドレスは送信専用です。返信をいただいてもご回答できませんのでご了承ください。
※ ご利用にお心当たりの無い場合は、このメールを破棄してください。

Freelance Direct ${url}
`;
};
