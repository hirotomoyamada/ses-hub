import styles from "../Main.module.scss";

export const Feilds = ({ acnt, tag, objects }) => {
  return objects?.[0] ? (
    tag ? (
      <div className={styles.main_col}>
        <span className={styles.main_tag}>{tag}</span>
        {objects.map(
          (object, index) =>
            object && (
              <div key={index}>
                <h3>{object}</h3>
              </div>
            )
        )}
      </div>
    ) : (
      <div className={styles.main_row}>
        {objects.map(
          (object, index) =>
            object && (
              <h3
                key={index}
                className={`${styles.main_array} ${
                  acnt && styles.main_array_acnt
                }`}
              >
                {object}
              </h3>
            )
        )}
      </div>
    )
  ) : (
    <></>
  );
};
