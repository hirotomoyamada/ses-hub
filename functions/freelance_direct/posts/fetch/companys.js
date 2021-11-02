const functions = require("firebase-functions");

exports.companys = ({ hit, doc, demo, none }) => {
  if (!doc) {
    return {
      uid: hit.objectID,
      profile: {
        name: hit.name,
        person: hit.person,
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
        email: !demo ? functions.config().admin.freelance_direct : null,
        social: null,
      },
    };
  } else {
    return {
      uid: doc.id,
      icon: doc.data().icon,
      type: doc.data().type,
      profile: {
        name: doc.data().profile.name,
        person: doc.data().profile.person,
        body: doc.data().profile.body,
        email: !demo ? doc.data().profile.email : null,
        social: !demo ? doc.data().profile.social : {},
      },
    };
  }
};
