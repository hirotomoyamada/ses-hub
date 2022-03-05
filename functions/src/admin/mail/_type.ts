import * as Firestore from "../../types/firestore";

export const user = (
  user: Firestore.Company["profile"],
  url: string
): string => {
  return `
${user.name} ${user.person} 様

法人アカウントの申請を承認いたしました。

法人プランはこちらから
${url}
`;
};
