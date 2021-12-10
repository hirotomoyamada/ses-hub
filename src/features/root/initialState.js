export const initialState = {
  index: "matters",

  page: "home",

  search: {
    value: "",
    target: "",
    type: "",
    control: false,
  },

  sort: {
    status: "",
    display: "",
    control: false,
  },

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
    index: false,
    email: false,
    profile: false,
    agree: false,
    status: "",
    access: true,
    demo: false,
    error: "",
    payment: "canceled",
  },

  load: {
    root: true,
    list: true,
    fetch: false,
    create: false,
  },

  notFound: false,

  ver: "1.8.0",
};
