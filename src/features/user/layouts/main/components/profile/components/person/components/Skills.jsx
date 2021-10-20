import styles from "../Person.module.scss";

export const Skills = ({ user }) => {
  const skills = user?.profile?.skills;

  return skills?.[0] ? (
    <div className={styles.profile_col}>
      <span className={styles.profile_tag}>スキル</span>
      {skills?.[0] &&
        skills.map((skill, index) => skill && <p key={index}>{skill}</p>)}
    </div>
  ) : (
    <></>
  );
};
