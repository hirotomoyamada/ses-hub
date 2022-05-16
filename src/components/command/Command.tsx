import React, { useEffect, useState } from "react";
import styles from "./Command.module.scss";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import BarChartIcon from "@material-ui/icons/BarChart";
import { useDispatch } from "react-redux";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";
import * as postSlice from "features/post/postSlice";

import { Matter, Resource, Person } from "types/post";
import { User } from "types/user";

interface PropType {
  post: Matter | Resource | Person;
  user: User;
  index?: "matters" | "resources" | "persons";
  item?: boolean;
}

export const Command: React.FC<PropType> = ({ index, post, user, item }) => {
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

  const handleEntry = () => {
    if (user.uid === post.uid) return;

    dispatch(postSlice.selectPost(post as Matter | Resource));
    dispatch(rootSlice.handleModal({ type: "entry" }));
  };

  const handleActivity = () => {
    if (index === "matters" || index === "resources") {
      dispatch(postSlice.selectPost(post as Matter | Resource));

      dispatch(
        rootSlice.handleModal({ type: "activity", meta: { type: "post" } })
      );
    }
  };

  return (
    <div className={`${styles.command} ${item && styles.command_item}`}>
      {(user?.payment?.status !== "canceled" || post?.uid === user.uid) && (
        <button onClick={handleLike} className={styles.command_btn}>
          {like ? (
            <FavoriteIcon
              className={`${styles.command_icon} ${styles.command_icon_like} ${
                clickLike && styles.command_icon_like_click
              }`}
            />
          ) : (
            <FavoriteBorderIcon className={styles.command_icon} />
          )}

          {(post as Matter | Resource).likes ? (
            <span
              className={`${styles.command_count} ${
                like && styles.command_count_like
              }`}
            >
              {(post as Matter | Resource).likes}
            </span>
          ) : (
            <></>
          )}
        </button>
      )}

      {index !== "persons" &&
        (user?.payment?.status !== "canceled" || post?.uid === user.uid) && (
          <button onClick={handleOutput} className={styles.command_btn}>
            <LaunchIcon
              className={`${styles.command_icon} ${
                output && styles.command_icon_output
              }
                ${clickOutput && styles.command_icon_output_click}`}
            />

            {(post as Matter | Resource).outputs ? (
              <span
                className={`${styles.command_count} ${
                  output && styles.command_count_output
                }`}
              >
                {(post as Matter | Resource).outputs}
              </span>
            ) : (
              <></>
            )}
          </button>
        )}

      {index !== "persons" ? (
        <button
          onClick={handleEntry}
          className={`
            ${styles.command_btn}
            ${user.uid === post.uid && styles.command_btn_disabled}
          `}
        >
          <CheckCircleOutlineIcon
            className={`${styles.command_icon} ${
              entry && styles.command_icon_entry
            }`}
          />

          {(post as Matter | Resource).entries ? (
            <span
              className={`${styles.command_count} ${
                entry && styles.command_count_entry
              }`}
            >
              {(post as Matter | Resource).entries}
            </span>
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

      {post?.uid === user.uid && (
        <button
          onClick={handleActivity}
          className={`${styles.command_btn} ${styles.command_btn_activity}`}
        >
          <BarChartIcon
            className={`${styles.command_icon} ${styles.command_icon_activity}`}
          />
        </button>
      )}
    </div>
  );
};
