import { useSelector } from "react-redux";
import * as rootSlice from "../../../../../../features/root/rootSlice";

import { Company } from "./components/company/Company";
import { Person } from "./components/person/Person";

export const Profile = ({ index, user, currentUser }) => {
  const demo = useSelector(rootSlice.verified).demo;

  return index === "companys" ? (
    <Company user={user} demo={demo} />
  ) : (
    index === "persons" && <Person user={user} currentUser={currentUser} />
  );
};