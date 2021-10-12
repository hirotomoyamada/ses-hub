import styles from "./Profile.module.scss";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";

import * as rootSlice from "../../root/rootSlice";
import * as userSlice from "../userSlice";

import { Header } from "./components/header/Header";
import { Cover } from "./components/cover/Cover";
import { Icon } from "./components/icon/Icon";
import { Form } from "./components/form/Form";
import { Line } from "./components/line/Line";

export const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const [cover, setCover] = useState(false);
  const [icon, setIcon] = useState(false);
  const [line, setLine] = useState(false);

  const methods = useForm({
    defaultValues: {
      name: user?.profile?.name,
      person: user?.profile?.person,
      icon: user?.icon,
      cover: user?.cover,
      body: user?.profile?.body,
      more: user?.profile?.more,
      region: user?.profile?.region,
      postal: user?.profile?.postal,
      address: user?.profile?.address,
      tel: user?.profile?.tel,
      url: user?.profile?.url,
      social: user?.profile?.social,
    },
  });

  const handleClose = () => {
    dispatch(rootSlice.handleModal({ open: false }));
  };

  const handleBack = () => {
    setCover(false);
    setIcon(false);
    setLine(false);
  };

  const handleEdit = (data) => {
    data.uid = user.uid;

    dispatch(userSlice.editProfile(data));
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        className={`${styles.profile} ${
          (cover || icon || line) && styles.profile_change
        }`}
        onSubmit={methods.handleSubmit(handleEdit)}
      >
        <Header
          handleClose={handleClose}
          handleBack={handleBack}
          cover={cover}
          icon={icon}
          line={line}
        />

        {line ? (
          <Line />
        ) : cover ? (
          <Cover />
        ) : icon ? (
          <Icon />
        ) : (
          <Form
            cover={cover}
            icon={icon}
            setCover={setCover}
            setIcon={setIcon}
            setLine={setLine}
          />
        )}
      </form>
    </FormProvider>
  );
};
