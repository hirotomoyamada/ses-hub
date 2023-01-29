import React, { useState } from 'react';
import styles from '../Form.module.scss';
import { useFormContext } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faLine } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import { Data } from '../../../Profile';

interface PropType {
  setLine: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Social: React.FC<PropType> = ({ setLine }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.form_col}>
      <div className={styles.form_row}>
        <button type="button" onClick={() => setOpen(!open)}>
          <div className={styles.form_row}>
            <span className={styles.form_tag}>SNS</span>
            <FontAwesomeIcon
              icon={faChevronRight as IconProp}
              className={`${styles.form_icon_open} ${
                open && styles.form_icon_close
              }`}
            />
          </div>
        </button>
        <button
          onClick={() => setLine(true)}
          type="button"
          className={styles.form_link}>
          ※ LINEのURL 取得する方法
        </button>
      </div>

      {open && (
        <>
          <div className={styles.form_social}>
            <FontAwesomeIcon
              icon={faLine as IconProp}
              className={`${styles.form_icon} ${styles.form_icon_social} ${styles.form_icon_line}`}
            />
            <span className={styles.form_social_url}>
              https://line.me/ti/p/
            </span>
            <input
              placeholder="RjZOXypTV1"
              className={`${styles.form_social_input} ${
                errors?.social?.line && styles.form_input_error
              }`}
              {...register('social.line', {
                pattern: {
                  value: /^\S+/,
                  message: '先頭にスペースは使えません',
                },
                maxLength: {
                  value: 144,
                  message: '144文字以内で入力してください',
                },
              })}
            />

            {errors?.social?.line?.message ? (
              <span className={styles.form_error}>
                {errors?.social.line.message}
              </span>
            ) : null}
          </div>

          <div className={styles.form_social}>
            <FontAwesomeIcon
              icon={faTwitter as IconProp}
              className={`${styles.form_icon} ${styles.form_icon_social} ${styles.form_icon_twitter}`}
            />
            <span className={styles.form_social_url}>https://twitter.com/</span>
            <input
              placeholder="Hitmeup2020"
              className={`${styles.form_social_input} ${
                errors?.social?.twitter && styles.form_input_error
              }`}
              {...register('social.twitter', {
                pattern: {
                  value: /^\S+/,
                  message: '先頭にスペースは使えません',
                },
                maxLength: {
                  value: 144,
                  message: '144文字以内で入力してください',
                },
              })}
            />

            {errors?.social?.twitter?.message ? (
              <span className={styles.form_error}>
                {errors?.social.twitter.message}
              </span>
            ) : null}
          </div>

          <div className={styles.form_social}>
            <FontAwesomeIcon
              icon={faInstagram as IconProp}
              className={`${styles.form_icon} ${styles.form_icon_social} ${styles.form_icon_instagram}`}
            />
            <span className={styles.form_social_url}>
              https://instagram.com/
            </span>
            <input
              placeholder="Hitmeup2020"
              className={`${styles.form_social_input} ${
                styles.form_social_input_other
              }  ${errors?.social?.instagram && styles.form_input_error}`}
              {...register('social.instagram', {
                pattern: {
                  value: /^\S+/,
                  message: '先頭にスペースは使えません',
                },
                maxLength: {
                  value: 144,
                  message: '144文字以内で入力してください',
                },
              })}
            />

            {errors.social?.instagram?.message ? (
              <span className={styles.form_error}>
                {errors?.social.instagram.message}
              </span>
            ) : null}
          </div>

          <div className={styles.form_social}>
            <FontAwesomeIcon
              icon={faLinkedinIn as IconProp}
              className={`${styles.form_icon} ${styles.form_icon_social} ${styles.form_icon_linkedIn}`}
            />
            <span className={styles.form_social_url}>
              https://linkedin.com/in/
            </span>
            <input
              placeholder="太郎-山田-12ab34567"
              className={`${styles.form_social_input} ${
                styles.form_social_input_other
              }  ${errors?.social?.linkedIn && styles.form_input_error}`}
              {...register('social.linkedIn', {
                pattern: {
                  value: /^\S+/,
                  message: '先頭にスペースは使えません',
                },
                maxLength: {
                  value: 144,
                  message: '144文字以内で入力してください',
                },
              })}
            />

            {errors.social?.linkedIn?.message ? (
              <span className={styles.form_error}>
                {errors?.social?.linkedIn?.message}
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
