import { Helmet } from "react-helmet-async";

export const Meta = ({ user }) => {
  return (
    <Helmet>
      <title>
        {user?.profile?.person || user?.profile?.name
          ? `${user?.profile?.person} - ${user?.profile?.name}｜SES_HUB`
          : "SES_HUB｜営業支援App"}
      </title>
    </Helmet>
  );
};
