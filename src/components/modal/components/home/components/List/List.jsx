import styles from "./List.module.scss";

import { useEffect, useState, useRef } from "react";

import Loader from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";
import { userPosts } from "../../../../../../features/post/functions/userPosts";
import * as rootSlice from "../../../../../../features/root/rootSlice";

import { Item } from "../../../../../../features/post/item/Item";

export const List = ({ user, posts, hit, select, selectUser }) => {
  const dispatch = useDispatch();

  const fetchLoad = useSelector(rootSlice.load);

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
          if (results.isIntersecting && !intersecting && page < hit.pages) {
            setIntersecting(results.isIntersecting);
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          rootMargin: `0px 0px ${window.innerHeight}px 0px`,
        }
      );

      const ref = load?.current;
      ref && observer.observe(ref);

      return () => {
        ref && observer.unobserve(ref);
      };
    }
  }, [hit.currentPage, hit.pages, intersecting, page, list]);

  useEffect(() => {
    intersecting &&
      hit.pages &&
      page !== hit.pages &&
      dispatch(
        userPosts({
          index: "companys",
          uid: user.uid,
          uids: user.follows,
          page: page,
        })
      ).then(() => {
        setIntersecting(!intersecting);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, list]);

  return (
    <div className={styles.list}>
      {posts?.length ? (
        <div className={styles.list_inner} ref={list}>
          {posts.map((post) => (
            <Item
              key={post.uid}
              post={post}
              user={user}
              select={select}
              selectUser={selectUser}
              index="companys"
              companys
              home
            />
          ))}
        </div>
      ) : (
        <div className={styles.list_inner_none} ref={list}>
          {fetchLoad ? (
            <Loader type="Oval" color="#49b757" height={56} width={56} />
          ) : (
            <span className={styles.list_inner_none_message}>
              フォローしているメンバーがいません
            </span>
          )}
        </div>
      )}
      {posts?.length >= 50 && (
        <div ref={load} className={styles.list_load}>
          {page < hit.pages - 1 && (
            <Loader type="Oval" color="#49b757" height={32} width={32} />
          )}
        </div>
      )}
    </div>
  );
};
