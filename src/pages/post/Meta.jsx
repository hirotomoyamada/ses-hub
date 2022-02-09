import { Helmet } from "react-helmet-async";

export const Meta = ({ post }) => {
  return (
    <Helmet>
      <title>
        {post?.title ? `${post.title}｜SES_HUB` : "SES_HUB｜営業支援App"}
      </title>
    </Helmet>
  );
};
