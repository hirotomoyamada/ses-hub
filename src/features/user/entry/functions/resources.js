import { timestamp } from "../../../../functions/timestamp";

export const resources = ({ post }) => {
  const skills = post?.skills?.map((skill) => skill && `・${skill}`);
  const skillsArray = skills && skills.join("\n");

  const value = {
    createAt: `作成：${timestamp(post?.createAt)}\n`,
    roman: `■ ${
      post?.roman
        ? `${post?.roman?.firstName.substring(
            0,
            1
          )} . ${post?.roman?.lastName.substring(0, 1)}`
        : "不明な人材"
    }`,
    positon: `${post?.position}\n`,
    belong: `所属： ${post?.belong}`,
    sex: `性別： ${post?.sex}`,
    age: `年齢： ${post?.age}歳\n`,
    period: `開始：${
      post.period && `${post?.period?.year}年 ${post?.period?.month}月`
    }`,
    station: `最寄：${post?.station}\n`,
    costs: `単価：${
      post?.costs?.display !== "public"
        ? post?.costs?.type
        : post?.costs?.min
        ? `${post?.costs?.min}万 〜 ${post?.costs?.max}万`
        : `〜 ${post?.costs?.max}万`
    }\n`,
    skills: `スキル：\n${skillsArray}\n`,
  };

  return `${value.createAt}\n${value.roman}\n${value.positon}\n${value.belong}\n${value.sex}\n${value.age}\n${value.period}\n${value.station}\n${value.costs}\n${value.skills}\n`;
};
