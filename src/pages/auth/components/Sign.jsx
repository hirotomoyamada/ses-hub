import styles from "../Auth.module.scss";
import { useFormContext } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Sign = ({
  inner,
  sign,
  reset,
  setSign,
  setReset,
  handleProvider,
  resize,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = watch("password");

  return (
    <div
      className={`${styles.auth_inner} ${sign && styles.auth_inner_sign} ${
        resize && styles.auth_inner_resize
      }`}
      ref={inner}
    >
      <span className={styles.auth_ttl}>{sign ? "新規登録" : "ログイン"}</span>

      <div>
        <input
          type="text"
          className={`${styles.auth_input} ${
            errors.email && styles.auth_input_error
          }`}
          placeholder="メールアドレス"
          {...register("email", {
            required: {
              value: true,
              message: "メールアドレスを入力してください",
            },
            pattern: {
              value:
                /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: "メールアドレスを正しい形式で入力してください",
            },
          })}
        />
        {errors.email?.message && (
          <span className={styles.auth_error}>{errors.email?.message}</span>
        )}
      </div>

      <div>
        <input
          type="password"
          className={`${styles.auth_input} ${
            errors.password && styles.auth_input_error
          }`}
          placeholder="パスワード"
          {...register("password", {
            required: {
              value: true,
              message: "パスワードを入力してください",
            },
            minLength: {
              value: 8,
              message: "パスワードを8文字以上で入力してください",
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
            type="password"
            className={`${styles.auth_input} ${
              errors.verifiedPassword && styles.auth_input_error
            }`}
            placeholder={"パスワード確認"}
            {...register(
              "verifiedPassword",
              !sign
                ? {
                    required: {
                      value: true,
                      message: "パスワードを入力してください",
                    },
                    minLength: {
                      value: 8,
                      message: "パスワードを8文字以上で入力してください",
                    },
                  }
                : {
                    required: {
                      value: true,
                      message: "パスワードを入力してください",
                    },
                    minLength: {
                      value: 8,
                      message: "パスワードを8文字以上で入力してください",
                    },
                    validate: {
                      verified: (value) => value === password,
                    },
                  }
            )}
          />

          {errors.verifiedPassword?.type === "verified" && (
            <span className={styles.auth_error}>パスワードが一致しません</span>
          )}

          {errors.password?.message && (
            <span className={styles.auth_error}>
              {errors.password?.message}
            </span>
          )}
        </div>
      )}

      <div className={styles.auth_wrap}>
        {!sign && (
          <button
            type="button"
            className={styles.auth_desc}
            onClick={() => setReset(!reset)}
          >
            パスワードをお忘れですか？
          </button>
        )}

        <button
          type="button"
          className={`${styles.auth_desc} ${styles.auth_desc_sign}`}
          onClick={() => setSign(!sign)}
        >
          {sign ? "アカウントをお持ちですか？" : "新規登録はこちら"}
        </button>
      </div>

      <div className={styles.auth_col}>
        <button type="submit" className={styles.auth_btn}>
          {sign ? "新規登録" : "ログイン"}
        </button>
      </div>

      <p className={styles.auth_strike}>
        <span>または</span>
      </p>

      <div className={styles.auth_social}>
        <button
          type="button"
          onClick={() => handleProvider("google")}
          className={`${styles.auth_btn_google} ${styles.auth_btn}`}
        >
          <FontAwesomeIcon icon={faGoogle} />
          &nbsp;Google
        </button>

        <button
          type="button"
          onClick={() => handleProvider("twitter")}
          className={`${styles.auth_btn_twitter} ${styles.auth_btn}`}
        >
          <FontAwesomeIcon icon={faTwitter} />
          &nbsp;Twitter
        </button>

        <button
          type="button"
          onClick={() => handleProvider("github")}
          className={`${styles.auth_btn_github} ${styles.auth_btn}`}
        >
          <FontAwesomeIcon icon={faGithub} />
          &nbsp;Github
        </button>
      </div>
    </div>
  );
};
