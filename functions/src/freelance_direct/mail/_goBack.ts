import * as Firestore from "../../types/firestore";

export const user = (
  user: Firestore.Person["profile"],
  url: string
): string => {
  return `
${user.name} 様

いつもFreelance Directをご利用いただきありがとうございます。

お客様のアカウントの利用制限を解除いたしました。

ログインはこちらから
${url}

※ このメ－ルアドレスは送信専用です。返信をいただいてもご回答できませんのでご了承ください。
※ ご利用にお心当たりの無い場合は、このメールを破棄してください。
`;
};
