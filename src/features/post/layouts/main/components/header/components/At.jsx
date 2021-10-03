import styles from "../Header.module.scss";
import { timestamp } from "../../../../../../../functions/timestamp";

export const At = ({ post }) => {
  return (
    <div className={styles.header_at}>
      <span>作成&nbsp;{timestamp(post.createAt)}</span>
      {post.updateAt && <span>更新&nbsp;{timestamp(post.updateAt)}</span>}
    </div>
  );
};
