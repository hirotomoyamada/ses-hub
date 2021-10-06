exports.resources = ({ hit, auth, promotion }) => {
  if (auth) {
    return {
      display: hit.display,
      objectID: hit.objectID,
      roman: hit.roman,
      position: hit.position,
      sex: hit.sex,
      age: hit.age,
      body: hit.body,
      belong: hit.belong,
      station: hit.station,
      period: hit.period,
      costs: hit.costs,
      handles: hit.handles,
      tools: hit.tools,
      skills: hit.skills,
      parallel: hit.parallel,
      note: hit.note,
      status: hit.status,
      memo: hit.memo,
      uid: hit.uid,
      createAt: hit.createAt,
      updateAt: hit.updateAt,
    };
  } else if (promotion) {
    return {
      objectID: hit.objectID,
      roman: {
        firstName: hit.roman.firstName.substring(0, 1),
        lastName: hit.roman.lastName.substring(0, 1),
      },
      position: hit.position,
      body: hit.body,
      belong: hit.belong,
      station: hit.station,
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
      handles: hit.handles,
      uid: hit.uid,
      createAt: hit.createAt,
    };
  } else {
    return {
      objectID: hit.objectID,
      roman: {
        firstName: hit.roman.firstName.substring(0, 1),
        lastName: hit.roman.lastName.substring(0, 1),
      },
      position: hit.position,
      sex: hit.sex,
      age: hit.age,
      body: hit.body,
      belong: hit.belong,
      station: hit.station,
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
      handles: hit.handles,
      tools: hit.tools,
      skills: hit.skills,
      parallel: hit.parallel,
      note: hit.note,
      uid: hit.uid,
      createAt: hit.createAt,
      updateAt: hit.updateAt,
    };
  }
};
