import React from "react";
import { useSelector } from "react-redux";
import * as rootSlice from "./features/root/rootSlice";

import { Post } from "./pages/post/Post";
import { User } from "./pages/user/User";

import { NotFound } from "./pages/notFound/NotFound";

export const Page = (props) => {
  const index = useSelector(rootSlice.index);

  switch (props.match.params.index) {
    case "matters":
    case "resources":
      return (
        <Post
          index={props.match.params.index}
          objectID={props.match.params.id}
        />
      );
    case "companys":
    case "persons":
      return (
        <User
          index={{ user: props.match.params.index, post: index }}
          uid={props.match.params.id}
        />
      );
    default:
      return <NotFound display />;
  }
};
