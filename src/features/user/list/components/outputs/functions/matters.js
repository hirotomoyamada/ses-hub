import { timestamp } from "../../../../../../functions/timestamp";
import { fields } from "./fields";

export const matters = ({ selectOutputs }) => {
  const values = selectOutputs.map((outputs) => ({
    createAt: `作成：${timestamp(outputs?.createAt)}`,
    title: `■ ${outputs.title ? outputs.title : "不明な案件"}`,
    positon: `${outputs?.position}`,
    body: `概要：\n${outputs?.body}`,
    period: `開始：${
      outputs?.period &&
      `${outputs?.period?.year}年 ${outputs?.period?.month}月`
    }`,
    location: `場所：${outputs?.location.area} ${outputs?.location.place}`,
    remote: `リモート：${outputs?.remote}`,
    times: `時間：${
      outputs?.times && `${outputs?.times?.start} 〜 ${outputs?.times?.end}`
    }`,
    adjustment: `精算：${outputs?.adjustment}`,
    span:
      outputs?.span !== "その他"
        ? `支払：${outputs?.span}日`
        : `支払：${outputs?.span}`,
    costs: `単価：${
      outputs?.costs?.display !== "public"
        ? outputs?.costs?.type
        : outputs?.costs?.min
        ? `${outputs?.costs?.min}万 〜 ${outputs?.costs?.max}万`
        : `〜 ${outputs?.costs?.max}万`
    }`,
    distribution: `商流：${outputs?.distribution}`,
    interviews: `面談：${
      outputs?.interviews &&
      `${outputs?.interviews?.type} ${outputs?.interviews?.count}`
    }`,
    note: `備考：\n${outputs?.note && `${outputs?.note}\n`}`,

    handles:
      outputs?.handles?.[0] &&
      fields({
        value: "言語など：",
        objects: outputs.handles,
        handles: true,
      }),
    tools:
      outputs?.tools?.[0] &&
      fields({ value: "ツール：", objects: outputs?.tools }),
    requires:
      outputs?.requires?.[0] &&
      fields({ value: "必須：", objects: outputs?.requires }),
    prefers:
      outputs?.prefers?.[0] &&
      fields({ value: "尚可：", objects: outputs?.prefers }),
  }));

  return values.map(
    (output, index) =>
      `${output.createAt}\n\n${output.title}\n${
        output.handles !== undefined ? `${output.handles}\n` : "\n"
      }${output.positon}\n\n${output.period}\n${output.location}\n${
        output.times
      }\n${output.remote}\n${output.adjustment}\n${output.costs}\n${
        output.distribution
      }\n${output.interviews}\n${output.span}\n\n${output.body}\n${
        output.tools !== undefined ? `\n${output.tools}\n` : ""
      }\n${output.requires}\n${
        output.prefers !== undefined ? `\n${output.prefers}\n` : ""
      }\n${output.note}${
        values.length !== index + 1
          ? "\n---------------------------------------------\n\n"
          : "\n"
      }`
  );
};
