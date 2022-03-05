import { Matter, Resource, Company, Person } from "types/post";

export interface State {
  search: {
    matters: {
      posts: Matter[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    resources: {
      posts: Resource[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    companys: {
      posts: Company[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    persons: {
      posts: Person[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
  };

  user: {
    matters: {
      posts: Matter[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    resources: {
      posts: Resource[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    companys: {
      posts: Company[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
  };

  selectUser: {
    matters: {
      posts: Matter[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    resources: {
      posts: Resource[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
  };

  home: {
    matters: {
      posts: Matter[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
      control: boolean;
    };
    resources: {
      posts: Resource[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
      control: boolean;
    };
  };

  likes: {
    matters: {
      posts: Matter[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    resources: {
      posts: Resource[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    persons: {
      posts: Person[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
  };

  outputs: {
    matters: {
      posts: Matter[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    resources: {
      posts: Resource[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
  };

  entries: {
    matters: {
      posts: Matter[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    resources: {
      posts: Resource[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
    persons: {
      posts: Person[];
      hit: {
        posts: number;
        pages: number;
        currentPage: number;
      };
    };
  };

  post: Matter | Resource | unknown;
  bests: Matter[] | Resource[] | Person[];
}

export const initialState: State = {
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

  post: {},
  bests: [],
};
