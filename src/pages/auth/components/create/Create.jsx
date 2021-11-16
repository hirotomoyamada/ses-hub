import root from "../../Auth.module.scss";

import { Person } from "./components/Person";
import { Name } from "./components/Name";
import { Position } from "./components/Position";
import { Address } from "./components/Address";
import { Tel } from "./components/Tel";
import { Agree } from "./components/Agree";
// import { Type } from "./components/Type";

export const Create = ({ inner, handleLogout, setTerms, resize }) => {
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
      {/* ver 2.0.0 */}
      {/* <Type /> */}
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
