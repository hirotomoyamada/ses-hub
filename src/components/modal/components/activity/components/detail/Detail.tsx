import React from "react";
import styles from "./Detail.module.scss";

import { Link } from "react-router-dom";

import * as functions from "functions";
import { Matter, Resource } from "types/post";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  post: Matter | Resource;
}

export const Detail: React.FC<PropType> = ({ index, post }) => {
  const handles = post?.handles;

  return (
    <div className={styles.detail}>
      <div className={styles.detail_wrap}>
        <div className={styles.detail_position}>
          <h2 className={styles.detail_position_txt}>{post?.position}</h2>
        </div>

        <span className={styles.detail_time}>
          {functions.root.timestamp(post?.createAt)}
        </span>
      </div>

      <div className={handles && styles.detail_tags}>
        {handles?.[0] &&
          handles.map(
            (handle, index) =>
              handle &&
              index < 5 && (
                <div className={styles.detail_tags_tag} key={index}>
                  <h3 className={styles.detail_tags_tag_txt}>{handle}</h3>
                </div>
              )
          )}
      </div>

      {index === "matters" && (
        <div className={styles.detail_ttl}>
          <h1 className={styles.detail_ttl_txt}>
            {(post as Matter)?.title}
            {(post as Matter)?.title}
          </h1>
        </div>
      )}

      {index === "resources" && (
        <div className={styles.detail_ttl}>
          <h1 className={styles.detail_ttl_txt}>
            {(post as Resource)?.roman?.firstName?.substring(0, 1)}&nbsp;.&nbsp;
            {(post as Resource)?.roman?.lastName?.substring(0, 1)}&nbsp;
          </h1>
        </div>
      )}

      <Link
        to={`/${index}/${post.objectID}`}
        target="_blank"
        className={styles.detail_link}
      >
        {index === "matters" ? "この案件を表示" : "この人材を表示"}
      </Link>
    </div>
  );
};
