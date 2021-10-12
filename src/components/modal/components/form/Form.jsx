import styles from "./Form.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";

import { createPost } from "../../../../features/post/functions/createPost";
import * as rootSlice from "../../../../features/root/rootSlice";
import * as postSlice from "../../../../features/post/postSlice";
import * as userSlice from "../../../../features/user/userSlice";

import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { defaultValues } from "./functions/defaultValues";
import { matters } from "./functions/matters";
import { resources } from "./functions/resources";

export const Form = ({ edit }) => {
  const dispatch = useDispatch();
  const post = useSelector(postSlice.post);
  const user = useSelector(userSlice.user);
  const index = useSelector(rootSlice.index);
  const demo = useSelector(rootSlice.verified).demo;

  const methods = useForm({
    defaultValues: defaultValues(index, post, edit),
  });

  const handleClose = () => {
    dispatch(rootSlice.handleModal({ open: false }));
  };

  const handleCreate = (data) => {
    if (demo) {
      handleClose();
      return;
    }
    const object =
      index === "matters"
        ? matters(data)
        : index === "resources" && resources(data);
    dispatch(createPost({ index: index, post: object }));

    handleClose();
  };

  const handleEdit = (data) => {
    if (user.uid !== post.uid) {
      handleClose();
      return;
    } else {
      const object =
        index === "matters"
          ? {
              ...post,
              ...matters(data),
            }
          : index === "resources" && {
              ...post,
              ...resources(data),
            };

      dispatch(postSlice.editPost({ index: index, post: object }));

      handleClose();
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form}>
        <Header
          edit={edit}
          handleClose={handleClose}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
        />
        <Main index={index} />
      </form>
    </FormProvider>
  );
};
