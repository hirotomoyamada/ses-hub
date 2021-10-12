export const resources = (data) => {
  return {
    display: data.display,
    roman: data.roman,
    sex: data.sex,
    age: data.age,
    body: data.body,
    belong: data.belong,
    station: data.station,
    period: data.period,
    costs: data.costs,
    position: data.position,
    handles: data.handles
      .filter((object) => object[Object.keys(object)])
      .map((object) => object[Object.keys(object)]),
    tools: data.tools
      .filter((object) => object[Object.keys(object)])
      .map((object) => object[Object.keys(object)]),
    skills: data.skills
      .filter((object) => object[Object.keys(object)])
      .map((object) => object[Object.keys(object)]),
    parallel: data.parallel,
    note: data.note,
    status: data.status,
    memo: data.memo,
  };
};
