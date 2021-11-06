const functions = require("firebase-functions");

const dummy = require("../../../dummy").dummy;

exports.companys = ({ hit, doc, demo, none }) => {
  if (!doc) {
    return {
      uid: hit.objectID,
      profile: {
        name: !demo ? hit.name : dummy("name"),
        person: !demo ? hit.person : dummy("person"),
        body: hit.body,
      },
    };
  } else if (none) {
    return {
      uid: null,
      icon: "freelanceDirect",
      type: "individual",
      profile: {
        name: "Hit me up株式会社",
        person: "freelance Direct 事務局",
        body: null,
        email: !demo ? functions.config().admin.contact : null,
        social: null,
      },
    };
  } else {
    return {
      uid: doc.id,
      icon: doc.data().icon,
      type: doc.data().type,
      profile: {
        name: !demo ? doc.data().profile.name : dummy("name"),
        person: !demo ? doc.data().profile.person : dummy("person"),
        body: doc.data().profile.body,
        email: !demo ? doc.data().profile.email : null,
        social: !demo ? doc.data().profile.social : {},
      },
    };
  }
};
