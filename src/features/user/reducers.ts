import { PayloadAction } from '@reduxjs/toolkit';
import { auth, functions } from 'libs/firebase';
import { updateProfile, updateEmail } from 'firebase/auth';
import { httpsCallable, HttpsCallable } from 'firebase/functions';

import { Analytics, initialState, State } from 'features/user/initialState';
import { Matter, Resource, Company, Person } from 'types/post';
import { Notice, Setting, User } from 'types/user';
import { Login, Child, FetchUser } from 'features/user/actions';
import { Profile, Provider, Like, Output, Entry, Request } from 'features/user/userSlice';
import { CreatePost } from 'features/post/actions';
import { Post } from 'features/post/postSlice';

export const login = (state: State, action: PayloadAction<Login['data']>): void => {
  if (action.payload?.user) {
    (state.user as User).uid = action.payload.user.uid;
    (state.user as User).icon = action.payload.user.icon;
    (state.user as User).cover = action.payload.user.cover;
    (state.user as User).provider = action.payload.user.provider;
    (state.user as User).profile = action.payload.user.profile;
    (state.user as User).type = action.payload.user.type;
    (state.user as User).application = action.payload.user.application;
    (state.user as User).notice = action.payload.user.notice;
    (state.user as User).agree = action.payload.user.agree;
    (state.user as User).remind = action.payload.user.remind;
    (state.user as User).payment = action.payload.user.payment;
    (state.user as User).createAt = action.payload.user.createAt;
    (state.user as User).updateAt = action.payload.user.updateAt;
    (state.user as User).follows = action.payload.user.follows;
    (state.user as User).followers = action.payload.user.followers;
    (state.user as User).home = action.payload.user.home;

    if (action.payload.user.posts) {
      (state.user as User).posts = {
        matters: action.payload.user.posts.matters ? action.payload.user.posts.matters : [],
        resources: action.payload.user.posts.resources ? action.payload.user.posts.resources : [],
      };
    }

    if (action.payload.user.entries) {
      (state.user as User).entries = {
        matters: action.payload.user.entries.matters ? action.payload.user.entries.matters : [],
        resources: action.payload.user.entries.resources
          ? action.payload.user.entries.resources
          : [],
        persons: action.payload.user.entries.persons ? action.payload.user.entries.persons : [],
      };
    }

    if (action.payload.user.likes) {
      (state.user as User).likes = {
        matters: action.payload.user.likes.matters ? action.payload.user.likes.matters : [],
        resources: action.payload.user.likes.resources ? action.payload.user.likes.resources : [],
        persons: action.payload.user.likes.persons ? action.payload.user.likes.persons : [],
      };
    }

    if (action.payload.user.outputs) {
      (state.user as User).outputs = {
        matters: action.payload.user.outputs.matters ? action.payload.user.outputs.matters : [],
        resources: action.payload.user.outputs.resources
          ? action.payload.user.outputs.resources
          : [],
      };
    }
  }
};

export const logout = (state: State): State | void => {
  if (!state.token) {
    return initialState;
  }
};

export const updateToken = (state: State, action: PayloadAction<string | undefined>): void => {
  if (action.payload) {
    state.token = window.btoa(action.payload);
  } else {
    state.token = undefined;
  }
};

export const updatePayment = (state: State, action: PayloadAction<User['payment']>): void => {
  (state.user as User).payment = {
    status: action.payload.status,
    limit: action.payload.limit,
    option: action.payload.option,
    price: action.payload.price,
    account: action.payload.account,
    children: action.payload.children,
    start: action.payload.start,
    end: action.payload.end,
    notice: action.payload.notice,
    cancel: action.payload.cancel,
    trial: action.payload.trial,
    load: action.payload.load,
  };
};

export const addProvider = (state: State, action: PayloadAction<Provider>): void => {
  (state.user as User).provider = [action.payload.provider, ...(state.user as User).provider];

  if (action.payload.email) {
    (state.user as User).profile.email = action.payload.email;
  }

  const addProvider: HttpsCallable<{ provider: string; email?: string }, unknown> = httpsCallable(
    functions,
    'sh-addProvider',
  );

  void addProvider({
    provider: action.payload.provider,
    email: action.payload.email,
  });
};

export const applicationType = (state: State): void => {
  (state.user as User).application = true;

  const applicationType: HttpsCallable<unknown, unknown> = httpsCallable(
    functions,
    'sh-applicationType',
  );

  void applicationType();
};

export const updateNotice = (
  state: State,
  action: PayloadAction<{ type: 'user' | 'payment'; notice?: Notice }>,
): void => {
  if (action.payload.type === 'payment') {
    if ((state.user as User).payment) {
      (state.user as User).payment.notice = false;
    }

    const disableNotice: HttpsCallable<unknown, unknown> = httpsCallable(
      functions,
      'sh-disableNotice',
    );

    void disableNotice();
  } else {
    (state.user as User).notice = { ...(state.user as User).notice, ...action.payload.notice };

    const updateNotice: HttpsCallable<Notice, unknown> = httpsCallable(
      functions,
      'sh-updateNotice',
    );

    void updateNotice(action.payload.notice);
  }
};

export const changeEmail = (state: State, action: PayloadAction<string>): void => {
  (state.user as User).profile.email = action.payload;

  const changeEmail: HttpsCallable<{ email: string }, unknown> = httpsCallable(
    functions,
    'sh-changeEmail',
  );

  void changeEmail({ email: action.payload }).then((): void => {
    if (auth.currentUser) {
      void updateEmail(auth.currentUser, action.payload);
    }
  });
};

export const createChild = (state: State, action: PayloadAction<Child['data'] | void>): void => {
  if (action.payload) {
    if ((state.user as User).payment && (state.user as User).payment.children) {
      (state.user as User).payment.children = [
        ...((state.user as User).payment.children as string[]),
        action.payload.uid,
      ];
    }

    if (Array.isArray(state.selectUser)) {
      state.selectUser = [...(state.selectUser as Company[]), action.payload];
    } else {
      state.selectUser = [action.payload];
    }
  }
};

export const changeEmailChild = (
  state: State,
  action: PayloadAction<{ uid: string; email: string } | void>,
): void => {
  if (action.payload && Array.isArray(state.selectUser)) {
    const selectUser = (state.selectUser as Company[]).find(
      (user) => action.payload && user.uid === action.payload.uid,
    );

    if (selectUser) {
      selectUser.profile.email = action.payload.email;
    }
  }
};

export const deleteChild = (state: State, action: PayloadAction<string | void>): void => {
  if ((state.user as User).payment && (state.user as User).payment.children) {
    (state.user as User).payment.children = (
      (state.user as User).payment.children as string[]
    ).filter((uid) => uid !== action.payload);

    if (Array.isArray(state.selectUser)) {
      state.selectUser = (state.selectUser as Company[]).filter(
        (user) => user.uid !== action.payload,
      );
    }
  }
};

export const editProfile = (state: State, action: PayloadAction<Profile>): void => {
  if ((state.user as User).uid === action.payload.uid) {
    (state.user as User).icon = action.payload.icon;
    (state.user as User).cover = action.payload.cover;
    (state.user as User).profile.name = action.payload.name;
    (state.user as User).profile.person = action.payload.person;
    (state.user as User).profile.invoice = action.payload.invoice;
    (state.user as User).profile.body = action.payload.body;
    (state.user as User).profile.more = action.payload.more;
    (state.user as User).profile.region = action.payload.region;
    (state.user as User).profile.postal = action.payload.postal;
    (state.user as User).profile.address = action.payload.address;
    (state.user as User).profile.tel = action.payload.tel;
    (state.user as User).profile.url = action.payload.url;
    (state.user as User).profile.social = action.payload.social;

    if (auth.currentUser) {
      void updateProfile(auth.currentUser, {
        displayName: action.payload.person,
      });
    }
  } else {
    if (Array.isArray(state.selectUser)) {
      const selectUser = (state.selectUser as Company[]).find(
        (user) => user.uid === action.payload.uid,
      );

      if (selectUser) {
        selectUser.icon = action.payload.icon;
        selectUser.cover = action.payload.cover;
        selectUser.profile.name = action.payload.name;
        selectUser.profile.person = action.payload.person;
        selectUser.profile.invoice = action.payload.invoice;
        selectUser.profile.body = action.payload.body;
        selectUser.profile.more = action.payload.more;
        selectUser.profile.region = action.payload.region;
        selectUser.profile.postal = action.payload.postal;
        selectUser.profile.address = action.payload.address;
        selectUser.profile.tel = action.payload.tel;
        selectUser.profile.url = action.payload.url;
        selectUser.profile.social = action.payload.social;
      }
    }
  }
};

export const createPost = (state: State, action: PayloadAction<CreatePost['data']>): void => {
  (state.user as User).posts[action.payload.index] = [
    action.payload.post.objectID,
    ...(state.user as User).posts[action.payload.index],
  ];
};

export const deletePost = (state: State, action: PayloadAction<Post>): void => {
  (state.user as User).posts[action.payload.index] = (state.user as User).posts[
    action.payload.index
  ].filter((objectID) => objectID !== action.payload.post.objectID);
};

export const addLike = (state: State, action: PayloadAction<Like>): void => {
  (state.user as User).likes[action.payload.index] = [
    action.payload.index !== 'persons'
      ? (action.payload.post as Matter | Resource).objectID
      : (action.payload.post as Person).uid,
    ...(state.user as User).likes[action.payload.index],
  ];

  if ('likes' in (state.selectUser as Person)) {
    ((state.selectUser as Person).likes as number) += 1;
  }

  const addLike: HttpsCallable<
    {
      index: Like['index'];
      uid: string;
      objectID?: string;
    },
    unknown
  > = httpsCallable(functions, 'sh-addLike');

  void addLike({
    index: action.payload.index,
    uid: action.payload.post.uid,
    objectID: (action.payload.post as Matter | Resource).objectID,
  });
};

export const removeLike = (state: State, action: PayloadAction<Like>): void => {
  (state.user as User).likes[action.payload.index] = (state.user as User).likes[
    action.payload.index
  ].filter(
    (id) =>
      id !==
      (action.payload.index !== 'persons'
        ? (action.payload.post as Matter | Resource).objectID
        : (action.payload.post as Person).uid),
  );

  if ('likes' in (state.selectUser as Person)) {
    ((state.selectUser as Person).likes as number) -= 1;
  }

  const removeLike: HttpsCallable<
    {
      index: Like['index'];
      uid: string;
      objectID?: string;
    },
    unknown
  > = httpsCallable(functions, 'sh-removeLike');

  void removeLike({
    index: action.payload.index,
    uid: action.payload.post.uid,
    objectID: (action.payload.post as Matter | Resource).objectID,
  });
};

export const addOutput = (state: State, action: PayloadAction<Output>): void => {
  if (
    (action.payload.index === 'matters' || action.payload.index === 'resources') &&
    action.payload.post
  ) {
    (state.user as User).outputs[action.payload.index] = [
      action.payload.post.objectID,
      ...(state.user as User).outputs[action.payload.index],
    ];

    const addOutput: HttpsCallable<
      {
        index: Output['index'];
        uid: string;
        objectID: string;
      },
      unknown
    > = httpsCallable(functions, 'sh-addOutput');

    void addOutput({
      index: action.payload.index,
      uid: action.payload.post.uid,
      objectID: action.payload.post.objectID,
    });
  }
};

export const removeOutput = (state: State, action: PayloadAction<Output>): void => {
  if (action.payload.index === 'matters' || action.payload.index === 'resources') {
    if (!action.payload.objectIDs) {
      (state.user as User).outputs[action.payload.index] = (state.user as User).outputs[
        action.payload.index
      ].filter((objectID) => action.payload.post && objectID !== action.payload.post.objectID);
    } else {
      (state.user as User).outputs[action.payload.index] = (state.user as User).outputs[
        action.payload.index
      ].filter(
        (objectID) => action.payload.objectIDs && action.payload.objectIDs.indexOf(objectID) < 0,
      );
    }

    const removeOutput: HttpsCallable<
      {
        index: Output['index'];
        uid?: string;
        objectID?: string;
        objectIDs?: string[];
      },
      unknown
    > = httpsCallable(functions, 'sh-removeOutput');

    void removeOutput({
      index: action.payload.index,
      uid: action.payload.post?.uid,
      objectID: action.payload.post?.objectID,
      objectIDs: action.payload.objectIDs,
    });
  }
};

export const addEntry = (state: State, action: PayloadAction<Entry>): void => {
  if (
    (state.user as User).entries[action.payload.index].indexOf(action.payload.post.objectID) < 0
  ) {
    (state.user as User).entries[action.payload.index] = [
      action.payload.post.objectID,
      ...(state.user as User).entries[action.payload.index],
    ];
  }
};

export const addFollow = (state: State, action: PayloadAction<Company>): void => {
  (state.user as User).follows = [action.payload.uid, ...(state.user as User).follows];

  if ((state.user as User).home.length < 15) {
    (state.user as User).home = [action.payload.uid, ...(state.user as User).home];
  }

  if ((state.selectUser as Company).uid === action.payload.uid) {
    if (
      !isNaN(Number((state.selectUser as Company).followers)) &&
      (state.selectUser as Company).followers !== null
    )
      ((state.selectUser as Company).followers as number) += 1;
  }

  const addFollow: HttpsCallable<string, unknown> = httpsCallable(functions, 'sh-addFollow');

  void addFollow(action.payload.uid);
};

export const removeFollow = (state: State, action: PayloadAction<Company>): void => {
  (state.user as User).follows = (state.user as User).follows.filter(
    (uid) => uid !== action.payload.uid,
  );

  if ((state.user as User).home.length <= 15) {
    (state.user as User).home = (state.user as User).home.filter(
      (uid) => uid !== action.payload.uid,
    );
  }

  if ((state.selectUser as Company).uid === action.payload.uid) {
    if (
      !isNaN(Number((state.selectUser as Company).followers)) &&
      (state.selectUser as Company).followers !== null
    )
      ((state.selectUser as Company).followers as number) -= 1;
  }

  const removeFollow: HttpsCallable<string, unknown> = httpsCallable(functions, 'sh-removeFollow');

  void removeFollow(action.payload.uid);
};

export const addRequest = (state: State, action: PayloadAction<Request>): void => {
  (state.selectUser as Person).request = 'hold';

  (state.user as User).entries.persons = [
    action.payload.user.uid,
    ...(state.user as User).entries.persons,
  ];

  const addRequest: HttpsCallable<{ uid: string; body: string }, unknown> = httpsCallable(
    functions,
    'sh-addRequest',
  );

  void addRequest({
    uid: action.payload.user.uid,
    body: action.payload.body,
  });
};

export const updateHome = (state: State, action: PayloadAction<string[]>): void => {
  (state.user as User).home = action.payload;

  const updateHome: HttpsCallable<string[], unknown> = httpsCallable(functions, 'sh-updateHome');

  void updateHome(action.payload);
};

export const fetchUser = (state: State, action: PayloadAction<FetchUser['data'] | void>): void => {
  if (action.payload) {
    state.selectUser = action.payload.user;
  } else {
    state.selectUser = initialState['selectUser'];
  }
};

export const resetUser = (state: State): void => {
  state.selectUser = initialState.selectUser;
};

export const updateAnalytics = (
  state: State,
  action: PayloadAction<(Setting['analytics'] & { type: 'analytics' }) | undefined>,
): void => {
  if (action.payload) {
    if (action.payload.type !== 'analytics') return;

    Object.keys(state.analytics).forEach((uid) => {
      state.analytics[uid] = action.payload?.order
        .map((key) => (state.analytics[uid] as Analytics).find((current) => current.key === key))
        .map((current) =>
          current?.key && action.payload?.active && action.payload.active.includes(current?.key)
            ? { ...current, active: true }
            : { ...current, active: false },
        )
        .filter((data): data is Analytics[number] => data !== undefined);
    });
  } else {
    state.analytics = {};
  }
};

export const fetchAnalytics = (
  state: State,
  action: PayloadAction<{
    analytics: Analytics;
    uid: string;
    active?: string[];
    order?: string[];
  }>,
): void => {
  const uid = action.payload.uid;
  const active = action.payload.active;
  const order = action.payload.order;

  action.payload.analytics = action.payload.analytics.filter(({ key }) => key !== 'follows');

  if (!active || !order) {
    state.analytics[uid] = action.payload.analytics;
  } else {
    state.analytics[uid] = order
      .map((key) => action.payload.analytics.find((current) => current.key === key))
      .map((current) =>
        current?.key && active.indexOf(current?.key) >= 0
          ? { ...current, active: true }
          : { ...current, active: false },
      )
      .filter((data): data is Analytics[number] => data !== undefined);
  }
};
