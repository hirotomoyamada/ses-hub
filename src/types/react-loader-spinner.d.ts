import { BaseProps as P } from "react-loader-spinner/dist/type";

declare module "react-loader-spinner/dist/type" {
  interface BaseProps extends P {
    className?: string;
  }
}
