import React from "react";
import { useSelector } from "react-redux";

import * as rootSlice from "features/root/rootSlice";

import { Company } from "./components/company/Company";
import { Person } from "./components/person/Person";

import * as Post from "types/post";
import { User } from "types/user";

interface PropType {
  index: "companys" | "persons";
  user: Post.Company | Post.Person;
  currentUser: User;
}

export const Profile: React.FC<PropType> = ({ index, user, currentUser }) => {
  const demo = useSelector(rootSlice.verified).demo;

  return index === "companys" ? (
    <Company user={user as Post.Company} demo={demo} />
  ) : index === "persons" ? (
    <Person user={user as Post.Person} currentUser={currentUser} />
  ) : (
    <></>
  );
};
