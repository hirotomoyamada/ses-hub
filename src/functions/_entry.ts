// import * as functions from 'functions';
import { Matter, Resource } from 'types/post';

export const matters = (post: Matter): string => {
  const value = {
    // createAt: `作成：${functions.root.timestamp(post?.createAt)}\n`,
    title: `■ ${post.title ? post.title : '不明な案件'}\n`,
    position: `${post?.position}\n`,
    industry: `業界：${post?.industry ?? '不明'}`,
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
      post?.costs?.display !== 'public'
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
  // return `${value.createAt}\n${value.title}\n${value.position}\n${value.industry}\n${value.period}\n${value.location}\n${value.remote}\n${value.times}\n${value.adjustment}\n${value.costs}\n${value.distribution}\n${value.interviews}`;
  return `${value.title}\n${value.position}\n${value.industry}\n${value.period}\n${value.location}\n${value.remote}\n${value.times}\n${value.adjustment}\n${value.costs}\n${value.distribution}\n${value.interviews}`;
};

export const resources = (post: Resource): string => {
  const skills = post?.skills?.map((skill) => skill && `・${skill}`);
  const skillsArray = skills && skills.join('\n');

  const value = {
    // createAt: `作成：${functions.root.timestamp(post?.createAt)}\n`,
    roman: `■ ${
      post?.roman
        ? `${post?.roman?.firstName.substring(
            0,
            1,
          )} . ${post?.roman?.lastName.substring(0, 1)}`
        : '不明な人材'
    }`,
    position: `${post?.position}\n`,
    belong: `所属： ${post?.belong}`,
    sex: `性別： ${post?.sex}`,
    age: `年齢： ${post?.age}歳\n`,
    period: `開始：${
      post.period && `${post?.period?.year}年 ${post?.period?.month}月`
    }`,
    station: `最寄：${post?.station}\n`,
    costs: `単価：${
      post?.costs?.display !== 'public'
        ? post?.costs?.type
        : post?.costs?.min
        ? `${post?.costs?.min}万 〜 ${post?.costs?.max}万`
        : `〜 ${post?.costs?.max}万`
    }\n`,
    skills: `スキル：\n${skillsArray}\n`,
  };

  // return `${value.createAt}\n${value.roman}\n${value.position}\n${value.belong}\n${value.sex}\n${value.age}\n${value.period}\n${value.station}\n${value.costs}\n${value.skills}\n`;
  return `${value.roman}\n${value.position}\n${value.belong}\n${value.sex}\n${value.age}\n${value.period}\n${value.station}\n${value.costs}\n${value.skills}\n`;
};
