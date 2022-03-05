import * as functions from "firebase-functions";
import { Data } from "./contact";

export const admin = (data: Data): string => {
  return `
以下の内容でお問い合わせをいただきました。

会社名：
${data.company ? data.company : "記入無し"}

お名前：
${data.person}

役職：
${data.position ? data.position : "記入無し"}

メールアドレス：
${data.email}

お問い合わせ内容：
${data.body}

`;
};

export const user = (data: Data, url: string): string => {
  return `
${data.company && `${data.company} `}${data.person} 様

お問い合わせいただきありがとうございます。
以下の内容でお問い合わせを承りました。

会社名：
${data.company ? data.company : "記入無し"}

お名前：
${data.person}

役職：
${data.position ? data.position : "記入無し"}

メールアドレス：
${data.email}

お問い合わせ内容：
${data.body}

※ 当メールにお心当たりのない場合やご不明な点がある場合は、当メールの送信元アドレスへお問い合わせください。

SES_HUB ${url}

${functions.config().admin.ses_hub}
`;
};
