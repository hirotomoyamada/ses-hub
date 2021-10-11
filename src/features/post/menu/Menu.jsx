import styles from "./Menu.module.scss";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as postSlice from "../postSlice";
import * as userSlice from "../../user/userSlice";

import { Command } from "../../../components/command/Command";
import { VerificationModal } from "../../../components/modal/Modal";

export const Menu = ({ index, post, user, back, postItem }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [verification, setVerification] = useState(false);
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

  const handleCancel = () => {
    document.body.classList.toggle("lock");

    setVerification(false);
  };

  const handleVerification = () => {
    document.body.classList.toggle("lock");

    setVerification(true);
    setOpen(false);
  };

  const handleEdit = () => {
    dispatch(postSlice.handleModal({ type: "edit", open: true }));
    dispatch(postSlice.selectPost(post));
    setOpen(!open);
  };

  const handleDelete = (post) => {
    document.body.classList.toggle("lock");

    setVerification(false);
    dispatch(postSlice.deletePost({ index: index, post: post }));
    dispatch(
      userSlice.deletePost({
        index: index,
        post: post,
      })
    );

    back && history.goBack();
    setOpen(!open);
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

      <VerificationModal
        verification={verification}
        text="投稿"
        cancel={handleCancel}
        submit={() => handleDelete(post)}
      />
    </>
  );
};
