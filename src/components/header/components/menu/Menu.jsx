import styles from "./Menu.module.scss";

export const Menu = ({ index, uid, user, handleIndex, search, outputs }) => {
  return !outputs?.length ? (
    <div
      className={`${styles.menu} ${
        (search ||
          (user?.uid === uid && user?.payment?.status !== "canceled")) &&
        styles.menu_search
      }`}
    >
      <button
        onClick={() => handleIndex("matters")}
        className={`${styles.menu_btn} ${
          index === "matters" && styles.menu_btn_active
        }`}
      >
        案件
      </button>

      <button
        onClick={() => handleIndex("resources")}
        className={`${styles.menu_btn} ${
          index === "resources" && styles.menu_btn_active
        }`}
      >
        人材
      </button>

      {(search ||
        (user?.uid === uid && user?.payment?.status !== "canceled")) && (
        <button
          onClick={() => handleIndex("companys")}
          className={`${styles.menu_btn} ${
            index === "companys" && styles.menu_btn_active
          }`}
        >
          {!uid ? "メンバー" : "フォロー中"}
        </button>
      )}
    </div>
  ) : (
    <div className={`${styles.menu} ${styles.menu_outputs}`}>
      <span className={styles.menu_outputs_txt}>
        {outputs.length}件&nbsp;選択中
      </span>
    </div>
  );
};
