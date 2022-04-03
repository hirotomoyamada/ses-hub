import React from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

import { Post } from "pages/post/Post";
import { User } from "pages/user/User";
import { NotFound } from "pages/notFound/NotFound";

export const Page: React.FC = () => {
  const index = useSelector(rootSlice.index);
  const { i, id } = useParams<{ i: string; id: string }>();

  if (!i || !id) {
    return <NotFound display />;
  }

  switch (i) {
    case "matters":
    case "resources":
      return <Post index={i} objectID={id} />;
    case "companys":
    case "persons":
      return (
        <User
          index={{
            user: i,
            post: index,
          }}
          uid={id}
        />
      );
    default:
      return <NotFound display />;
  }
};
