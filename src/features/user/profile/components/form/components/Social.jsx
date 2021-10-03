import styles from "../Form.module.scss";
import { useFormContext } from "react-hook-form";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faLine } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export const Social = ({ setLine }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.form_col}>
      <div className={styles.form_row}>
        <button type="button" onClick={() => setOpen(!open)}>
          <div className={styles.form_row}>
            <span className={styles.form_tag}>SNS</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`${styles.form_icon_open} ${
                open && styles.form_icon_close
              }`}
            />
          </div>
        </button>
        <button
          onClick={() => setLine(true)}
          type="button"
          className={styles.form_link}
        >
          ※ LINEのURL 取得する方法
        </button>
      </div>

      {open && (
        <>
          <div className={styles.form_social}>
            <FontAwesomeIcon
              icon={faLine}
              className={`${styles.form_icon} ${styles.form_icon_social} ${styles.form_icon_line}`}
            />
            <span className={styles.form_social_url}>
              https://line.me/ti/p/
            </span>
            <input
              placeholder="RjZOXypTV1"
              className={`${styles.form_social_input} ${
                errors.line && styles.form_input_error
              }`}
              {...register("social.line", {
                pattern: {
                  value: /^\S+/,
                  message: "先頭にスペースは使えません",
                },
                maxLength: {
                  value: 144,
                  message: "144文字以内で入力してください",
                },
              })}
            />
            <span className={styles.form_error}>{errors.line?.message}</span>
          </div>

          <div className={styles.form_social}>
            <FontAwesomeIcon
              icon={faTwitter}
              className={`${styles.form_icon} ${styles.form_icon_social} ${styles.form_icon_twitter}`}
            />
            <span className={styles.form_social_url}>https://twitter.com/</span>
            <input
              placeholder="Hitmeup2020"
              className={`${styles.form_social_input} ${
                errors.twitter && styles.form_input_error
              }`}
              {...register("social.twitter", {
                pattern: {
                  value: /^\S+/,
                  message: "先頭にスペースは使えません",
                },
                maxLength: {
                  value: 144,
                  message: "144文字以内で入力してください",
                },
              })}
            />
            <span className={styles.form_error}>{errors.twitter?.message}</span>
          </div>

          <div className={styles.form_social}>
            <FontAwesomeIcon
              icon={faInstagram}
              className={`${styles.form_icon} ${styles.form_icon_social} ${styles.form_icon_instagram}`}
            />
            <span className={styles.form_social_url}>
              https://instagram.com/
            </span>
            <input
              placeholder="Hitmeup2020"
              className={`${styles.form_social_input} ${
                styles.form_social_input_other
              }  ${errors.instagram && styles.form_input_error}`}
              {...register("social.instagram", {
                pattern: {
                  value: /^\S+/,
                  message: "先頭にスペースは使えません",
                },
                maxLength: {
                  value: 144,
                  message: "144文字以内で入力してください",
                },
              })}
            />
            <span className={styles.form_error}>
              {errors.instagram?.message}
            </span>
          </div>

          <div className={styles.form_social}>
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className={`${styles.form_icon} ${styles.form_icon_social} ${styles.form_icon_linkedIn}`}
            />
            <span className={styles.form_social_url}>
              https://linkedin.com/in/
            </span>
            <input
              placeholder="太郎-山田-12ab34567"
              className={`${styles.form_social_input} ${
                styles.form_social_input_other
              }  ${errors.linkedIn && styles.form_input_error}`}
              {...register("social.linkedIn", {
                pattern: {
                  value: /^\S+/,
                  message: "先頭にスペースは使えません",
                },
                maxLength: {
                  value: 144,
                  message: "144文字以内で入力してください",
                },
              })}
            />
            <span className={styles.form_error}>
              {errors.linkedIn?.message}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
