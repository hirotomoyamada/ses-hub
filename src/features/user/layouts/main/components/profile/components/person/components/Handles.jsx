import styles from "../Person.module.scss";

export const Handles = ({ user }) => {
  const handles = user?.profile?.handles;

  return handles?.[0] ? (
    <div className={styles.profile_wrap}>
      {handles?.[0] &&
        handles.map(
          (handle, index) =>
            handle && (
              <div className={styles.profile_array} key={index}>
                <h3 className={styles.profile_array_txt}>{handle}</h3>
              </div>
            )
        )}
    </div>
  ) : (
    <></>
  );
};
