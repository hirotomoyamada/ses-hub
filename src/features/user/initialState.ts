import { User } from "types/user";
import { Company, Person } from "types/post";

export type Analytics = {
  active: boolean;
  key:
    | "posts"
    | "histories"
    | "likes"
    | "outputs"
    | "entries"
    | "follows"
    | "distribution"
    | "approval";
  label: string;
  self?: number;
  others?: number;
  log: {
    label: string;
    self: number;
    others?: number;
    [key: string]: string | number | undefined;
  }[];
}[];

export interface State {
  user: User | unknown;
  selectUser: Company | Person | (Company | Person)[] | unknown;
  token?: string;
  analytics: { [key: string]: Analytics | unknown };
}

export const initialState: State = {
  user: {},
  selectUser: {},
  token: undefined,
  analytics: {},
};
