import * as Firestore from "../../types/firestore";

export const user = (
  user: Firestore.Company["profile"],
  url: string
): string => {
  return `
${user.name} ${user.person} 様

承認の完了メールをお送りします。

ログインはこちらから
${url}
`;
};
