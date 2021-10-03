import styles from "../../../Contact.module.scss";
import { useFormContext } from "react-hook-form";

export const Company = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.contact_form_item}>
      <span className={styles.contact_form_tag}>会社名</span>
      <input
        className={`${styles.contact_form_input} ${
          errors.company && styles.contact_form_input_error
        }`}
        {...register("company", {
          pattern: {
            value: /^\S+/,
            message: "先頭にスペースは使えません",
          },
          maxLength: {
            value: 144,
            message: "144文字以内で入力してください",
          },
        })}
      />
      {errors.company?.message && (
        <span className={styles.contact_form_error}>
          {errors.company?.message}
        </span>
      )}
    </div>
  );
};
