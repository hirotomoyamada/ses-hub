exports.resources = ({ data, context, edit }) => {
  const timestamp = Date.now();

  const object = {
    display: data.post.display,
    roman: data.post.roman,
    position: data.post.position,
    sex: data.post.sex,
    age: data.post.age,
    body: data.post.body,
    belong: data.post.belong,
    station: data.post.station,
    period: data.post.period,
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
    uid: context.auth.uid,
  };

  if (!edit) {
    object.createAt = timestamp;
  } else {
    object.objectID = data.post.objectID;
    object.updateAt = timestamp;
  }

  return object;
};
