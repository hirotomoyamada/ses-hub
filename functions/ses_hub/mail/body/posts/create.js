exports.matters = (post, url) => {
  const title = post?.title ? `■ ${post.title}` : ``;

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

  return `

${title}

${position}

${period}
${location}
${remote}

${times}
${adjustment}

${costs}

${distribution}
${interviews}

URL：${url}

`;
};

exports.resources = (post, url) => {
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

  const skills = post?.skills
    ? `スキル：\n${post?.skills
        ?.map((skill) => skill && `・${skill}`)
        .join("\n")}`
    : ``;

  return `

${title}
${position}

${belong}
${sex}
${age}

${period}
${station}

${costs}

${skills}

URL：${url}
`;
};
