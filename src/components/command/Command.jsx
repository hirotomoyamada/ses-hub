import styles from "./Command.module.scss";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as rootSlice from "../../features/root/rootSlice";
import * as postSlice from "../../features/post/postSlice";
import * as userSlice from "../../features/user/userSlice";

import { Operation } from "../operation/Operation";

export const Command = ({ index, post, user, back, postItem, person }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const [clickLike, setClickLike] = useState(false);
  const [like, setLike] = useState(false);

  const [clickOutput, setClickOutput] = useState(false);
  const [output, setOutput] = useState(false);
  const [entry, setEntry] = useState(false);

  useEffect(() => {
    setLike(
      user.likes?.[index]?.indexOf(
        index !== "persons" ? post?.objectID : post?.uid
      ) >= 0
        ? true
        : false
    );
    setOutput(
      user.outputs?.[index]?.indexOf(post?.objectID) >= 0 ? true : false
    );
    setEntry(
      user.entries?.[index]?.indexOf(post?.objectID) >= 0 ? true : false
    );
  }, [
    index,
    post?.objectID,
    post?.uid,
    user.entries,
    user.likes,
    user.outputs,
  ]);

  const handleOpen = () => {
    setOpen(!open);
    window.removeEventListener("scroll", handleOpen);
  };

  const handleVerification = () => {
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
    dispatch(rootSlice.handleModal({ type: "edit" }));
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

      setClickLike(true);
    } else {
      dispatch(userSlice.removeLike({ index: index, post: post }));

      setClickLike(false);
    }

    setLike(!like);
  };

  const handleOutput = () => {
    if (!output) {
      dispatch(userSlice.addOutput({ index: index, post: post }));

      setClickOutput(true);
    } else {
      dispatch(userSlice.removeOutput({ index: index, post: post }));

      setClickOutput(false);
    }

    setOutput(!output);
  };

  return (
    <>
      <div
        className={`${styles.command} ${postItem && styles.command_postItem} ${
          person && styles.command_person
        }`}
      >
        {(user?.payment?.status !== "canceled" || post?.uid === user.uid) && (
          <button onClick={handleLike}>
            {like ? (
              <FavoriteIcon
                className={`${styles.command_icon} ${
                  styles.command_icon_like
                } ${clickLike && styles.command_icon_like_click}`}
              />
            ) : (
              <FavoriteBorderIcon className={styles.command_icon} />
            )}
          </button>
        )}

        {index !== "persons" &&
          (user?.payment?.status !== "canceled" || post?.uid === user.uid) && (
            <button onClick={handleOutput}>
              <LaunchIcon
                className={`${styles.command_icon} ${
                  output && styles.command_icon_output
                }
                ${clickOutput && styles.command_icon_output_click}`}
              />
            </button>
          )}

        {post.request === "hold" ? (
          <AutorenewIcon
            className={`${styles.command_icon} ${styles.command_icon_hold}`}
          />
        ) : (
          post.request === "enable" && (
            <CheckCircleOutlineIcon
              className={`${styles.command_icon} ${styles.command_icon_enable}`}
            />
          )
        )}

        {entry && (
          <CheckCircleOutlineIcon
            className={`${styles.command_icon} ${styles.command_icon_entry}`}
          />
        )}

        {post?.uid === user.uid && (
          <div className={styles.command_cmd}>
            <button onClick={handleOpen}>
              <MoreHorizIcon className={styles.command_icon} />
            </button>
            {open && (
              <Operation
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
