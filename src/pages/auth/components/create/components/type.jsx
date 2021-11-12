import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";

export const Type = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.type}>
      <input
        type="radio"
        {...register("type")}
        id="individual"
        name="type"
        value="individual"
      />
      <label htmlFor="individual" className={styles.type_btn}>
        個人
      </label>

      <input
        type="radio"
        {...register("type")}
        id="parent"
        name="type"
        value="parent"
      />
      <label htmlFor="parent" className={styles.type_btn}>
        法人
      </label>

      {errors.type?.message && (
        <span className={root.auth_error}>{errors.type?.message}</span>
      )}
    </div>
  );
};
