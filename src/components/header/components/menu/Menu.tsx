import React from "react";
import styles from "./Menu.module.scss";

import { User } from "types/user";
import { Matter, Resource } from "types/post";

interface PropType {
  handleIndex: (i: "matters" | "resources" | "companys" | "persons") => void;
  page: string;
  user?: User;
  index?: "matters" | "resources" | "companys" | "persons";
  uid?: string;
  outputs?: Matter[] | Resource[];
}

export const Menu: React.FC<PropType> = ({
  index,
  uid,
  user,
  handleIndex,
  page,
  outputs,
}) => {
  return !outputs?.length ? (
    <div
      className={`${styles.menu} ${
        page === "search"
          ? user?.payment?.status !== "canceled" &&
            user?.payment?.option?.freelanceDirect
            ? styles.menu_over
            : styles.menu_triangle
          : (page === "likes" || page === "entries") &&
            user?.payment?.status !== "canceled" &&
            user?.payment?.option?.freelanceDirect
          ? styles.menu_triangle
          : page === "user" &&
            user?.uid === uid &&
            user?.payment?.status !== "canceled" &&
            styles.menu_triangle
      }`}
    >
      <button
        onClick={() => handleIndex("matters")}
        className={`${styles.menu_btn} ${
          index === "matters" && styles.menu_btn_active
        }`}
      >
        案件
      </button>

      <button
        onClick={() => handleIndex("resources")}
        className={`${styles.menu_btn} ${
          index === "resources" && styles.menu_btn_active
        }`}
      >
        人材
      </button>

      {(page === "search" || page === "likes" || page === "entries") &&
        user?.payment?.status !== "canceled" &&
        user?.payment?.option?.freelanceDirect && (
          <button
            onClick={() => handleIndex("persons")}
            className={`${styles.menu_btn} ${
              index === "persons" && styles.menu_btn_active
            }`}
          >
            フリーランス
          </button>
        )}

      {(page === "search" ||
        (page === "user" &&
          user?.uid === uid &&
          user?.payment?.status !== "canceled")) && (
        <button
          onClick={() => handleIndex("companys")}
          className={`${styles.menu_btn} ${
            index === "companys" && styles.menu_btn_active
          }`}
        >
          {!uid ? "メンバー" : "フォロー中"}
        </button>
      )}
    </div>
  ) : (
    <div className={`${styles.menu} ${styles.menu_outputs}`}>
      <span className={styles.menu_outputs_txt}>
        {outputs.length}件&nbsp;選択中
      </span>
    </div>
  );
};
