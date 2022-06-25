import React from "react";

import { Password } from "./Password";
import { Email } from "./Email";
import { Create } from "./Create";
import { Reset } from "./Reset";
import { Delete } from "./Delete";
import { Main } from "./main/Main";

import { User } from "types/user";
import { NavigateFunction } from "react-router-dom";

interface PropType {
  user: User;
  email: boolean;
  password: boolean;
  create: boolean;
  remove: boolean;
  next: boolean;
  reset: boolean;
  setEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setRemove: React.Dispatch<React.SetStateAction<boolean>>;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  handleProvider: (provider: "google" | "twitter" | "github") => void;
  handleLogout: () => void;
  navigate: NavigateFunction;
}

export const Page: React.FC<PropType> = ({
  user,
  email,
  password,
  create,
  remove,
  next,
  reset,
  setEmail,
  setPassword,
  setCreate,
  setRemove,
  setNext,
  setReset,
  handleProvider,
  handleLogout,
  navigate,
}) => {
  return reset ? (
    <Reset />
  ) : create ? (
    <Create />
  ) : remove ? (
    <Delete next={next} user={user} setReset={setReset} setNext={setNext} />
  ) : email ? (
    <Email next={next} user={user} setReset={setReset} />
  ) : password ? (
    <Password next={next} setReset={setReset} />
  ) : (
    <Main
      user={user}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      setCreate={setCreate}
      setRemove={setRemove}
      handleProvider={handleProvider}
      handleLogout={handleLogout}
      navigate={navigate}
    />
  );
};
