import React from "react";
import styles from "./Create.module.scss";
import root from "../../Auth.module.scss";

import { Person } from "./components/Person";
import { Name } from "./components/Name";
import { Position } from "./components/Position";
import { Address } from "./components/Address";
import { Tel } from "./components/Tel";
import { Agree } from "./components/Agree";
import { Type } from "./components/Type";

interface PropType {
  inner: React.RefObject<HTMLDivElement>;
  handleLogout: () => void;
  setTerms: React.Dispatch<React.SetStateAction<boolean>>;
  resize: boolean;
}

export const Create: React.FC<PropType> = ({
  inner,
  handleLogout,
  setTerms,
  resize,
}) => {
  return (
    <div
      className={`${root.auth_inner} ${resize && root.auth_inner_resize}`}
      ref={inner}
    >
      <button
        type="button"
        className={`${root.auth_desc} ${root.auth_desc_logout}`}
        onClick={handleLogout}
      >
        ログイン画面に戻る
      </button>

      <span className={styles.create_announce}>
        登録情報が不足している場合、サービスをご利用いただけません
      </span>

      <Type />
      <Name />
      <Person />
      <Position />
      <Address />
      <Tel />
      <Agree setTerms={setTerms} />

      <button type="submit" className={root.auth_btn}>
        登録
      </button>
    </div>
  );
};
