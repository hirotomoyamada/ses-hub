export const initialState = {
  user: {
    uid: "",
    icon: "",
    cover: "",
    provider: [],
    profile: {
      name: "",
      person: "",
      position: "",
      body: "",
      postal: "",
      address: "",
      email: "",
      tel: "",
      more: "",
      region: "",
      url: "",
      social: [{ twitter: "", instagram: "", line: "", linkedIn: "" }],
    },
    posts: { matters: [], resources: [] },
    entries: { matters: [], resources: [], persons: [] },
    likes: { matters: [], resources: [], persons: [] },
    outputs: { matters: [], resources: [] },
    follows: [],
    home: [],
    payment: "",
    createAt: "",
    updateAt: "",
  },

  selectUser: {},

  modal: {
    type: "",
    open: false,
  },

  announce: {
    success: "",
    error: "",
  },

  data: {},

  verified: {
    email: false,
    profile: false,
    agree: false,
    status: "",
    access: true,
    demo: false,
  },

  load: true,
  notFound: false,
};
