import * as Firestore from "../../types/firestore";

export const user = (
  user: Firestore.Company["profile"],
  url: string
): string => {
  return `
${user.name} ${user.person} 様

この度はお申し込みいただきありがとうございます。

さて、この度お申し込みいただきました内容につきましては、
総合的な審査を行った結果、誠に恐縮ではございますが
今回はお見送りさせていただくことになりました。
お詫び方々ご通知申し上げます。

※ このメ－ルアドレスは送信専用です。返信をいただいてもご回答できませんのでご了承ください。
※ お申し込みにお心当たりの無い場合は、このメールを破棄してください。

SES_HUB ${url}
`;
};
