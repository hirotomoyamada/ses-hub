import { timestamp } from "../../../../../../functions/timestamp";
import { fields } from "./fields";

export const resources = ({ selectOutputs }) => {
  const values = selectOutputs.map((outputs) => ({
    createAt: `作成：${timestamp(outputs?.createAt)}`,
    roman: `■ ${
      outputs?.roman
        ? `${outputs?.roman?.firstName.substring(
            0,
            1
          )} . ${outputs?.roman?.lastName.substring(0, 1)}`
        : "不明な人材"
    }`,
    positon: `${outputs?.position}`,
    body: `PR文：\n${outputs?.body}`,
    belong: `所属： ${outputs?.belong}`,
    sex: `性別： ${outputs?.sex}`,
    age: `年齢： ${outputs?.age}歳`,
    period: `開始：${
      outputs?.period &&
      `${outputs?.period?.year}年 ${outputs?.period?.month}月`
    }`,
    station: `最寄：${outputs?.station}`,
    costs: `単価：${
      outputs?.costs?.display !== "public"
        ? outputs?.costs?.type
        : outputs?.costs?.min
        ? `${outputs?.costs?.min}万 〜 ${outputs?.costs?.max}万`
        : `〜 ${outputs?.costs?.max}万`
    }`,
    parallel: `並行：${outputs?.parallel}`,
    note: `備考：\n${outputs?.note && `${outputs?.note}\n`}`,

    skills:
      outputs?.skills?.[0] &&
      fields({ value: "スキル：", objects: outputs?.skills }),
    handles:
      outputs?.handles?.[0] &&
      fields({ value: "言語：", objects: outputs?.handles }),
    tools:
      outputs?.tools?.[0] &&
      fields({ value: "ツール：", objects: outputs?.tools }),
  }));

  return values.map(
    (output, index) =>
      `${output.createAt}\n\n${output.roman}\n\n${output.positon}\n\n${
        output.body
      }\n${output.handles !== undefined ? `\n${output.handles}\n` : ""}${
        output.tools !== undefined ? `\n${output.tools}\n` : ""
      }\n${output.skills}\n\n${output.belong}\n\n${output.sex}\n${output.age}\n
         ${output.period}\n${output.station}\n\n${output.costs}\n\n${
        output.parallel
      }\n\n${output.note}${
        values.length !== index + 1
          ? "\n---------------------------------------------\n\n"
          : "\n"
      }`
  );
};
