import styles from "./List.module.scss";

import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { Posts } from "./components/Posts";
import { NotFound } from "./components/NotFound";
import { Load } from "./components/Load";

import { createObserver } from "./functions/createObserver";
import { fetchScroll } from "./functions/fetchScroll";

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
  const dispatch = useDispatch();

  const load = useRef();
  const list = useRef();

  const [page, setPage] = useState(0);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    !bests && setPage(hit?.currentPage);
    !bests && setIntersecting(false);
  }, [bests, hit?.currentPage, hit?.pages]);

  useEffect(() => {
    const observer = createObserver(
      list,
      bests,
      hit,
      page,
      setPage,
      intersecting,
      setIntersecting
    );

    const ref = load.current;
    ref && observer.observe(ref);

    return () => {
      ref && observer.unobserve(ref);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hit?.pages, intersecting, page]);

  useEffect(() => {
    !bests &&
      intersecting &&
      hit.pages &&
      page !== hit.pages &&
      fetchScroll(
        dispatch,
        index,
        user,
        home,
        search,
        companys,
        sort,
        type,
        select,
        page
      ).then(() => {
        setIntersecting(!intersecting);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={select && styles.list_scroll}>
      {companys && index === "persons" && (
        <span className={styles.list_tag}>こんなエンジニアもオススメ</span>
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

      {posts?.length >= 50 && (
        <Load load={load} page={page} hit={hit} bests={bests} />
      )}
    </div>
  );
};
