import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as rootSlice from "../../root/rootSlice";

export const useEntry = (index, post, user) => {
  const dispatch = useDispatch();

  const [entry, setEntry] = useState(false);

  const handleEntry = () => {
    dispatch(rootSlice.handleModal({ type: "entry" }));
  };

  useEffect(() => {
    setEntry(
      user.entries?.[index]?.indexOf(post?.objectID) >= 0 ? true : false
    );
  }, [index, post?.objectID, user.entries]);

  return [entry, handleEntry];
};
