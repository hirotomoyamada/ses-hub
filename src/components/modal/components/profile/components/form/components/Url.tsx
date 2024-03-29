import React, { useState } from 'react';
import styles from '../Form.module.scss';
import { useFormContext } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Data } from '../../../Profile';

export const Url: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.form_col}>
      <button type="button" onClick={() => setOpen(!open)}>
        <div className={styles.form_row}>
          <span className={styles.form_tag}>URL</span>

          <FontAwesomeIcon
            icon={faChevronRight as IconProp}
            className={`${styles.form_icon_open} ${
              open && styles.form_icon_close
            }`}
          />
        </div>
      </button>

      {open && (
        <div>
          <input
            className={`${styles.form_input} ${
              errors.url && styles.form_input_error
            }`}
            placeholder="https://"
            {...register('url', {
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

          {errors.url?.message ? (
            <span className={styles.form_error}>{errors.url.message}</span>
          ) : null}
        </div>
      )}
    </div>
  );
};
