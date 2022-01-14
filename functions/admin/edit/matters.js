exports.matters = (data) => {
  const timestamp = Date.now();

  return {
    display: data.post.display,
    objectID: data.post.objectID,
    title: data.post.title,
    position: data.post.position,
    body: data.post.body,
    location: data.post.location,
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
    approval: data.post.approval,
    note: data.post.note,
    status: data.post.status,
    memo: data.post.memo,
    updateAt: timestamp,
  };
};
