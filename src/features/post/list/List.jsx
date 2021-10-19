import styles from "./List.module.scss";

import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { fetchPosts } from "../actions/fetchPosts";
import { homePosts } from "../actions/homePosts";
import { userPosts } from "../actions/userPosts";
import { extractPosts } from "../actions/extractPosts";

import { Posts } from "./components/Posts";
import { NotFound } from "./components/NotFound";
import { Load } from "./components/Load";

export const List = ({
  index,
  posts,
  user,
  home,
  search,
  companys,
  select,
  selectUser,
  outputs,
  handleSelect,
  handleCancel,
  sort,
  type,
  hit,
  open,
}) => {
  const dispatch = useDispatch();

  const load = useRef();
  const list = useRef();

  const [page, setPage] = useState(0);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    setPage(hit.currentPage);
    setIntersecting(false);
  }, [hit.currentPage, hit.pages]);

  useEffect(() => {
    if (
      JSON.stringify(list.current.getBoundingClientRect().height) >
      window.innerHeight + 100
    ) {
      const observer = new IntersectionObserver(
        ([results]) => {
          if (results.isIntersecting && !intersecting) {
            if (page < hit.pages) {
              setIntersecting(results.isIntersecting);
            }
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          rootMargin: `0px 0px ${window.innerHeight}px 0px`,
        }
      );

      const ref = load.current;
      ref && observer.observe(ref);

      return () => {
        ref && observer.unobserve(ref);
      };
    }
  }, [hit.pages, intersecting, page]);

  useEffect(() => {
    search &&
      intersecting &&
      hit.pages &&
      page !== hit.pages &&
      dispatch(
        fetchPosts({
          index: index,
          value: search.value,
          target: search.target,
          type: search.type,
          page: page,
        })
      ).then(() => {
        setIntersecting(!intersecting);
      });

    home &&
      intersecting &&
      hit.pages &&
      page !== hit.pages &&
      dispatch(
        homePosts({
          index: index,
          follows: [user.uid, ...user.home],
          page: page,
        })
      ).then(() => {
        setIntersecting(!intersecting);
      });

    (companys || select) &&
      intersecting &&
      hit.pages &&
      page !== hit.pages &&
      dispatch(
        userPosts({
          index: !select ? index : "companys",
          uid: user?.uid,
          uids: (index === "companys" || select) && user?.follows,
          status: !select && sort.status,
          display: !select && sort.display,
          page: page,
        })
      ).then(() => {
        setIntersecting(!intersecting);
      });

    type &&
      intersecting &&
      hit.pages &&
      page !== hit.pages &&
      dispatch(
        extractPosts({
          index: index,
          objectIDs: user[list][index],
          type: list,
          page: page,
        })
      ).then(() => {
        setIntersecting(!intersecting);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={select && styles.list_scroll}>
      {posts?.length ? (
        <Posts
          index={index}
          posts={posts}
          user={user}
          list={list}
          select={select}
          selectUser={selectUser}
          open={open}
          type={type}
          companys={companys}
          outputs={outputs}
          handleSelect={handleSelect}
          handleCancel={handleCancel}
        />
      ) : (
        <NotFound
          index={index}
          list={list}
          type={type}
          companys={companys}
          select={select}
        />
      )}

      {posts?.length >= 50 && <Load load={load} page={page} hit={hit} />}
    </div>
  );
};
