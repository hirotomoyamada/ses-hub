import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Costs = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const display = watch("costs.display");
  const min = watch("costs.min");
  const max = watch("costs.max");

  return (
    <div className={`${root.main_grid} ${root.main_grid_mid}`}>
      <div className={root.main_col}>
        <span className={root.main_tag}>
          単価
          <input
            type="radio"
            id="costsDisplay1"
            value="private"
            {...register("costs.display")}
          />
          <input
            type="radio"
            id="costsDisplay2"
            value="public"
            {...register("costs.display")}
          />
          {display === "public" ? (
            <label className={root.main_tag_display} htmlFor="costsDisplay1">
              &nbsp;※&nbsp;表示したくありませんか？
            </label>
          ) : (
            <label className={root.main_tag_display} htmlFor="costsDisplay2">
              &nbsp;※&nbsp;単価を入力する
            </label>
          )}
        </span>

        {display === "public" ? (
          <>
            <div className={`${root.main_grid} ${root.main_grid_costs}`}>
              <div className={`${styles.item} ${styles.item_cost}`}>
                <input
                  placeholder="最小"
                  className={`${styles.item_input} ${
                    styles.item_input_center
                  } ${errors.costs?.min && styles.item_input_error}`}
                  type="number"
                  {...register("costs.min", {
                    pattern: {
                      value: /^\d/,
                      message: "半角数字で入力してください",
                    },
                    maxLength: {
                      value: 3,
                      message: "3文字以内で入力してください",
                    },
                  })}
                />
              </div>

              <span className={styles.item_mark}>〜</span>
              
              <div className={`${styles.item} ${styles.item_cost}`}>
                <input
                  placeholder="最大"
                  className={`${styles.item_input} ${
                    styles.item_input_center
                  } ${
                    Number(min) >= Number(max) &&
                    errors.costs?.max?.type &&
                    styles.item_input_error
                  }`}
                  type="number"
                  {...register("costs.max", {
                    required: {
                      value: true,
                      message: "最大値を入力してください",
                    },
                    pattern: {
                      value: /^\d/,
                      message: "半角数字で入力してください",
                    },
                    maxLength: {
                      value: 3,
                      message: "3文字以内で入力してください",
                    },
                    validate: {
                      max: (max) => Number(max) > Number(min),
                    },
                  })}
                />
              </div>
            </div>
            {errors.costs?.min?.message && (
              <span className={styles.item_error}>
                {errors.costs?.min?.message}
              </span>
            )}
            {errors.costs?.max?.message && (
              <span className={styles.item_error}>
                {errors.costs?.max?.message}
              </span>
            )}
            {max &&
              Number(min) >= Number(max) &&
              errors.costs?.max?.type === "max" && (
                <span className={styles.item_error}>
                  正しい数値を入力してください
                </span>
              )}
          </>
        ) : (
          <div className={`${styles.item} ${styles.item_select}`}>
            <select
              className={`${styles.item_input} ${
                errors.costs?.type && styles.item_input_error
              }`}
              {...register("costs.type", {
                required: {
                  value: true,
                  message: "項目を選択してください",
                },
              })}
            >
              <option value={"スキル見合"}>スキル見合</option>
              <option value={"上振れ"}>上振れ</option>
              <option value={"応談"}>応談</option>
            </select>
            <span className={styles.item_error}>
              {errors.costs?.type?.message}
            </span>
          </div>
        )}
      </div>

      <div className={root.main_col}>
        <span className={root.main_tag}>
          請負単価
          <span className={styles.item_desc}>
            &nbsp;※&nbsp;検索に表示されません
          </span>
        </span>
        <div className={`${root.main_grid} ${root.main_grid_costs}`}>
          <div className={`${styles.item} ${styles.item_cost}`}>
            <input
              placeholder="メモ"
              className={`${styles.item_input} ${styles.item_input_center} ${
                errors.costs?.contract && styles.item_input_error
              }`}
              type="number"
              {...register("costs.contract", {
                pattern: {
                  value: /^\d/,
                  message: "半角数字で入力してください",
                },
                maxLength: {
                  value: 3,
                  message: "3文字以内で入力してください",
                },
              })}
            />
            {errors.costs?.contract?.message && (
              <span className={styles.item_error}>
                {errors.costs?.contract?.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
