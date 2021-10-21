exports.persons = ({ context, doc, data }) => {
  if (data) {
    return {
      uid: context.auth.uid,
      icon: doc.data().icon,
      cover: doc.data().cover,
      provider: data
        ? data.providerData.map((provider) => provider.providerId)
        : doc.data().provider,
      profile: doc.data().profile,
      agree: doc.data().agree,
      likes: doc.data().likes,
      entries: doc.data().entries,
      requests: doc.data().requests,
      resume: doc.data().resume,
      follows: doc.data().follows,
      home: doc.data().home,
      history: doc.data().history,
      createAt: doc.data().createAt,
      updateAt: doc.data().updateAt,
    };
  }
};
