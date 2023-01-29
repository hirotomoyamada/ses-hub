import * as functions from 'functions';

import { Matter, Resource } from 'types/post';

export const matters = (posts: Matter[]): string[] => {
  const values = posts.map((outputs) => ({
    createAt: `作成：${functions.root.timestamp(outputs?.createAt)}`,
    title: `■ ${outputs.title ? outputs.title : '不明な案件'}`,
    position: `${outputs?.position}`,
    body: `詳細：\n${outputs?.body}`,
    industry: `業界：${outputs?.industry ?? '不明'}`,
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
      outputs?.span !== 'その他'
        ? `支払：${outputs?.span}日`
        : `支払：${outputs?.span}`,
    costs: `単価：${
      outputs?.costs?.display !== 'public'
        ? outputs?.costs?.type
        : outputs?.costs?.min
        ? `${outputs?.costs?.min}万 〜 ${outputs?.costs?.max}万`
        : `〜 ${outputs?.costs?.max}万`
    }`,
    distribution: `商流：${outputs?.distribution}`,
    approval: `稟議：${outputs?.approval ? outputs?.approval : '不明'}`,
    interviews: `面談：${
      outputs?.interviews &&
      `${outputs?.interviews?.type} ${outputs?.interviews?.count}`
    }`,
    note: `備考：\n${outputs?.note && `${outputs?.note}\n`}`,

    handles:
      outputs?.handles?.[0] &&
      fields({
        array: outputs.handles,
        handles: true,
      }),
    tools:
      outputs?.tools?.[0] && fields({ tag: 'ツール：', array: outputs?.tools }),
    requires:
      outputs?.requires?.[0] &&
      fields({ tag: '必須：', array: outputs?.requires }),
    prefers:
      outputs?.prefers?.[0] &&
      fields({ tag: '歓迎：', array: outputs?.prefers }),
  }));

  return values.map(
    (output, index) =>
      `${output.createAt}\n\n${output.title}\n${
        output.handles !== undefined ? `${output.handles}\n` : '\n'
      }\n${output.position}\n\n${output.industry}\n${output.period}\n${
        output.location
      }\n${output.times}\n${output.remote}\n${output.adjustment}\n${
        output.costs
      }\n${output.distribution}\n${output.interviews}\n${output.approval}\n${
        output.span
      }\n\n${output.body}\n${
        output.tools !== undefined ? `\n${output.tools}\n` : ''
      }\n${output.requires}\n${
        output.prefers !== undefined ? `\n${output.prefers}\n` : ''
      }\n${output.note}${
        values.length !== index + 1
          ? '\n---------------------------------------------\n\n'
          : '\n'
      }`,
  );
};

export const resources = (posts: Resource[]): string[] => {
  const values = posts.map((outputs) => ({
    createAt: `作成：${functions.root.timestamp(outputs?.createAt)}`,
    roman: `■ ${
      outputs?.roman
        ? `${outputs?.roman?.firstName.substring(
            0,
            1,
          )} . ${outputs?.roman?.lastName.substring(0, 1)}`
        : '不明な人材'
    }`,
    position: `${outputs?.position}`,
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
      outputs?.costs?.display !== 'public'
        ? outputs?.costs?.type
        : outputs?.costs?.min
        ? `${outputs?.costs?.min}万 〜 ${outputs?.costs?.max}万`
        : `〜 ${outputs?.costs?.max}万`
    }`,
    parallel: `並行：${outputs?.parallel}`,
    note: `備考：\n${outputs?.note && `${outputs?.note}\n`}`,

    skills:
      outputs?.skills?.[0] &&
      fields({ tag: 'スキル：', array: outputs?.skills }),
    handles:
      outputs?.handles?.[0] &&
      fields({ array: outputs?.handles, handles: true }),
    tools:
      outputs?.tools?.[0] && fields({ tag: 'ツール：', array: outputs?.tools }),
  }));

  return values.map(
    (output, index) =>
      `${output.createAt}\n\n${output.roman}\n${
        output.handles !== undefined ? `${output.handles}\n` : '\n'
      }${output.position}\n\n${output.sex}\n${output.age}\n${output.period}\n${
        output.station
      }\n${output.costs}\n${output.parallel}\n${output.belong}\n${
        output.tools !== undefined ? `\n${output.tools}\n` : ''
      }\n${output.skills}\n\n${output.body}\n\n${output.note}${
        values.length !== index + 1
          ? '\n---------------------------------------------\n\n'
          : '\n'
      }`,
  );
};

export const fields = ({
  tag,
  array,
  handles,
}: {
  array: string[];
  tag?: string;
  handles?: boolean;
}): string => {
  if (handles) {
    const field = array?.map((object) => object && `【${object}】`);
    return field?.[0] && field.join('');
  } else {
    const field = array?.map((object) => object && `・${object}`);
    return field?.[0] && `${tag}\n${field.join('\n')}`;
  }
};
