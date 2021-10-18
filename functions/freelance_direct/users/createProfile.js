const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const storage = require("../../firebase").storage;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const index = algolia.initIndex("persons");

exports.createProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const file = await uploadFile(data.file, context.auth.uid);

    const user = createUser(context, data, file);

    await createFirestore(context.auth.uid, user);
    await createAlgolia(context.auth.uid, user);

    return user;
  });

const uploadFile = async (file, uid) => {
  if (file.length > 0.4 * 1024 * 1024) {
    throw new functions.https.HttpsError(
      "cancelled",
      "容量が大きすぎます",
      "storage"
    );
  }

  const key = `${uid}-${Math.random().toString(32).substring(2)}`;

  const name = `${key}.pdf`;
  const bucket = storage.bucket(functions.config().storage.resume);
  const buffer = Buffer.from(file, "base64");
  const path = bucket.file(name);

  const url = await path
    .save(buffer, {
      metadata: {
        contentType: "application/pdf",
      },
    })
    .then(async () => {
      await path.makePublic();

      return path.publicUrl();
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ファイルの作成に失敗しました",
        "storage"
      );
    });

  return { key: key, url: url };
};

const createUser = (context, data, file) => {
  const icon = Math.floor(Math.random() * (36 - 18) + 18);
  const cover = Math.floor(Math.random() * 19);

  return {
    icon: `icon${icon}`,
    cover: `cover${cover}`,
    provider: [data.provider],
    profile: {
      nickName: "",
      name: data.name,
      email: context.auth.token.email,
      age: data.age,
      sex: data.sex,
      position: data.position,
      location: data.location,
      handles: data.handles,

      body: "",
      tools: [],
      skills: [],
      urls: [],
      costs: {
        min: "",
        max: "",
        display: "private",
        type: "応談",
      },
      working: "",
      resident: "",
      clothes: "",
      period: { year: "", month: "" },
    },
    entries: [],
    likes: [],
    requests: {
      enable: [],
      hold: [],
      disable: [],
    },
    follows: [],
    home: [],
    history: [],
    resume: {
      key: file.key,
      url: file.url,
    },
    agree: data.agree,
    status: "hold",
    createAt: context.auth.token.auth_time * 1000,
  };
};

const createFirestore = async (uid, user) => {
  await db
    .collection("persons")
    .doc(uid)
    .get()
    .then(async (doc) => {
      !doc.exists &&
        (await doc.ref
          .set({
            icon: user.icon,
            cover: user.cover,
            provider: user.provider,
            profile: user.profile,
            entries: user.entries,
            likes: user.likes,
            follows: user.follows,
            requests: user.requests,
            home: user.home,
            history: user.history,
            resume: user.resume,
            agree: user.agree,
            status: user.status,
            createAt: user.createAt,
            lastLogin: user.createAt,
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "プロフィールの作成に失敗しました",
              "firebase"
            );
          }));
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });
};

const createAlgolia = async (uid, user) => {
  await index
    .partialUpdateObject(
      {
        objectID: uid,
        uid: uid,
        status: user.status,
        nickName: user.profile.nickName,
        email: user.profile.email,

        age: user.profile.age,
        sex: user.profile.sex,
        position: user.profile.position,
        location: user.profile.location,
        handles: user.profile.handles,

        body: user.profile.body,
        tools: user.profile.tools,
        skills: user.profile.skills,
        urls: user.profile.urls,
        costs: user.profile.costs,
        working: user.profile.working,
        clothes: user.profile.clothes,
        resident: user.profile.resident,
        period: user.profile.period,

        createAt: user.createAt,
        lastLogin: user.createAt,
      },
      {
        createIfNotExists: true,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの作成に失敗しました",
        "algolia"
      );
    });
};
