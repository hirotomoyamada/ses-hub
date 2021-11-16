import styles from "./Menu.module.scss";

export const Menu = ({ page, setPage, type }) => {
  const indexs = [
    { page: "home", name: "ホーム" },
    { page: "search", name: "検索" },
    { page: "likes", name: "いいね" },
    { page: "outputs", name: "出力" },
    { page: "entries", name: "お問い合わせ" },
    { page: "posts", name: "投稿" },
    { page: "plan", name: "プラン" },
    { page: "requests", name: "リクエスト" },
    type !== "individual" && { page: "account", name: "グループアカウント" },
  ];

  return (
    <div className={styles.menu}>
      {indexs.map(
        (index) =>
          index && (
            <button
              key={index.page}
              type="button"
              onClick={() => setPage(index.page)}
              className={`${styles.menu_btn} ${
                index.page === page && styles.menu_btn_current
              }`}
            >
              {index.name}
            </button>
          )
      )}
    </div>
  );
};
