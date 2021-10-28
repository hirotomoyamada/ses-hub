exports.persons = ({ hit, demo, bests }) => {
  if (bests) {
    return {
      uid: hit.objectID,
      profile: {
        state: hit.state,
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
  } else {
    return {
      uid: hit.objectID,
      profile: {
        state: hit.state,
        nickName: hit.nickName,
        name: !demo ? hit.name : null,
        email: !demo ? hit.email : null,
        age: hit.age,
        sex: hit.sex,
        position: hit.position,
        location: hit.location,
        handles: hit.handles,
        body: hit.body,
        tools: hit.tools,
        skills: hit.skills,
        urls: !demo ? hit.urls : [],
        costs: hit.costs,
        working: hit.working,
        resident: hit.resident,
        clothes: hit.clothes,
        period: hit.period,
      },
      createAt: hit.createAt,
    };
  }
};
