import styles from "./List.module.scss";

import { Posts } from "./components/posts/Posts";
import { NotFound } from "./components/notFound/NotFound";
import { Load } from "./components/load/Load";
import { useFetch } from "./hook/useFetch";

export const List = ({
  index,
  posts,
  hit,
  user,
  selectUser,
  home,
  search,
  side,
  sort,
  type,
  outputs,
  select,
  disable,
  open,
  handleSelect,
  handleCancel,
}) => {
  const [list, load, page] = useFetch(
    index,
    hit,
    user,
    home,
    search,
    side,
    sort,
    type,
    select,
    disable
  );

  return (
    <div className={select && styles.list}>
      {side && index === "persons" && (
        <span className={styles.list_tag}>こんなフリーランスもオススメ</span>
      )}

      {posts?.length ? (
        <Posts
          index={index}
          posts={posts}
          list={list}
          select={select}
          selectUser={selectUser}
          open={open}
          type={type}
          side={side}
          outputs={outputs}
          disable={disable}
          handleSelect={handleSelect}
          handleCancel={handleCancel}
        />
      ) : (
        <NotFound
          index={index}
          user={user}
          list={list}
          type={type}
          sort={sort}
          select={select}
          disable={disable}
          home={home}
          side={side}
        />
      )}

      {hit?.pages && page < hit?.pages - 1 ? (
        <Load load={load} page={page} hit={hit} disable={disable} />
      ) : (
        <></>
      )}
    </div>
  );
};
