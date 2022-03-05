import { Products } from "types/pay";

export interface State {
  products: Products | unknown;
  tax: number;
}

export const initialState: State = {
  products: {},
  tax: 0,
};
