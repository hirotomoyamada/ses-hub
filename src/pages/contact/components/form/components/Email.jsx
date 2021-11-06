import styles from "../../../Contact.module.scss";
import { useFormContext } from "react-hook-form";

export const Email = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.contact_form_item}>
      <span className={styles.contact_form_tag}>
        メールアドレス
        <span className={styles.contact_form_tag_required}>&nbsp;*</span>
      </span>
      <input
        className={`${styles.contact_form_input} ${
          errors.email && styles.contact_form_input_error
        }`}
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
          maxLength: {
            value: 144,
            message: "144文字以内で入力してください",
          },
        })}
      />
      {errors.email?.message && (
        <span className={styles.contact_form_error}>
          {errors.email?.message}
        </span>
      )}
    </div>
  );
};
