exports.matters = ({ data, context, edit }) => {
  const timestamp = Date.now();

  const object = {
    display: data.post.display,
    title: data.post.title,
    position: data.post.position,
    body: data.post.body,
    location: data.post.location,
    period: data.post.period,
    costs: {
      min: Number(data.post.costs.min),
      max: Number(data.post.costs.max),
      contract: Number(data.post.costs.contract),
      display: data.post.costs.display,
      type: data.post.costs.type,
    },
    adjustment: data.post.adjustment,
    times: data.post.times,
    handles: data.post.handles,
    tools: data.post.tools,
    requires: data.post.requires,
    prefers: data.post.prefers,
    interviews: data.post.interviews,
    remote: data.post.remote,
    distribution: data.post.distribution,
    span: data.post.span,
    note: data.post.note,
    status: data.post.status,
    memo: data.post.memo,
    uid: context.auth.uid,
  };

  if (!edit) {
    object.createAt = timestamp;
  } else {
    object.updateAt = timestamp;
  }

  return object;
};
