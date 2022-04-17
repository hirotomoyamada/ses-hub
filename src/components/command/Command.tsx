import React, { useEffect, useState } from "react";
import styles from "./Command.module.scss";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import { useDispatch } from "react-redux";

import * as userSlice from "features/user/userSlice";

import { Matter, Resource, Person } from "types/post";
import { User } from "types/user";

interface PropType {
  post: Matter | Resource | Person;
  user: User;
  index?: "matters" | "resources" | "persons";
  back?: boolean;
}

export const Command: React.FC<PropType> = ({ index, post, user }) => {
  const dispatch = useDispatch();

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
      <div className={`${styles.command}`}>
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

            {(post as Matter | Resource).likes ? (
              <span>{(post as Matter | Resource).likes}</span>
            ) : (
              <></>
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

              {(post as Matter | Resource).outputs ? (
                <span>{(post as Matter | Resource).outputs}</span>
              ) : (
                <></>
              )}
            </button>
          )}

        {index !== "persons" ? (
          <button>
            <CheckCircleOutlineIcon
              className={`${styles.command_icon} ${
                entry && styles.command_icon_entry
              }`}
            />

            {(post as Matter | Resource).entries ? (
              <span>{(post as Matter | Resource).entries}</span>
            ) : (
              <></>
            )}
          </button>
        ) : (post as Person).request === "hold" ? (
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
      </div>
    </>
  );
};
