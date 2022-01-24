exports.matters = ({ hit, promotion }) => {
  if (promotion) {
    return {
      objectID: hit.objectID,
      title: hit.title,
      position: hit.position,
      body: hit.body,
      location: hit.location,
      costs:
        hit.costs.display === "public"
          ? {
              display: hit.costs.display,
              min: hit.costs.min,
              max: hit.costs.max,
            }
          : {
              display: hit.costs.display,
              type: hit.costs.type,
            },
      adjustment: hit.adjustment,
      times: hit.times,
      handles: hit.handles,
      remote: hit.remote,
      uid: hit.uid,
      createAt: hit.createAt,
    };
  } else {
    return {
      objectID: hit.objectID,
      title: hit.title,
      position: hit.position,
      body: hit.body,
      location: hit.location,
      period: hit.period,
      costs:
        hit.costs.display === "public"
          ? {
              display: hit.costs.display,
              min: hit.costs.min,
              max: hit.costs.max,
            }
          : {
              display: hit.costs.display,
              type: hit.costs.type,
            },
      adjustment: hit.adjustment,
      times: hit.times,
      handles: hit.handles,
      tools: hit.tools,
      requires: hit.requires,
      prefers: hit.prefers,
      interviews: hit.interviews,
      remote: hit.remote,
      distribution: hit.distribution,
      span: hit.span,
      approval: hit.approval,
      note: hit.note,
      status: hit.status !== "成約" && true,
      uid: hit.uid,
      createAt: hit.createAt,
      updateAt: hit.updateAt,
    };
  }
};
