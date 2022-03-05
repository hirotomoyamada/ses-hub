import * as Algolia from "../../types/algolia";
import { User } from "../post/post";

export const matter = (
  post: Algolia.Matter,
  user: User,
  url: string
): string => {
  const title = post?.title ? `■ ${post.title}` : ``;

  const handles = (() => {
    const handles = post?.handles?.map((handle) => handle && `【${handle}】`);

    return handles?.[0] ? `${handles.join("")}\n` : ``;
  })();

  const position = post?.position ? post.position : ``;

  const period = post.period
    ? `開始：${post?.period?.year}年 ${post?.period?.month}月`
    : ``;

  const location = post?.location?.area
    ? `場所：${post?.location?.area}${
        post?.location?.place && ` ${post?.location?.place}`
      }`
    : ``;
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

  return `${title}\n${handles}\n${position}\n\n${period}\n${location}\n${remote}\n\n${times}\n${adjustment}\n\n${costs}\n\n${distribution}\n${interviews}\n\nURL：${url}\n担当：${user.name} ${user.person}`;
};

export const resource = (
  post: Algolia.Resource,
  user: User,
  url: string
): string => {
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
    const skills = post?.skills?.map((skill) => skill && `・${skill}`);

    return skills?.[0] ? `スキル：\n${skills.join("\n")}\n\n` : ``;
  })();

  return `${title}\n${position}\n\n${belong}\n${sex}\n${age}\n\n${period}\n${station}\n\n${costs}\n\n${skills}URL：${url}\n担当：${user.name} ${user.person}`;
};
