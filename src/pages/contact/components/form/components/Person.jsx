import styles from "../../../Contact.module.scss";
import { useFormContext } from "react-hook-form";

export const Person = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.contact_form_item}>
      <span className={styles.contact_form_tag}>
        お名前<span className={styles.contact_form_tag_required}>&nbsp;*</span>
      </span>
      <input
        className={`${styles.contact_form_input} ${
          errors.person && styles.contact_form_input_error
        }`}
        {...register("person", {
          required: {
            value: true,
            message: "お名前を入力してください",
          },
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
      {errors.person?.message && (
        <span className={styles.contact_form_error}>
          {errors.person?.message}
        </span>
      )}
    </div>
  );
};
