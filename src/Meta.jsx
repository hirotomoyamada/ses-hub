import { Helmet } from "react-helmet-async";

export const Meta = () => {
  return (
    <Helmet>
      <title>{`SES_HUB｜営業支援App`}</title>
      <link
        rel="icon"
        href={`${process.env.PUBLIC_URL}/img/logo/favicon.svg`}
      />
    </Helmet>
  );
};
