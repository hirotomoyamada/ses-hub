exports.resources = ({ hit }) => {
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
};
