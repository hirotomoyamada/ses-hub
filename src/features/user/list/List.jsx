import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { extractPosts } from "../../post/functions/extractPosts";
import * as postSlice from "../../post/postSlice";
import * as userSlice from "../userSlice";

import { Outputs } from "./components/outputs/Outputs";
import { Select } from "./components/select/Select";
import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";

import { Menu } from "../../../components/menu/Menu";
import { Fetch } from "../../../components/load/Load";
import { Modal } from "../../../components/modal/Modal";

export const List = (props) => {
  const dispatch = useDispatch();

  const index = useSelector(postSlice.index);
  const user = useSelector(userSlice.user);
  const list = props.match.params.list;

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

  const [outputs, setOutputs] = useState(false);
  const [selectOutputs, setSelectOutputs] = useState([]);
  const [outputsOpen, setOutputsOpen] = useState(false);

  useEffect(() => {
    index === "companys" && dispatch(postSlice.selectIndex("matters"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(postSlice.handlePage(list));
    if (list === "likes" || list === "entries") {
      handleClose();
    }
  }, [dispatch, list]);

  useEffect(() => {
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
    setOutputs(!outputs);
    setSelectOutputs([posts[0]]);
  };

  const handleSelect = ({ post }) => {
    const output = selectOutputs.find(
      (output) => output.objectID === post.objectID
    );
    !output && setSelectOutputs([...selectOutputs, post]);
  };

  const handleAllSelect = () => {
    setOutputs(!outputs);
    setSelectOutputs(posts.filter((output) => output && output));
  };

  const handleCancel = (objectID) => {
    setSelectOutputs(
      selectOutputs.filter((post) => post.objectID !== objectID)
    );
  };

  const handleAllCancel = () => {
    setOutputs(!outputs);
    setSelectOutputs([]);
  };

  const handleOutputs = () => {
    document.body.classList.add("lock");
    setOutputsOpen(!outputsOpen);
  };

  const handleClose = () => {
    document.body.classList.remove("lock");
    setOutputs(false);
    setSelectOutputs([]);
    setOutputsOpen(false);
  };

  const handleDelete = () => {
    dispatch(
      userSlice.removeOutput({
        index: index,
        objectIDs: selectOutputs.map((output) => output.objectID),
      })
    );

    handleClose();
  };

  return (
    <>
      <Fetch />

      <Header
        dispatch={dispatch}
        index={index}
        selectIndex={postSlice.selectIndex}
        outputs={outputs}
        selectOutputs={selectOutputs}
      />

      <Main
        index={index}
        user={user}
        list={list}
        posts={posts}
        hit={hit}
        outputs={outputs}
        selectOutputs={selectOutputs}
        handleCancel={handleCancel}
        handleSelect={handleSelect}
      />

      {outputsOpen && (
        <Outputs
          index={index}
          selectOutputs={selectOutputs}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      )}

      {list === "outputs" && (
        <Select
          posts={posts}
          outputs={outputs}
          selectOutputs={selectOutputs}
          handleOpen={handleOpen}
          handleOutputs={handleOutputs}
          handleAllSelect={handleAllSelect}
          handleAllCancel={handleAllCancel}
        />
      )}

      <Modal user={user} />
      <Menu user={user} />
    </>
  );
};
