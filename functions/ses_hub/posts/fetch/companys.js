const dummy = require("../../../dummy").dummy;

exports.companys = ({ hit, demo }) => {
  return {
    uid: hit.objectID,
    profile: {
      name: !demo ? hit.name : dummy("name"),
      person: !demo
        ? hit.person
          ? hit.person
          : "名無しさん"
        : dummy("person"),
      body: hit.body,
    },
  };
};
