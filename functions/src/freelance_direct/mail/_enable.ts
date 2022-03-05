import * as Firestore from "../../types/firestore";

export const user = (
  user: Firestore.Person["profile"],
  url: string
): string => {
  return `
${user.name} 様

承認の完了メールをお送りします。

ログインはこちらから
${url}
`;
};
