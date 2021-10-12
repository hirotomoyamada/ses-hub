export const matters = (data) => {
  return {
    display: data.display,
    title: data.title,
    position: data.position,
    body: data.body,
    location: data.location,
    period: data.period,
    costs: data.costs,
    adjustment: data.adjustment,
    times: data.times,
    handles: data.handles
      .filter((object) => object[Object.keys(object)])
      .map((object) => object[Object.keys(object)]),
    tools: data.tools
      .filter((object) => object[Object.keys(object)])
      .map((object) => object[Object.keys(object)]),
    requires: data.requires
      .filter((object) => object[Object.keys(object)])
      .map((object) => object[Object.keys(object)]),
    prefers: data.prefers
      .filter((object) => object[Object.keys(object)])
      .map((object) => object[Object.keys(object)]),
    interviews: data.interviews,
    remote: data.remote,
    distribution: data.distribution,
    span: data.span,
    note: data.note,
    status: data.status,
    memo: data.memo,
  };
};
