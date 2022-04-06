import { User } from "types/user";
import { Company, Person } from "types/post";

export type Activity = {
  active: boolean;
  name:
    | "posts"
    | "histories"
    | "likes"
    | "outputs"
    | "entries"
    | "follows"
    | "distributions"
    | "approval";
  label: string;
  self?: number;
  others?: number;
  log: { label: string; self: number; others?: number }[];
}[];

export interface State {
  user: User | unknown;

  selectUser: Company | Person | (Company | Person)[] | unknown;

  token: string | null;

  activity: Activity;
}

export const initialState: State = {
  user: {},

  selectUser: {},

  token: null,

  activity: [
    {
      active: true,
      name: "posts",
      label: "投稿",
      self: Math.floor(Math.random() * (999999 - 100000) + 100000),
      log: [
        {
          label: "3月29日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月30日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月31日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月1日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月2日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月3日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月4日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
      ],
    },
    {
      active: true,
      name: "histories",
      label: "閲覧",
      self: Math.floor(Math.random() * (999999 - 100000) + 100000),
      others: Math.floor(Math.random() * (999999 - 100000) + 100000),
      log: [
        {
          label: "3月29日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月30日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月31日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月1日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月2日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月3日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月4日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
      ],
    },
    {
      active: true,
      name: "likes",
      label: "いいね",
      self: Math.floor(Math.random() * (999999 - 100000) + 100000),
      others: Math.floor(Math.random() * (999999 - 100000) + 100000),
      log: [
        {
          label: "3月29日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月30日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月31日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月1日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月2日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月3日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月4日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
      ],
    },
    {
      active: true,
      name: "outputs",
      label: "出力",
      self: Math.floor(Math.random() * (999999 - 100000) + 100000),
      others: Math.floor(Math.random() * (999999 - 100000) + 100000),
      log: [
        {
          label: "3月29日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月30日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月31日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月1日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月2日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月3日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月4日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
      ],
    },
    {
      active: true,
      name: "entries",
      label: "お問い合わせ",
      self: Math.floor(Math.random() * (999999 - 100000) + 100000),
      others: Math.floor(Math.random() * (999999 - 100000) + 100000),
      log: [
        {
          label: "3月29日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月30日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月31日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月1日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月2日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月3日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月4日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
      ],
    },
    {
      active: true,
      name: "follows",
      label: "フォロー",
      self: Math.floor(Math.random() * (999999 - 100000) + 100000),
      others: Math.floor(Math.random() * (999999 - 100000) + 100000),
      log: [
        {
          label: "3月29日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月30日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "3月31日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月1日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月2日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月3日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "4月4日",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
          others: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
      ],
    },
    {
      active: true,
      name: "distributions",
      label: "商流",
      log: [
        {
          label: "プライム",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "二次請け",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "三次請け",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "営業支援",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "その他",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
      ],
    },
    {
      active: true,
      name: "approval",
      label: "稟議速度",
      log: [
        {
          label: "当日中",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "翌営業1日以内",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "翌営業3日以内",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
        {
          label: "不明",
          self: Math.floor(Math.random() * (9999 - 1000) + 1000),
        },
      ],
    },
  ],
};
