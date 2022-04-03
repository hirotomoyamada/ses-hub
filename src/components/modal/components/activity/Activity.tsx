import React from "react";
import styles from "./Activity.module.scss";

import { Matter, Resource } from "types/post";

import { Header } from "./components/header/Header";
import { Post } from "./components/post/Post";
import { User } from "./components/user/User";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  post: Matter | Resource;
  handleClose: () => void;
}

export const Activity: React.FC<PropType> = ({ index, post, handleClose }) => {
  const activity: {
    total: Record<string, number>;
    today: Record<string, number>;
    log: Record<string, string | number>[];
  } = {
    total: { views: 999999999, likes: 458392, outputs: 86758, entries: 3654 },
    today: { views: 3535133, likes: 32422, outputs: 4242, entries: 856 },
    log: [
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon2",
        display: "テスト大好きテスト大好きテスト大好き",
        type: "likes",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon7",
        display: "テスト大好き",
        type: "outputs",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon4",
        display: "テスト大好き",
        type: "entries",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon10",
        display: "テスト大好き",
        type: "outputs",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon28",
        display: "テスト大好き",
        type: "likes",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon16",
        display: "テスト大好き",
        type: "entries",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon2",
        display: "テスト大好き",
        type: "likes",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon7",
        display: "テスト大好き",
        type: "outputs",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon4",
        display: "テスト大好き",
        type: "entries",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon10",
        display: "テスト大好き",
        type: "outputs",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon28",
        display: "テスト大好き",
        type: "likes",
        createAt: 1648926491236,
      },
      {
        index: "companys",
        uid: "lEFmAu7DyWSoTYHqCPLYiP7RJf62",
        icon: "icon16",
        display: "テスト大好き",
        type: "entries",
        createAt: 1648926491236,
      },
    ],
  };

  return (
    <div className={`${styles.activity} ${post && styles.activity_post}`}>
      <Header post={post} handleClose={handleClose} />

      {post ? (
        <Post index={index} post={post} activity={activity} />
      ) : (
        <User activity={activity} />
      )}
    </div>
  );
};
