import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { RouteComponentProps } from "react-router-dom";

import { extractPosts } from "features/post/actions";
import * as rootSlice from "features/root/rootSlice";
import * as postSlice from "features/post/postSlice";
import * as userSlice from "features/user/userSlice";

import { Header } from "components/header/Header";

import { List as Main } from "components/list/List";
import { Outputs } from "./components/outputs/Outputs";
import { Select } from "./components/select/Select";

import { Matter, Resource } from "types/post";

export const List: React.FC<
  RouteComponentProps<{ list: "likes" | "outputs" | "entries" }>
> = (props) => {
  const dispatch = useDispatch();

  const index = useSelector(rootSlice.index);
  const user = useSelector(userSlice.user);
  const list =
    props.match.params.list === "likes" ||
    props.match.params.list === "outputs" ||
    props.match.params.list === "entries"
      ? props.match.params.list
      : "likes";

  const posts = useSelector((state: RootState) =>
    postSlice.posts({
      state: state,
      page: list,
      index:
        list === "likes"
          ? index !== "companys"
            ? index
            : "matters"
          : list === "outputs"
          ? index !== "companys" && index !== "persons"
            ? index
            : "matters"
          : list === "entries" && index !== "companys"
          ? index
          : "matters",
    })
  );

  const hit = useSelector((state: RootState) =>
    postSlice.hit({
      state: state,
      page: list,
      index:
        list === "likes"
          ? index !== "companys"
            ? index
            : "matters"
          : list === "outputs"
          ? index !== "companys" && index !== "persons"
            ? index
            : "matters"
          : list === "entries" && index !== "companys"
          ? index
          : "matters",
    })
  );

  const [outputs, setOutputs] = useState<Matter[] | Resource[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (index === "companys" || (list === "outputs" && index === "persons")) &&
      dispatch(rootSlice.handleIndex("matters"));
  }, [list]);

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
  }, [dispatch, list]);

  useEffect(() => {
    const likes = props.match.params.list === "likes" && index !== "companys";
    const outputs =
      props.match.params.list === "outputs" &&
      index !== "companys" &&
      index !== "persons";
    const entries =
      props.match.params.list === "entries" && index !== "companys";

    (likes || outputs || entries) &&
      !posts?.length &&
      dispatch(
        extractPosts({
          index: index,
          objectIDs: likes
            ? user.likes[index]
            : outputs
            ? user.outputs[index]
            : entries
            ? user.entries[index]
            : undefined,
          type: list,
        })
      );
  }, [dispatch, index, list, user]);

  const handleOpen = (): void => {
    if (index === "matters") {
      setOutputs([(posts as Matter[])?.[0]]);
    }

    if (index === "resources") {
      setOutputs([(posts as Resource[])?.[0]]);
    }
  };

  const handleSelect = (post: Matter | Resource): void => {
    if (index === "matters") {
      const output = (outputs as Matter[]).find(
        (output) => output.objectID === post.objectID
      );

      !output && setOutputs([...(outputs as Matter[]), post as Matter]);
    }

    if (index === "resources") {
      const output = (outputs as Resource[]).find(
        (output) => output.objectID === post.objectID
      );

      !output && setOutputs([...(outputs as Resource[]), post as Resource]);
    }
  };

  const handleAllSelect = (): void => {
    if (index === "matters") {
      setOutputs((posts as Matter[]).filter((output) => output));
    }

    if (index === "resources") {
      setOutputs((posts as Resource[]).filter((output) => output));
    }
  };

  const handleCancel = (objectID: string): void => {
    if (index === "matters") {
      setOutputs(
        (outputs as Matter[]).filter((post) => post.objectID !== objectID)
      );
    }

    if (index === "resources") {
      setOutputs(
        (outputs as Resource[]).filter((post) => post.objectID !== objectID)
      );
    }
  };

  const handleAllCancel = (): void => {
    setOutputs([]);
  };

  const handleOutputs = (): void => {
    document.body.classList.add("lock");
    setOpen(!open);
  };

  const handleBack = (): void => {
    dispatch(
      rootSlice.handleModal({
        type: "delete",
        text: "出力",
        close: () => handleClose(),
        delete: () => handleDelete(),
      })
    );
  };

  const handleClose = (): void => {
    open && dispatch(rootSlice.handleModal());
    setOpen(false);
    setOutputs([]);
  };

  const handleDelete = (): void => {
    if (index === "matters" || index === "resources") {
      dispatch(
        userSlice.removeOutput({
          index: index,
          objectIDs: outputs.map((output) => output.objectID),
        })
      );
    }

    handleClose();
  };

  return (
    <div>
      <Header index={index} user={user} outputs={outputs} />

      <Main
        index={index}
        user={user}
        type={list}
        posts={posts}
        hit={hit}
        outputs={outputs}
        handleCancel={handleCancel}
        handleSelect={handleSelect}
      />

      {open && (
        <Outputs
          index={index as "matters" | "resources"}
          posts={outputs}
          handleBack={handleBack}
        />
      )}

      {list === "outputs" && (
        <Select
          posts={posts as Matter[] | Resource[]}
          outputs={outputs}
          handleOpen={handleOpen}
          handleOutputs={handleOutputs}
          handleAllSelect={handleAllSelect}
          handleAllCancel={handleAllCancel}
        />
      )}
    </div>
  );
};
