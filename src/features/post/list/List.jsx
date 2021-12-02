import styles from "./List.module.scss";

import { Posts } from "./components/Posts";
import { NotFound } from "./components/NotFound";
import { Load } from "./components/Load";
import { useFetch } from "./hook/useFetch";

export const List = ({
  index,
  posts,
  hit,
  user,
  selectUser,
  home,
  search,
  companys,
  sort,
  type,
  outputs,
  select,
  handleSelect,
  handleCancel,
  bests,
  open,
}) => {
  const [list, load, page] = useFetch(
    index,
    hit,
    user,
    home,
    search,
    companys,
    sort,
    type,
    select,
    bests
  );

  return (
    <div className={select && styles.list_scroll}>
      {companys && index === "persons" && (
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
          companys={companys}
          outputs={outputs}
          bests={bests}
          handleSelect={handleSelect}
          handleCancel={handleCancel}
        />
      ) : (
        <NotFound
          index={index}
          list={list}
          type={type}
          bests={bests}
          companys={companys}
          select={select}
        />
      )}

      {hit?.pages && page < hit?.pages - 1 ? (
        <Load load={load} page={page} hit={hit} bests={bests} />
      ) : (
        <></>
      )}
    </div>
  );
};
