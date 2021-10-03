import { useSelector } from "react-redux";
import * as useSlice from "../../../../userSlice";

import { Company } from "./components/company/Company";
import { Person } from "./components/person/Person";

export const Profile = ({ type, user }) => {
  const demo = useSelector(useSlice.verified).demo;

  return type === "companys" ? (
    <Company user={user} demo={demo} />
  ) : (
    type === "persons" && <Person user={user} demo={demo} />
  );
};
