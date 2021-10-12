import styles from "./Menu.module.scss";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as rootSlice from "../../root/rootSlice";
import * as postSlice from "../postSlice";
import * as userSlice from "../../user/userSlice";

import { Command } from "../../../components/command/Command";

export const Menu = ({ index, post, user, back, postItem }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const [output, setOutput] = useState(false);
  const [entry, setEntry] = useState(false);

  useEffect(() => {
    setLike(user.likes?.[index]?.indexOf(post?.objectID) >= 0 ? true : false);
    setOutput(
      user.outputs?.[index]?.indexOf(post?.objectID) >= 0 ? true : false
    );
    setEntry(
      user.entries?.[index]?.indexOf(post?.objectID) >= 0 ? true : false
    );
  }, [index, post?.objectID, user.entries, user.likes, user.outputs]);

  const handleOpen = () => {
    setOpen(!open);
    window.removeEventListener("scroll", handleOpen);
  };

  const handleVerification = () => {
    dispatch(
      rootSlice.handleModal({
        type: "delete",
        text: "投稿",
        func: () => handleDelete(post),
      })
    );
    setOpen(!open);
  };

  const handleEdit = () => {
    dispatch(rootSlice.handleModal("edit"));
    dispatch(postSlice.selectPost(post));
    setOpen(!open);
  };

  const handleDelete = (post) => {
    dispatch(postSlice.deletePost({ index: index, post: post }));
    dispatch(rootSlice.handleModal());

    back && history.goBack();
  };

  const handleLike = () => {
    if (!like) {
      dispatch(userSlice.addLike({ index: index, post: post }));
    } else {
      dispatch(userSlice.removeLike({ index: index, post: post }));
    }

    setLike(!like);
  };

  const handleOutput = () => {
    if (!output) {
      dispatch(userSlice.addOutput({ index: index, post: post }));
    } else {
      dispatch(userSlice.removeOutput({ index: index, post: post }));
    }

    setOutput(!output);
  };

  return (
    <>
      <div className={`${styles.menu} ${postItem && styles.menu_postItem}`}>
        <button onClick={handleLike}>
          {like ? (
            <FavoriteIcon
              className={`${styles.menu_icon} ${styles.menu_icon_like}`}
            />
          ) : (
            <FavoriteBorderIcon className={styles.menu_icon} />
          )}
        </button>
        <button onClick={handleOutput}>
          <LaunchIcon
            className={`${styles.menu_icon} ${
              output && styles.menu_icon_output
            }`}
          />
        </button>
        {entry && (
          <CheckCircleOutlineIcon
            className={`${styles.menu_icon} ${styles.menu_icon_entry}`}
          />
        )}
        {post?.uid === user.uid && (
          <div className={styles.menu_cmd}>
            <button onClick={handleOpen}>
              <MoreHorizIcon className={styles.menu_icon} />
            </button>
            {open && (
              <Command
                post
                open={open}
                handleVerification={handleVerification}
                handleEdit={handleEdit}
                handleOpen={handleOpen}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
