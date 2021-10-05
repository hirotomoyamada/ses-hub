import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";

export const Position = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={root.auth_col}>
      <span className={styles.create_tag}>役職</span>

      <div className={styles.select}>
        <select
          className={`${root.auth_input} ${root.auth_input_min} ${
            errors.position && root.auth_input_error
          }`}
          {...register("position", {
            required: {
              value: true,
              message: "役職を選択してください",
            },
          })}
        >
          <option value="経営者">経営者</option>
          <option value="取締役">取締役</option>
          <option value="執行役員">執行役員</option>
          <option value="マネージャー">マネージャー</option>
          <option value="リーダー">リーダー</option>
          <option value="メンバー">メンバー</option>
          <option value="その他">その他</option>
        </select>

        {errors.position?.message && (
          <span className={root.auth_error}>{errors.position?.message}</span>
        )}
      </div>
    </div>
  );
};
