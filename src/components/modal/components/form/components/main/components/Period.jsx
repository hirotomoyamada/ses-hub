import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Period = ({ index }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const date = new Date();
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;

  const Year = () => {
    const year = [];
    for (let i = dateYear; i <= dateYear + 5; i++) {
      year.push(
        <option key={i} value={i}>
          {i}年
        </option>
      );
    }
    return (
      <div className={`${styles.item} ${styles.item_select}`}>
        <select
          className={`${styles.item_input} ${
            errors.period?.year && styles.item_input_error
          }`}
          {...register("period.year", {
            required: {
              value: true,
              message: "年を選択してください",
            },
          })}
        >
          {year}
        </select>

        {errors.period?.year?.message && (
          <span className={styles.item_error}>
            {errors.period?.year?.message}
          </span>
        )}
      </div>
    );
  };

  const Month = () => {
    const month = [];
    for (let i = dateMonth; i <= dateMonth + (12 - dateMonth); i++) {
      month.push(
        <option key={i} value={i}>
          {i}月
        </option>
      );
    }
    for (let i = 1; i <= dateMonth - 1; i++) {
      month.push(
        <option key={i} value={i}>
          {i}月
        </option>
      );
    }
    return (
      <div className={`${styles.item} ${styles.item_select}`}>
        <select
          className={`${styles.item_input} ${
            errors.period?.month && styles.item_input_error
          }`}
          {...register("period.month", {
            required: {
              value: true,
              message: "月を選択してください",
            },
          })}
        >
          {month}
        </select>

        {errors.period?.month?.message && (
          <span className={styles.item_error}>
            {errors.period?.month?.message}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>
        {index === "matters" && "開始時期"}
        {index === "resources" && "稼働可能時期"}
      </span>
      <div className={`${root.main_grid} ${root.main_grid_period}`}>
        <Year />
        <Month />
      </div>
    </div>
  );
};
