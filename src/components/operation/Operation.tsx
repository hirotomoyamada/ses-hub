import React, { useState } from "react";
import styles from "./Operation.module.scss";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FilterListIcon from "@material-ui/icons/FilterList";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as rootSlice from "features/root/rootSlice";
import * as postSlice from "features/post/postSlice";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  index?: "matters" | "resources";
  user?: User;
  post?: Matter | Resource;
  sort?: boolean;
  back?: boolean;
  item?: boolean;
}

export const Operation: React.FC<PropType> = ({
  index,
  user,
  post,
  sort,
  back,
  item,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    window.removeEventListener("scroll", handleOpen);
  };

  const handleVerification = () => {
    if (!post) return;

    dispatch(
      rootSlice.handleModal({
        type: "delete",
        text: "投稿",
        delete: () => handleDelete(post),
      })
    );
    setOpen(!open);
  };

  const handleEdit = () => {
    if (!post) return;

    dispatch(rootSlice.handleModal({ type: "edit" }));
    dispatch(postSlice.selectPost(post));
    setOpen(!open);
  };

  const handleDelete = (post: Matter | Resource) => {
    if (!index) return;

    dispatch(postSlice.deletePost({ index: index, post: post }));
    dispatch(rootSlice.handleModal());

    back && navigate("/search");
  };

  const handleActivity = () => {
    if (!post) return;

    if (user?.payment?.status !== "canceled") {
      dispatch(postSlice.selectPost(post));
      dispatch(
        rootSlice.handleModal({ type: "activity", meta: { type: "post" } })
      );
    } else {
      dispatch(
        rootSlice.handleAnnounce({ error: "プランを選択する必要があります" })
      );
    }

    setOpen(!open);
  };

  const handleSortChange = ({
    target,
    type,
  }: {
    target: string;
    type: string;
  }): void => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(rootSlice.handleSearch({ target, type }));
    setOpen(!open);
  };

  open && window.addEventListener("scroll", handleOpen);

  return (
    <div className={`${styles.operation} ${item && styles.operation_item}`}>
      <button type="button" onClick={handleOpen}>
        {sort ? (
          <FilterListIcon className={styles.operation_filter} />
        ) : (
          <MoreHorizIcon className={styles.operation_more} />
        )}
      </button>

      {open && sort && (
        <div
          className={`${styles.operation_modal} ${styles.operation_modal_sort}`}
        >
          <button
            onClick={() =>
              handleSortChange &&
              handleSortChange({ target: "createAt", type: "desc" })
            }
            className={styles.operation_modal_btn}
          >
            新着順
          </button>
          <button
            onClick={() =>
              handleSortChange &&
              handleSortChange({ target: "updateAt", type: "desc" })
            }
            className={styles.operation_modal_btn}
          >
            更新順
          </button>
        </div>
      )}

      {open && post && (
        <div className={styles.operation_modal}>
          <button onClick={handleEdit} className={styles.operation_modal_btn}>
            編集
          </button>
          <button
            onClick={handleActivity}
            className={styles.operation_modal_btn}
          >
            アクティビティ
          </button>
          <button
            onClick={handleVerification}
            className={`${styles.operation_modal_btn} ${styles.operation_modal_btn_remove}`}
          >
            削除
          </button>
        </div>
      )}

      {open && (
        <div onClick={handleOpen} className={styles.operation_overlay}></div>
      )}
    </div>
  );
};
