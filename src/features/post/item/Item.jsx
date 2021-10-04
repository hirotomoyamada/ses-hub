import styles from "./Item.module.scss";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectIndex, handleSearch } from "../../post/postSlice";

import { Post } from "./components/post/Post";
import { User } from "./components/user/User";
import { Menu } from "../menu/Menu";

import { Follow } from "../../../components/follow/Follow";

export const Item = ({
  index,
  post,
  user,
  status,
  display,
  outputs,
  selectOutputs,
  handleSelect,
  handleCancel,
  search,
  select,
  selectUser,
  companys,
  persons,
  home,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePost = () => {
    search && dispatch(handleSearch({ control: true }));
    history.push(`/${index}/${post.objectID}`);
  };

  const handleUser = () => {
    search && dispatch(handleSearch({ control: true }));
    companys
      ? history.push(`/companys/${post.uid}`)
      : persons && history.push(`/persons/${post.uid}`);
    index === "companys" && dispatch(selectIndex("matters"));
  };

  return !outputs ? (
    <div className={styles.item_outer}>
      {!companys ? (
        <Menu index={index} post={post} user={user} postItem />
      ) : (
        post.uid !== user.uid && (
          <Follow
            user={user}
            post={post}
            select={select}
            selectUser={selectUser}
          />
        )
      )}
      {!companys ? (
        <button type="button" onClick={handlePost} className={styles.item_btn}>
          <article className={styles.item}>
            <Post
              index={index}
              post={post}
              user={user}
              status={status}
              display={display}
            />
          </article>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleUser}
          className={`${styles.item_btn} ${home && styles.item_btn_disable}`}
        >
          <article className={`${styles.item} ${home && styles.item_home}`}>
            <User post={post} user={user} />
          </article>
        </button>
      )}
    </div>
  ) : (
    <button
      className={styles.item_btn}
      type="button"
      onClick={() =>
        selectOutputs[0]
          ? selectOutputs.map((output) =>
              output.objectID !== post.objectID
                ? handleSelect({ post })
                : handleCancel(post.objectID)
            )
          : handleSelect({ post })
      }
    >
      {selectOutputs.map(
        (output) =>
          output.objectID === post.objectID && (
            <CheckCircleIcon
              key={output.objectID}
              className={styles.item_outputs_icon}
            />
          )
      )}
      <article
        className={`${styles.item} ${selectOutputs
          .map(
            (output) => output.objectID === post.objectID && styles.item_outputs
          )
          .join(" ")}`}
      >
        <div className={styles.item_inner}>
          <Post
            index={index}
            post={post}
            user={user}
            status={status}
            display={display}
          />
        </div>
      </article>
    </button>
  );
};
