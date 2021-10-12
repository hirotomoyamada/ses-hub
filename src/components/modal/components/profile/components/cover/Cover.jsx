import styles from "./Cover.module.scss";
import { useFormContext } from "react-hook-form";

export const Cover = () => {
  const { register } = useFormContext();

  const cover = 17;
  const input = [];

  for (let i = 0; i <= cover; i++) {
    input.push(
      <div key={i} className={styles.cover_item}>
        <input
          type="radio"
          id={`cover${i}`}
          {...register("cover")}
          value={`cover${i}`}
          className={styles.cover_input}
        />
        <label htmlFor={`cover${i}`} className={styles.cover_input_label}>
          <img
            src={`${process.env.PUBLIC_URL}/img/cover/cover${i}.png`}
            alt=""
            className={`${styles.cover_img}`}
          />
        </label>
      </div>
    );
  }

  return (
    <div className={styles.cover}>
      <div className={styles.cover_inner}>{input}</div>
    </div>
  );
};
