exports.resources = (data) => {
  const dataTime = Date.now();

  return {
    display: data.post.display,
    objectID: data.post.objectID,
    roman: data.post.roman,
    position: data.post.position,
    sex: data.post.sex,
    age: data.post.age,
    body: data.post.body,
    belong: data.post.belong,
    station: data.post.station,
    period: {
      year: data.post.period.year,
      month: data.post.period.month,
    },
    costs: {
      min: Number(data.post.costs.min),
      max: Number(data.post.costs.max),
      contract: Number(data.post.costs.contract),
      display: data.post.costs.display,
      type: data.post.costs.type,
    },
    handles: data.post.handles,
    tools: data.post.tools,
    skills: data.post.skills,
    parallel: data.post.parallel,
    note: data.post.note,
    status: data.post.status,
    memo: data.post.memo,
    updateAt: dataTime,
  };
};
