import * as Post from "types/post";

type Matter = {
  posts: (Post.Matter | undefined)[];
  hit: {
    posts: number;
    pages: number;
    currentPage: number;
  };
};

type Resource = {
  posts: (Post.Resource | undefined)[];
  hit: {
    posts: number;
    pages: number;
    currentPage: number;
  };
};

type Company = {
  posts: (Post.Company | undefined)[];
  hit: {
    posts: number;
    pages: number;
    currentPage: number;
  };
};

type Person = {
  posts: (Post.Person | undefined)[];
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
  bests:
    | (Post.Matter | undefined)[]
    | (Post.Resource | undefined)[]
    | (Post.Person | undefined)[];
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
  activity: {},
};
