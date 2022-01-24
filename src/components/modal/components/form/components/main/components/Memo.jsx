import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Memo = ({ index }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={`${root.main_memo} ${
        index === "matters" && root.main_memo_body
      }`}
    >
      <span className={root.main_memo_tag}>
        メモ
        <span className={styles.item_desc}>
          &nbsp;※&nbsp;検索に表示されません
        </span>
      </span>
      {index === "matters" ? (
        <div className={styles.item}>
          <textarea
            className={`${styles.item_textarea} ${
              errors.memo && styles.item_textarea_error
            }`}
            {...register("memo", {
              pattern: {
                value: /^\S+/,
                message: "先頭にスペースは使えません",
              },
              maxLength: {
                value: 600,
                message: "600文字以内で入力してください",
              },
            })}
          ></textarea>

          {errors.memo?.message && (
            <span className={styles.item_error}>{errors.memo?.message}</span>
          )}
        </div>
      ) : (
        index === "resources" && (
          <div>
            <div className={root.main_col}>
              <span className={root.main_memo_tag}>名前</span>
              <div className={styles.item}>
                <input
                  className={`${styles.item_input} ${
                    errors.memo?.name && styles.item_input_error
                  }`}
                  {...register("memo.name", {
                    pattern: {
                      value: /^\S+/,
                      message: "先頭にスペースは使えません",
                    },
                    maxLength: {
                      value: 16,
                      message: "16文字以内で入力してください",
                    },
                  })}
                />
                <span className={styles.item_error}>
                  {errors.memo?.name?.message}
                </span>
              </div>
            </div>
            <div className={root.main_col}>
              <span className={root.main_memo_tag}>連絡先</span>
              <div className={styles.item}>
                <input
                  className={`${styles.item_input} ${
                    errors.memo?.tel && styles.item_input_error
                  }`}
                  {...register("memo.tel", {
                    pattern: {
                      value: /^\S+/,
                      message: "先頭にスペースは使えません",
                    },
                    maxLength: {
                      value: 16,
                      message: "16文字以内で入力してください",
                    },
                  })}
                />

                {errors.memo?.tel?.message && (
                  <span className={styles.item_error}>
                    {errors.memo?.tel?.message}
                  </span>
                )}
              </div>
            </div>
            <div className={root.main_col}>
              <span className={root.main_memo_tag}>住所</span>
              <div className={styles.item}>
                <input
                  className={`${styles.item_input} ${
                    errors.memo?.address && styles.item_input_error
                  }`}
                  {...register("memo.address", {
                    pattern: {
                      value: /^\S+/,
                      message: "先頭にスペースは使えません",
                    },
                    maxLength: {
                      value: 64,
                      message: "64文字以内で入力してください",
                    },
                  })}
                />

                {errors.memo?.address?.message && (
                  <span className={styles.item_error}>
                    {errors.memo?.address?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
