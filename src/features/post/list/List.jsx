import styles from "./List.module.scss";

import Loader from "react-loader-spinner";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../actions/fetchPosts";
import { followsPosts } from "../actions/followsPosts";
import * as rootSlice from "../../root/rootSlice";

import { Item } from "../item/Item";

export const List = ({ index, posts, user, home, search, hit }) => {
  const dispatch = useDispatch();

  const fetchLoad = useSelector(rootSlice.load).list;

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
        followsPosts({
          index: index,
          follows: [user.uid, ...user.home],
          page: page,
        })
      ).then(() => {
        setIntersecting(!intersecting);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      {home ? (
        posts?.length ? (
          <div className={styles.list} ref={list}>
            {posts.map(
              (post) =>
                post && (
                  <Item
                    key={post.objectID}
                    index={index}
                    post={post}
                    user={user}
                  />
                )
            )}
          </div>
        ) : (
          <div className={styles.list_none} ref={list}>
            {fetchLoad ? (
              <Loader type="Oval" color="#49b757" height={56} width={56} />
            ) : (
              <span className={styles.list_none_message}>
                {index === "matters"
                  ? "案件情報がありません"
                  : index === "resources" && "人材情報がありません"}
              </span>
            )}
          </div>
        )
      ) : posts?.length ? (
        <div className={styles.list} ref={list}>
          {posts.map((post) =>
            index !== "companys"
              ? post && (
                  <Item
                    key={post.objectID}
                    index={index}
                    post={post}
                    user={user}
                    search
                  />
                )
              : post && (
                  <Item
                    key={post.uid}
                    index={index}
                    post={post}
                    user={user}
                    search
                    companys
                  />
                )
          )}
        </div>
      ) : (
        <div className={styles.list_none} ref={list}>
          {fetchLoad ? (
            <Loader type="Oval" color="#49b757" height={56} width={56} />
          ) : (
            <span className={styles.list_none_message}>
              {index === "matters"
                ? "案件情報がありません"
                : index === "resources"
                ? "人材情報がありません"
                : index === "companys" && "メンバー情報がありません"}
            </span>
          )}
        </div>
      )}
      {posts?.length >= 50 && (
        <div
          ref={load}
          className={`${styles.list_load} ${
            page === hit.pages && styles.list_load_none
          }`}
        >
          {page < hit.pages && (
            <Loader type="Oval" color="#49b757" height={32} width={32} />
          )}
        </div>
      )}
    </>
  );
};
