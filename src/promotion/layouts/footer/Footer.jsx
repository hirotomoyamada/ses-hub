import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

export const Footer = ({ handleOpen }) => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footer_nav}>
        <ul>
          <li>
            <a
              href="https://hitmeup.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              会社情報
            </a>
          </li>
          <li>
            <Link to={"/terms"}>利用規約</Link>
          </li>
          <li>
            <Link to={"/asct"}>特定商取引法に基づく表示</Link>
          </li>
        </ul>
      </nav>
      <small>© Hitmeup, Inc. All Rights Reserved.</small>
    </footer>
  );
};
