import React from "react";
import styles from "./Form.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { createPost } from "features/post/actions";
import * as rootSlice from "features/root/rootSlice";
import * as postSlice from "features/post/postSlice";

import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";

import * as functions from "functions";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  user: User;
  post: Matter | Resource;
  handleClose: () => void;
  edit?: boolean;
}

export const Form: React.FC<PropType> = ({
  index,
  user,
  post,
  handleClose,
  edit,
}) => {
  const dispatch = useDispatch();

  const page = useSelector(rootSlice.page);
  const demo = useSelector(rootSlice.verified)?.demo;

  const methods = useForm<
    functions.form.Data["matter"] & functions.form.Data["resource"]
  >({
    defaultValues: functions.form.defaultValues(
      index as "matters" | "resources",
      post,
      edit
    ),
  });

  const handleCreate: SubmitHandler<
    functions.form.Data["matter"] & functions.form.Data["resource"]
  > = (data) => {
    if (
      (index === "matters" || index === "resources") &&
      (page === "home" || page === "search" || page === "user")
    ) {
      if (demo) {
        handleClose();
        return;
      }
      const create =
        index === "matters"
          ? functions.form.matters(
              data as unknown as functions.form.Data["matter"]
            )
          : index === "resources" &&
            functions.form.resources(
              data as unknown as functions.form.Data["resource"]
            );

      create &&
        dispatch(createPost({ index: index, page: page, post: create }));

      handleClose();
    }
  };

  const handleEdit: SubmitHandler<
    functions.form.Data["matter"] & functions.form.Data["resource"]
  > = (data) => {
    if (index === "matters" || index === "resources") {
      if (user.uid !== post.uid) {
        handleClose();
        return;
      } else {
        const edit =
          index === "matters"
            ? {
                ...post,
                ...functions.form.matters(
                  data as unknown as functions.form.Data["matter"]
                ),
              }
            : index === "resources" && {
                ...post,
                ...functions.form.resources(
                  data as unknown as functions.form.Data["resource"]
                ),
              };

        edit && dispatch(postSlice.editPost({ index: index, post: edit }));

        handleClose();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={
          edit
            ? methods.handleSubmit(handleEdit)
            : methods.handleSubmit(handleCreate)
        }
      >
        <Header edit={edit} handleClose={handleClose} />
        <Main index={index as "matters" | "resources"} />
      </form>
    </FormProvider>
  );
};
