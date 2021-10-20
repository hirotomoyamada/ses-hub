import styles from "../Person.module.scss";
export const Name = ({ user }) => {
  const dummy = [
    "貞子",
    "幽明異境",
    "脇見厳禁",
    "呪呪呪",
    "八大地獄",
    "奇奇怪怪",
  ];

  return (
    <div className={styles.profile_col}>
      <span className={styles.profile_tag}>氏名</span>
      <span
        className={`${
          user?.profile?.name === "非公開" && styles.profile_dummy
        }`}
      >
        {user?.profile?.name !== "非公開"
          ? user?.profile?.name
          : dummy[Math.floor(Math.random() * dummy.length)]}
      </span>
    </div>
  );
};
