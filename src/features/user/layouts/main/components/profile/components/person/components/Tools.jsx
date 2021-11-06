import styles from "../Person.module.scss";

export const Tools = ({ user }) => {
  const tools = user?.profile?.tools;

  return tools?.[0] ? (
    <div className={styles.profile_wrap}>
      {tools?.[0] &&
        tools.map(
          (tool, index) =>
            tool && (
              <div
                className={`${styles.profile_array} ${styles.profile_array_tools}`}
                key={index}
              >
                <h3 className={styles.profile_array_txt}>{tool}</h3>
              </div>
            )
        )}
    </div>
  ) : (
    <></>
  );
};
