import styles from "./Cover.module.scss";

export const Cover = ({ src }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/img/cover/${src}.png`}
      alt=""
      className={`${styles.cover}`}
    />
  );
};
