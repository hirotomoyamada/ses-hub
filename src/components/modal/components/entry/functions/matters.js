import { timestamp } from "../../../../../functions/timestamp";

export const matters = ({ post }) => {
  const value = {
    createAt: `作成：${timestamp(post?.createAt)}\n`,
    title: `■ ${post.title ? post.title : "不明な案件"}\n`,
    positon: `${post?.position}\n`,
    period: `開始：${
      post.period && `${post?.period?.year}年 ${post?.period?.month}月`
    }`,
    location: `場所：${post?.location?.area} ${post?.location?.place}`,
    remote: `遠隔：${post?.remote}\n`,
    times: `時間：${
      post.times && `${post?.times?.start} 〜 ${post?.times?.end}`
    }`,
    adjustment: `精算：${post?.adjustment}\n`,
    costs: `単価：${
      post?.costs?.display !== "public"
        ? post?.costs?.type
        : post?.costs?.min
        ? `${post?.costs?.min}万 〜 ${post?.costs?.max}万`
        : `〜 ${post?.costs?.max}万`
    }\n`,
    distribution: `商流：${post?.distribution}`,
    interviews: `面談：${
      post?.interviews && `${post?.interviews?.type} ${post?.interviews?.count}`
    }`,
  };
  return `${value.createAt}\n${value.title}\n${value.positon}\n${value.period}\n${value.location}\n${value.remote}\n${value.times}\n${value.adjustment}\n${value.costs}\n${value.distribution}\n${value.interviews}`;
};
