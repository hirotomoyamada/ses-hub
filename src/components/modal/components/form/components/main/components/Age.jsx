import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Age = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const min = 18;
  const max = 65;
  const length = max - min;
  const Option = () => {
    const option = [];
    for (let i = 0; i <= length; i++) {
      option.push(
        <option key={i} value={min + i}>
          {min + i}歳
        </option>
      );
    }
    return (
      <select
        className={`${styles.item_input} ${
          errors.age && styles.item_input_error
        }`}
        {...register("age", {
          required: {
            value: true,
            message: "性別を選択してください",
          },
        })}
      >
        {option}
      </select>
    );
  };

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>年齢</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <Option />
        <span className={styles.item_error}>{errors.age?.message}</span>
      </div>
    </div>
  );
};
