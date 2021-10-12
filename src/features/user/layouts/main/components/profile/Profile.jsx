import { useSelector } from "react-redux";
import * as rootSlice from "../../../../../root/rootSlice";

import { Company } from "./components/company/Company";
import { Person } from "./components/person/Person";

export const Profile = ({ type, user }) => {
  const demo = useSelector(rootSlice.verified).demo;

  return type === "companys" ? (
    <Company user={user} demo={demo} />
  ) : (
    type === "persons" && <Person user={user} demo={demo} />
  );
};
