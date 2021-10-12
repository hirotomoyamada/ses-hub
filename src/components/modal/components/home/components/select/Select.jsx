import styles from "./Select.module.scss";

export const Select = ({ select }) => {
  return (
    <div className={styles.select}>
      {select.length}&nbsp;<span>/&nbsp;15人</span>
    </div>
  );
};
