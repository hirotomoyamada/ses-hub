import styles from "./Profile.module.scss";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import * as userSlice from "features/user/userSlice";

import { Header } from "./components/header/Header";
import { Cover } from "./components/cover/Cover";
import { Icon } from "./components/icon/Icon";
import { Form } from "./components/form/Form";
import { Line } from "./components/line/Line";

import { Company as SelectUser } from "types/post";
import { User } from "types/user";

interface PropType {
  user: User | SelectUser;
  handleClose: () => void;
}

export type Data = {
  name: string;
  person: string;
  icon: string;
  cover: string;
  body: string | null;
  more: string[];
  region: string[];
  postal: string | null;
  address: string | null;
  tel: string | null;
  url: string | null;
  social: {
    line: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedIn: string | null;
  };
  uid?: string;
};

export const Profile: React.FC<PropType> = ({ user, handleClose }) => {
  const dispatch = useDispatch();
  const [cover, setCover] = useState(false);
  const [icon, setIcon] = useState(false);
  const [line, setLine] = useState(false);

  const methods = useForm<Data>({
    defaultValues: {
      name: user?.profile?.name,
      person:
        user?.profile?.person !== "名無しさん" && user?.profile?.person
          ? user.profile.person
          : undefined,
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

  const handleBack = () => {
    setCover(false);
    setIcon(false);
    setLine(false);
  };

  const handleEdit: SubmitHandler<Data> = (data) => {
    data.uid = user.uid;

    dispatch(userSlice.editProfile(data));
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.profile}
        onSubmit={methods.handleSubmit(handleEdit)}
      >
        <Header
          user={user}
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