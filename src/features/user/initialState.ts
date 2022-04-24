import { User } from "types/user";
import { Company, Person } from "types/post";

export type Activity = {
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
  }[];
}[];

export interface State {
  user: User | unknown;
  selectUser: Company | Person | (Company | Person)[] | unknown;
  token?: string;
  activity: { [key: string]: Activity | unknown };
}

export const initialState: State = {
  user: {},
  selectUser: {},
  token: undefined,
  activity: {},
};
