import React from "react";
import styles from "../Item.module.scss";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import PersonIcon from "@material-ui/icons/Person";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BusinessIcon from "@material-ui/icons/Business";

import * as functions from "functions";

import { Handles } from "./Handles";

import { Resource } from "types/post";

export const Resources: React.FC<{ post: Resource }> = ({ post }) => {
  return (
    <div className={styles.item_inner}>
      <div className={styles.item_position}>
        <h2>{post?.position}</h2>
      </div>

      <Handles post={post} />

      <div className={styles.item_ttl}>
        <h1 className={styles.item_ttl_txt}>
          {post?.roman?.firstName}&nbsp;.&nbsp;{post?.roman?.lastName}
        </h1>
      </div>

      <div
        className={`${styles.item_container} ${styles.item_container_resources}`}
      >
        <div className={styles.item_side}>
          <div className={styles.item_wrap}>
            <LocationOnIcon className={styles.item_icon} />
            <p>{post?.station}</p>
          </div>

          <div className={styles.item_wrap}>
            <BusinessIcon className={styles.item_icon} />
            <span>{post?.belong}</span>
          </div>

          <div className={styles.item_wrap}>
            <PersonIcon className={styles.item_icon} />
            <span>{post?.position}</span>
          </div>

          <div className={styles.item_wrap}>
            <CalendarTodayIcon className={styles.item_icon} />
            <div className={styles.item_field}>
              <span>
                {post?.period.year}年&nbsp;{post?.period.month}月&nbsp;〜
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
