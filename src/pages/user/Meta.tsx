import React from "react";
import { Helmet } from "react-helmet-async";
import { Company, Person } from "types/post";
import { User } from "types/user";

interface PropType {
  index: "companys" | "persons";
  user: User | Company | Person;
}

export const Meta: React.FC<PropType> = ({ index, user }) => {
  return (
    <Helmet>
      {index === "companys" ? (
        <title>
          {index === "companys" &&
          ((user as Company)?.profile?.person || user?.profile?.name)
            ? `${(user as Company)?.profile?.person} - ${
                user?.profile?.name
              }｜SES_HUB`
            : "SES_HUB｜営業支援App"}
        </title>
      ) : index === "persons" ? (
        <title>
          {(user as Person)?.profile?.nickName
            ? `${(user as Person)?.profile?.nickName}｜SES_HUB`
            : "SES_HUB｜営業支援App"}
        </title>
      ) : (
        <title>{"SES_HUB｜営業支援App"}</title>
      )}
    </Helmet>
  );
};
