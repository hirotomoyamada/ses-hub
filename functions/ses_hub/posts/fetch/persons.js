exports.persons = ({ hit }) => {
  return {
    uid: hit.objectID,
    profile: {
      nickName: hit.nickName,
      position: hit.position,
      age: hit.age,
      sex: hit.sex,
      handles: hit.handles,
      costs: hit.costs,
      period: hit.period,
      location: hit.location,
      body: hit.body,
    },
  };
};
