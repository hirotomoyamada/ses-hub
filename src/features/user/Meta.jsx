import { Helmet } from "react-helmet-async";

export const Meta = ({ index, user }) => {
  return (
    <Helmet>
      <title>
        {index === "companys" && (user?.profile?.person || user?.profile?.name)
          ? `${user?.profile?.person} - ${user?.profile?.name}｜SES_HUB`
          : index === "persons" && user?.profile?.nickName
          ? `${user?.profile?.nickName}｜SES_HUB`
          : "SES_HUB｜営業支援App"}
      </title>
    </Helmet>
  );
};
