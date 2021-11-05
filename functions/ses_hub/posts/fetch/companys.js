const dummy = require("../../../dummy").dummy;

exports.companys = ({ hit, demo }) => {
  return {
    uid: hit.objectID,
    profile: {
      name: !demo ? hit.name : dummy("name"),
      person: !demo ? hit.person : dummy("person"),
      body: hit.body,
    },
  };
};
