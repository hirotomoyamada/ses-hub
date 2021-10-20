import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export const Email = ({ user }) => {
  const dummy = [
    "miseruwakeganai@gmail.com",
    "dameyo-damedame@dame.co.js",
    "watasi-ha-yamada@yamada.com",
    "tousen-omedetougozaimasu@tousen.mail",
    "oreoreoreoreore-sagi@gmail.com",
  ];

  return (
    <div className={styles.profile_field}>
      <FontAwesomeIcon icon={faEnvelope} className={styles.profile_icon} />
      <a
        href={`mailto:${user?.profile?.email}`}
        className={`${styles.profile_link} ${
          user?.profile?.email === "非公開" && styles.profile_link_dummy
        }`}
      >
        {user?.profile?.email !== "非公開"
          ? user?.profile?.email
          : dummy[Math.floor(Math.random() * dummy.length)]}
      </a>
    </div>
  );
};
