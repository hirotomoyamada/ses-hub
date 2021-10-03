import styles from "../Provider.module.scss";
import root from "../../../Main.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Btn = ({ user, provider, handleProvider, setCreate }) => {
  const icon = {
    password: faEnvelope,
    google: faGoogle,
    twitter: faTwitter,
    github: faGithub,
  };

  const url = {
    password: "password",
    google: "google.com",
    twitter: "twitter.com",
    github: "github.com",
  };
  return (
    <div className={root.main_row}>
      <div
        className={`${styles.provider_tag} ${
          styles[`provider_tag_${provider}`]
        }`}
      >
        <FontAwesomeIcon
          icon={icon[provider]}
          className={styles.provider_icon}
        />
        <span className={styles.provider_tag_name}>
          {provider === "password" ? "メール" : provider}
        </span>
      </div>
      
      <button
        className={`${root.main_btn} ${
          user?.provider &&
          user.provider.indexOf(url[provider]) >= 0 &&
          root.main_btn_disabled
        }`}
        type="button"
        onClick={() =>
          provider === "password" ? setCreate(true) : handleProvider(provider)
        }
      >
        {user?.provider && user.provider.indexOf(url[provider]) >= 0
          ? "認証済み"
          : "認証"}
      </button>
    </div>
  );
};
