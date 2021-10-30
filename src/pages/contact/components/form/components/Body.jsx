import styles from "../../../Contact.module.scss";
import { useFormContext } from "react-hook-form";

export const Body = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.contact_form_item}>
      <span className={styles.contact_form_tag}>
        内容<span className={styles.contact_form_tag_required}>&nbsp;*</span>
      </span>
      <textarea
        className={`${styles.contact_form_textarea} ${
          errors.body && styles.contact_form_textarea_error
        }`}
        {...register("body", {
          required: {
            value: true,
            message: "内容を入力してください",
          },
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
      {errors.body?.message && (
        <span className={styles.contact_form_error}>
          {errors.body?.message}
        </span>
      )}
    </div>
  );
};
