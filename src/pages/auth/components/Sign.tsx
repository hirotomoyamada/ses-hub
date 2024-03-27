import React from 'react';
import styles from '../Auth.module.scss';

import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { Data } from '../Auth';

interface PropType {
  inner: React.RefObject<HTMLDivElement>;
  sign: boolean;
  reset: boolean;
  setSign: React.Dispatch<React.SetStateAction<boolean>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  handleProvider: (provider: 'google' | 'twitter' | 'github') => void;
  resize: boolean;
}

export const Sign: React.FC<PropType> = ({
  inner,
  sign,
  reset,
  setSign,
  setReset,
  handleProvider,
  resize,
}) => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Data>();

  const password = watch('password');

  return (
    <div
      className={`${styles.auth_inner} ${sign && styles.auth_inner_sign} ${
        resize && styles.auth_inner_resize
      }`}
      ref={inner}>
      <button className={`${styles.auth_btn_back}`} type='button' onClick={() => navigate('/')}>
        トップページにもどる
      </button>

      <span className={styles.auth_ttl}>{sign ? '新規登録' : 'ログイン'}</span>

      <div>
        <input
          type='text'
          className={`${styles.auth_input} ${errors.email && styles.auth_input_error}`}
          placeholder='メールアドレス'
          {...register('email', {
            required: {
              value: true,
              message: 'メールアドレスを入力してください',
            },
            pattern: {
              value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: 'メールアドレスを正しい形式で入力してください',
            },
            validate: (value) => {
              if (!sign) return true;

              if (
                value.startsWith('info') ||
                value.startsWith('ses') ||
                value.startsWith('sales') ||
                value.endsWith('@gmail.com')
              ) {
                return '共有アドレス、捨てアドレスの登録はできません';
              }
            },
          })}
        />

        {errors?.email?.message && (
          <span className={styles.auth_error}>{errors.email.message}</span>
        )}
      </div>

      <div>
        <input
          type='password'
          className={`${styles.auth_input} ${errors.password && styles.auth_input_error}`}
          placeholder='パスワード'
          {...register('password', {
            required: {
              value: true,
              message: 'パスワードを入力してください',
            },
            minLength: {
              value: 8,
              message: 'パスワードを8文字以上で入力してください',
            },
          })}
        />
        {errors.password?.message && (
          <span className={styles.auth_error}>{errors.password?.message}</span>
        )}
      </div>

      {sign && (
        <div>
          <input
            type='password'
            className={`${styles.auth_input} ${errors.verifiedPassword && styles.auth_input_error}`}
            placeholder={'パスワード確認'}
            {...register(
              'verifiedPassword',
              !sign
                ? {
                    required: {
                      value: true,
                      message: 'パスワードを入力してください',
                    },
                    minLength: {
                      value: 8,
                      message: 'パスワードを8文字以上で入力してください',
                    },
                  }
                : {
                    required: {
                      value: true,
                      message: 'パスワードを入力してください',
                    },
                    minLength: {
                      value: 8,
                      message: 'パスワードを8文字以上で入力してください',
                    },
                    validate: {
                      verified: (value) => value === password,
                    },
                  },
            )}
          />

          {errors?.verifiedPassword?.type === 'verified' && (
            <span className={styles.auth_error}>パスワードが一致しません</span>
          )}

          {errors.password?.message && (
            <span className={styles.auth_error}>{errors.password.message}</span>
          )}
        </div>
      )}

      <div className={styles.auth_wrap}>
        {!sign && (
          <button type='button' className={styles.auth_desc} onClick={() => setReset(!reset)}>
            パスワードをお忘れですか？
          </button>
        )}

        <button
          type='button'
          className={`${styles.auth_desc} ${styles.auth_desc_sign}`}
          onClick={() => setSign(!sign)}>
          {sign ? 'アカウントをお持ちですか？' : '新規登録はこちら'}
        </button>
      </div>

      <div className={styles.auth_col}>
        <button type='submit' className={styles.auth_btn}>
          {sign ? '新規登録' : 'ログイン'}
        </button>
      </div>

      <p className={styles.auth_strike}>
        <span>または</span>
      </p>

      <div className={styles.auth_social}>
        <button
          type='button'
          onClick={() => handleProvider('google')}
          className={`${styles.auth_btn_google} ${styles.auth_btn}`}>
          <FontAwesomeIcon icon={faGoogle as IconProp} />
          &nbsp;Google
        </button>

        <button
          type='button'
          onClick={() => handleProvider('twitter')}
          className={`${styles.auth_btn_twitter} ${styles.auth_btn}`}>
          <FontAwesomeIcon icon={faTwitter as IconProp} />
          &nbsp;Twitter
        </button>

        <button
          type='button'
          onClick={() => handleProvider('github')}
          className={`${styles.auth_btn_github} ${styles.auth_btn}`}>
          <FontAwesomeIcon icon={faGithub as IconProp} />
          &nbsp;Github
        </button>
      </div>
    </div>
  );
};
