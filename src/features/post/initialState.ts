import * as Post from "types/post";

type Matter = {
  posts: Post.Matter[];
  hit: {
    posts: number;
    pages: number;
    currentPage: number;
  };
};

type Resource = {
  posts: Post.Resource[];
  hit: {
    posts: number;
    pages: number;
    currentPage: number;
  };
};

type Company = {
  posts: Post.Company[];
  hit: {
    posts: number;
    pages: number;
    currentPage: number;
  };
};

type Person = {
  posts: Post.Person[];
  hit: {
    posts: number;
    pages: number;
    currentPage: number;
  };
};

export type Activity = {
  total: {
    histories: number;
    likes: number;
    outputs: number;
    entries: number;
  };
  today: {
    histories: number;
    likes: number;
    outputs: number;
    entries: number;
  };
  log: {
    index: "companys" | "persons";
    uid: string;
    icon: string;
    display: string;
    type: "likes" | "outputs" | "entries";
    createAt: number;
  }[];
};

export interface State {
  search: {
    matters: Matter;
    resources: Resource;
    companys: Company;
    persons: Person;
  };

  user: {
    matters: Matter;
    resources: Resource;
    companys: Company;
  };

  selectUser: {
    matters: Matter;
    resources: Resource;
  };

  home: {
    matters: Matter & { control: boolean };
    resources: Resource & { control: boolean };
  };

  likes: {
    matters: Matter;
    resources: Resource;
    persons: Person;
  };

  outputs: {
    matters: Matter;
    resources: Resource;
  };

  entries: {
    matters: Matter;
    resources: Resource;
    persons: Person;
  };

  post: Post.Matter | Post.Resource | unknown;
  bests: Post.Matter[] | Post.Resource[] | Post.Person[];
  activity: Activity | unknown;
}

const posts = {
  posts: [],
  hit: {
    posts: 0,
    pages: 0,
    currentPage: 0,
  },
};

export const initialState: State = {
  search: {
    matters: posts,
    resources: posts,
    companys: posts,
    persons: posts,
  },

  user: {
    matters: posts,
    resources: posts,
    companys: posts,
  },

  selectUser: {
    matters: posts,
    resources: posts,
  },

  home: {
    matters: { ...posts, control: true },
    resources: { ...posts, control: true },
  },

  likes: {
    matters: posts,
    resources: posts,
    persons: posts,
  },

  outputs: {
    matters: posts,
    resources: posts,
  },

  entries: {
    matters: posts,
    resources: posts,
    persons: posts,
  },

  post: {},
  bests: [],
  activity: {
    total: { views: 999999999, likes: 458392, outputs: 86758, entries: 3654 },
    today: { views: 3535133, likes: 32422, outputs: 4242, entries: 856 },
    log: [
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon2",
        display: "テスト大好きテスト大好きテスト大好き",
        type: "likes",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon7",
        display: "テスト大好き",
        type: "outputs",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon4",
        display: "テスト大好き",
        type: "entries",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon10",
        display: "テスト大好き",
        type: "outputs",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon28",
        display: "テスト大好き",
        type: "likes",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon16",
        display: "テスト大好き",
        type: "entries",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon2",
        display: "テスト大好き",
        type: "likes",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon7",
        display: "テスト大好き",
        type: "outputs",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon4",
        display: "テスト大好き",
        type: "entries",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon10",
        display: "テスト大好き",
        type: "outputs",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon28",
        display: "テスト大好き",
        type: "likes",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon16",
        display: "テスト大好き",
        type: "entries",
        createAt: 1648926491236,
      },
    ],
  },
};
