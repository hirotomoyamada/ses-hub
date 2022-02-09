import { useDispatch, useSelector } from "react-redux";
import * as rootSlice from "./features/root/rootSlice";

import { Post } from "./pages/post/Post";
import { User } from "./pages/user/User";

export const Page = (props) => {
  const dispatch = useDispatch();

  const i = props.match.params.index;
  const id = props.match.params.id;
  const index = useSelector(rootSlice.index);

  i !== "matters" &&
    i !== "resources" &&
    i !== "companys" &&
    i !== "persons" &&
    dispatch(rootSlice.handleNotFound(true));

  return i === "matters" || i === "resources" ? (
    <Post index={i} objectID={id} />
  ) : (
    (i === "companys" || i === "persons") && (
      <User index={{ user: i, post: index }} uid={id} />
    )
  );
};
