export const initialState = {
  index: "matters",

  search: {
    value: "",
    target: "",
    type: "",
    status: "",
    display: "",
    control: false,
  },

  sort: {
    status: "",
    display: "",
    control: false,
  },

  posts: {
    search: {
      matters: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      resources: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      companys: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      persons: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
    },

    bests: [],

    user: {
      matters: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      resources: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      companys: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
    },

    selectUser: {
      matters: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      resources: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
    },

    home: {
      matters: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
        control: true,
      },
      resources: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
        control: true,
      },
    },

    likes: {
      matters: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      resources: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      persons: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
    },

    outputs: {
      matters: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      resources: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
    },

    entries: {
      matters: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      resources: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
      persons: {
        posts: [],
        hit: {
          posts: 0,
          pages: 0,
          currentPage: 0,
        },
      },
    },
  },

  post: {},

  page: "home",
  modal: { type: "", open: false },

  load: true,
  fatch: false,
  notFound: false,
};
