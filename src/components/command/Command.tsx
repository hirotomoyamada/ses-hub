import React, { useEffect, useState } from "react";
import styles from "./Command.module.scss";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as rootSlice from "features/root/rootSlice";
import * as postSlice from "features/post/postSlice";
import * as userSlice from "features/user/userSlice";

import { Operation } from "components/operation/Operation";

import { Matter, Resource, Person } from "types/post";
import { User } from "types/user";

interface PropType {
  post: Matter | Resource | Person;
  user: User;
  index?: "matters" | "resources" | "persons";
  back?: boolean;
  item?: boolean;
  person?: boolean;
}

export const Command: React.FC<PropType> = ({
  index,
  post,
  user,
  back,
  item,
  person,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const [clickLike, setClickLike] = useState(false);
  const [like, setLike] = useState(false);

  const [clickOutput, setClickOutput] = useState(false);
  const [output, setOutput] = useState(false);
  const [entry, setEntry] = useState(false);

  useEffect(() => {
    if (index) {
      const likes: string[] = user?.likes?.[index];
      const outputs: string[] = index !== "persons" ? user.outputs[index] : [];
      const entries: string[] = user?.entries?.[index];

      setLike(
        likes.indexOf(
          index !== "persons"
            ? (post as Matter | Resource)?.objectID
            : post?.uid
        ) >= 0
          ? true
          : false
      );

      setOutput(
        outputs.indexOf((post as Matter | Resource)?.objectID) >= 0
          ? true
          : false
      );

      setEntry(
        entries.indexOf((post as Matter | Resource)?.objectID) >= 0
          ? true
          : false
      );
    }
  }, [
    index,
    (post as Matter | Resource)?.objectID,
    post?.uid,
    user?.likes,
    user?.outputs,
    user?.entries,
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
        delete: () => handleDelete(post as Matter | Resource),
      })
    );
    setOpen(!open);
  };

  const handleEdit = () => {
    dispatch(rootSlice.handleModal({ type: "edit" }));
    dispatch(postSlice.selectPost(post as Matter | Resource));
    setOpen(!open);
  };

  const handleDelete = (post: Matter | Resource) => {
    if (index === "matters" || index === "resources") {
      dispatch(postSlice.deletePost({ index: index, post: post }));
      dispatch(rootSlice.handleModal());
    }

    back && history.push("/search");
  };

  const handleActivity = () => {
    dispatch(postSlice.selectPost(post as Matter | Resource));
    dispatch(rootSlice.handleModal({ type: "activity" }));
    setOpen(!open);
  };

  const handleLike = () => {
    if (!like && index) {
      dispatch(userSlice.addLike({ index: index, post: post }));

      setClickLike(true);
    } else if (index) {
      dispatch(userSlice.removeLike({ index: index, post: post }));

      setClickLike(false);
    }

    setLike(!like);
  };

  const handleOutput = () => {
    if (index === "matters" || index === "resources") {
      if (!output) {
        dispatch(
          userSlice.addOutput({ index: index, post: post as Matter | Resource })
        );

        setClickOutput(true);
      } else {
        dispatch(
          userSlice.removeOutput({
            index: index,
            post: post as Matter | Resource,
          })
        );

        setClickOutput(false);
      }

      setOutput(!output);
    }
  };

  return (
    <>
      <div
        className={`${styles.command} ${item && styles.command_item} ${
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

        {(post as Person).request === "hold" ? (
          <AutorenewIcon
            className={`${styles.command_icon} ${styles.command_icon_hold}`}
          />
        ) : (
          (post as Person).request === "enable" && (
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
                handleActivity={handleActivity}
                handleOpen={handleOpen}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
