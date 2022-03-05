import { User } from "types/user";
import { Company, Person } from "types/post";

export interface State {
  user: User | unknown;

  selectUser: Company | Person | (Company | Person)[] | unknown;

  token: string | null;
}

export const initialState: State = {
  user: {},

  selectUser: {},

  token: null,
};
