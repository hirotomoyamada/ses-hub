import styles from "../Side.module.scss";

import { useEffect, useState, useRef } from "react";

import Loader from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";
import { userPosts } from "../../../../post/functions/userPosts";
import * as postSlice from "../../../../post/postSlice";

import { Item } from "../../../../post/item/Item";

export const List = ({ index, user, currentUser, posts, hit, sort, open }) => {
  const dispatch = useDispatch();

  const fetchLoad = useSelector(postSlice.load);

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
          index: index,
          uid: user?.uid,
          uids: index === "companys" && user?.follows,
          status: sort.status,
          display: sort.display,
          page: page,
        })
      ).then(() => {
        setIntersecting(!intersecting);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, list]);

  return (
    <>
      {posts?.length ? (
        <div
          className={`${styles.side_list} ${!open && styles.side_list_open}`}
          ref={list}
        >
          {posts.map((post) =>
            post && index === "companys" ? (
              <Item
                key={post.uid}
                post={post}
                user={currentUser}
                index={index}
                companys
              />
            ) : (
              <Item
                key={post.objectID}
                index={index}
                post={post}
                user={currentUser}
                status
                display
              />
            )
          )}
        </div>
      ) : (
        <div className={styles.side_list_none} ref={list}>
          {fetchLoad ? (
            <Loader type="Oval" color="#49b757" height={56} width={56} />
          ) : (
            <span className={styles.side_list_none_message}>
              {index === "matters"
                ? "案件情報がありません"
                : index === "resources"
                ? "人材情報がありません"
                : index === "companys" && "フォローしているメンバーがいません"}
            </span>
          )}
        </div>
      )}
      {posts?.length >= 50 && (
        <div ref={load} className={styles.side_list_load}>
          {page < hit.pages - 1 && (
            <Loader type="Oval" color="#49b757" height={32} width={32} />
          )}
        </div>
      )}
    </>
  );
};
