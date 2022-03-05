import * as Algolia from "../../types/algolia";

export const matter = (post: Algolia.Matter, url: string): string => {
  const title = post?.title
    ? `■ ${post.title.substring(0, 18)}${post.title.length > 18 ? ` …` : ``}`
    : ``;

  const handles = (() => {
    const handles = post?.handles
      ?.slice(0, 3)
      ?.map((handle) => handle && `【${handle}】`);

    return handles?.[0]
      ? `${handles.join("")}${post?.handles?.length > 3 ? ` …` : ``}\n`
      : ``;
  })();

  const position = post?.position ? post.position : ``;

  const period = post.period
    ? `開始：${post?.period?.year}年 ${post?.period?.month}月`
    : ``;

  const location = post?.location?.area ? `場所：${post?.location?.area}` : ``;
  const remote = post?.remote ? `遠隔：${post?.remote}` : ``;

  const times = post?.times
    ? `時間：${post.times.start} 〜 ${post.times.end}`
    : ``;
  const adjustment = post?.adjustment ? `精算：${post.adjustment}` : ``;

  const costs = post?.costs
    ? `単価：${
        post.costs.display !== "public"
          ? post.costs.type
          : post.costs.min
          ? `${post.costs.min}万 〜 ${post.costs.max}万`
          : `〜 ${post.costs.max}万`
      }`
    : ``;

  const distribution = post?.distribution ? `商流：${post.distribution}` : ``;

  const interviews = post?.interviews
    ? `面談：${post.interviews.type} ${post.interviews.count}`
    : ``;

  return `${title}\n${handles}\n${position}\n\n${period}\n${location}\n${remote}\n\n${times}\n${adjustment}\n\n${costs}\n\n${distribution}\n${interviews}\n\n${url}`;
};

export const resource = (post: Algolia.Resource, url: string): string => {
  const title = post?.roman
    ? `■ ${post.roman.firstName.substring(
        0,
        1
      )} . ${post.roman.lastName.substring(0, 1)}`
    : ``;

  const position = post?.position ? post.position : ``;

  const belong = post?.belong ? `所属：${post.belong} ` : ``;

  const sex = post?.sex ? `性別：${post.sex} ` : ``;

  const age = post?.age ? `年齢：${post.age} ` : ``;

  const period = post.period
    ? `開始：${post?.period?.year}年 ${post?.period?.month}月`
    : ``;

  const station = post?.station ? `最寄：${post.station} ` : ``;

  const costs = post?.costs
    ? `単価：${
        post.costs.display !== "public"
          ? post.costs.type
          : post.costs.min
          ? `${post.costs.min}万 〜 ${post.costs.max}万`
          : `〜 ${post.costs.max}万`
      }`
    : ``;

  const skills = (() => {
    const skills = post?.skills
      ?.slice(0, 3)
      ?.map(
        (skill) =>
          skill && `・${skill.substring(0, 18)}${skill.length > 18 ? ` …` : ``}`
      );

    return skills?.[0] ? `スキル：\n${skills.join("\n")}\n\n` : ``;
  })();

  return `${title}\n${position}\n\n${belong}\n${sex}\n${age}\n\n${period}\n${station}\n\n${costs}\n\n${skills}${url}`;
};
