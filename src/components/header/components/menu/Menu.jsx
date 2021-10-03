import styles from "./Menu.module.scss";

export const Menu = ({ handleIndex, index, search }) => {
  return (
    <div className={`${styles.menu} ${search && styles.menu_search}`}>
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
      {search && (
        <button
          onClick={() => handleIndex("companys")}
          className={`${styles.menu_btn} ${
            index === "companys" && styles.menu_btn_active
          }`}
        >
          メンバー
        </button>
      )}
    </div>
  );
};
