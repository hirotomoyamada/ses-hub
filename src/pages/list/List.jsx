import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { extractPosts } from "../../features/post/actions/extractPosts";
import * as rootSlice from "../../features/root/rootSlice";
import * as postSlice from "../../features/post/postSlice";
import * as userSlice from "../../features/user/userSlice";

import { Header } from "../../components/header/Header";

import { Outputs } from "./components/outputs/Outputs";
import { Select } from "./components/select/Select";
import { Main } from "./components/main/Main";

import { Menu } from "../../components/menu/Menu";
import { Fetch } from "../../components/load/Load";

export const List = (props) => {
  const dispatch = useDispatch();

  const index = useSelector(rootSlice.index);
  const user = useSelector(userSlice.user);
  const list =
    props.match.params.list === "likes" ||
    props.match.params.list === "outputs" ||
    props.match.params.list === "entries"
      ? props.match.params.list
      : "likes";

  const posts = useSelector((state) =>
    postSlice.posts({
      state: state,
      page: list,
      index:
        list === "likes"
          ? index !== "companys"
            ? index
            : "matters"
          : list === "outputs"
          ? index
          : list === "entries" && index !== "companys"
          ? index
          : "matters",
    })
  );

  const hit = useSelector((state) =>
    postSlice.hit({
      state: state,
      page: list,
      index:
        list === "likes"
          ? index !== "companys"
            ? index
            : "matters"
          : list === "outputs"
          ? index
          : list === "entries" && index !== "companys"
          ? index
          : "matters",
    })
  );

  const [outputs, setOutputs] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    index === "companys" && dispatch(rootSlice.handleIndex("matters"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      props.match.params.list !== "likes" &&
      props.match.params.list !== "outputs" &&
      props.match.params.list !== "entries"
    ) {
      dispatch(rootSlice.handleNotFound(true));
    } else {
      dispatch(rootSlice.handlePage(list));
      if (list === "likes" || list === "entries") {
        handleClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, list]);

  useEffect(() => {
    (props.match.params.list === "likes" ||
      props.match.params.list === "outputs" ||
      props.match.params.list === "entries") &&
      !posts.length &&
      dispatch(
        extractPosts({
          index: index,
          objectIDs: user[list][index],
          type: list,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, index, list, user]);

  const handleOpen = () => {
    setOutputs([posts[0]]);
  };

  const handleSelect = ({ post }) => {
    const output = outputs.find((output) => output.objectID === post.objectID);
    !output && setOutputs([...outputs, post]);
  };

  const handleAllSelect = () => {
    setOutputs(posts.filter((output) => output && output));
  };

  const handleCancel = (objectID) => {
    setOutputs(outputs.filter((post) => post.objectID !== objectID));
  };

  const handleAllCancel = () => {
    setOutputs([]);
  };

  const handleOutputs = () => {
    document.body.classList.add("lock");
    setOpen(!open);
  };

  const handleBack = () => {
    dispatch(
      rootSlice.handleModal({
        type: "delete",
        text: "出力",
        close: () => handleClose(),
        delete: () => handleDelete(),
      })
    );
  };

  const handleClose = () => {
    open && dispatch(rootSlice.handleModal());
    setOpen(false);
    setOutputs([]);
  };

  const handleDelete = () => {
    dispatch(
      userSlice.removeOutput({
        index: index,
        objectIDs: outputs.map((output) => output.objectID),
      })
    );

    handleClose();
  };

  return (
    <div>
      <Fetch />

      <Header index={index} outputs={outputs} />

      <Main
        index={index}
        user={user}
        list={list}
        posts={posts}
        hit={hit}
        outputs={outputs}
        handleCancel={handleCancel}
        handleSelect={handleSelect}
      />

      {open && (
        <Outputs index={index} posts={outputs} handleBack={handleBack} />
      )}

      {list === "outputs" && (
        <Select
          posts={posts}
          outputs={outputs}
          handleOpen={handleOpen}
          handleOutputs={handleOutputs}
          handleAllSelect={handleAllSelect}
          handleAllCancel={handleAllCancel}
        />
      )}

      <Menu user={user} />
    </div>
  );
};
