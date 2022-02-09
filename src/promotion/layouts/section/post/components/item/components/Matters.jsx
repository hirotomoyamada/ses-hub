import styles from "../Item.module.scss";

import ScheduleIcon from "@material-ui/icons/Schedule";
import CodeIcon from "@material-ui/icons/Code";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import BusinessIcon from "@material-ui/icons/Business";

import * as functions from "../../../../../../../functions/functions";
import { Handles } from "./Handles";

export const Matters = ({ post }) => {
  return (
    <div className={styles.item_inner}>
      <div className={styles.item_position}>
        <h2>{post?.position}</h2>
      </div>

      <Handles post={post} />

      <div className={styles.item_ttl}>
        <h1 className={styles.item_ttl_txt}>{post?.title}</h1>
      </div>

      <div className={styles.item_container}>
        <div className={styles.item_side}>
          <div className={styles.item_wrap}>
            <LocationOnIcon className={styles.item_icon} />
            <p>{post?.location?.area}</p>
          </div>

          <div className={styles.item_wrap}>
            <BusinessIcon className={styles.item_icon} />
            <span>
              {post?.remote === "あり"
                ? "リモート"
                : post?.remote === "なし"
                ? "常駐"
                : post?.remote}
            </span>
          </div>

          <div className={styles.item_wrap}>
            <ScheduleIcon className={styles.item_icon} />
            <div className={styles.item_field}>
              <span>
                {post?.times?.start}&nbsp;〜&nbsp;{post?.times?.end}
              </span>
            </div>
          </div>

          <div className={styles.item_wrap}>
            <HowToVoteIcon className={styles.item_icon} />
            {post?.costs?.display !== "public" ? (
              <div className={styles.item_field}>
                <span>{post?.costs?.type}</span>
              </div>
            ) : post?.costs?.min ? (
              <div className={styles.item_field}>
                <span>
                  {post?.costs?.min}万&nbsp;〜&nbsp;{post?.costs?.max}万
                </span>
              </div>
            ) : (
              <div className={styles.item_field}>
                <span>〜&nbsp;{post?.costs?.max}万</span>
              </div>
            )}
          </div>

          <div className={styles.item_wrap}>
            <CodeIcon className={styles.item_icon} />
            <span>{post?.adjustment}</span>
          </div>
        </div>

        <div className={styles.item_body}>
          <p className={styles.item_body_txt}>{post?.body}</p>
        </div>
      </div>

      <div className={styles.item_time}>
        <span>{functions.root.timestamp(post?.createAt)}</span>
      </div>
    </div>
  );
};
