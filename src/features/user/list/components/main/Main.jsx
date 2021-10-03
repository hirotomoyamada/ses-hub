import styles from "./Main.module.scss";
import Loader from "react-loader-spinner";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { extractPosts } from "../../../../post/functions/extractPosts";
import * as postSlice from "../../../../post/postSlice";

import { Item } from "../../../../post/item/Item";

export const Main = ({
  index,
  user,
  list,
  posts,
  hit,
  outputs,
  selectOutputs,
  handleSelect,
  handleCancel,
}) => {
  const dispatch = useDispatch();

  const fetchLoad = useSelector(postSlice.load);

  const load = useRef();
  const main = useRef();

  const [page, setPage] = useState(0);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    setPage(hit.currentPage);
    setIntersecting(false);
  }, [hit.currentPage, hit.pages]);

  useEffect(() => {
    if (
      JSON.stringify(main.current.getBoundingClientRect().height) >
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
  }, [hit.pages, intersecting, page]);

  useEffect(() => {
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
    <>
      {posts?.length ? (
        <div className={styles.main} ref={main}>
          {posts.map(
            (post) =>
              post && (
                <Item
                  key={post.objectID}
                  index={index}
                  post={post}
                  user={user}
                  outputs={outputs}
                  selectOutputs={selectOutputs}
                  handleSelect={handleSelect}
                  handleCancel={handleCancel}
                />
              )
          )}
        </div>
      ) : (
        <div className={styles.main_none} ref={main}>
          {fetchLoad ? (
            <Loader type="Oval" color="#49b757" height={56} width={56} />
          ) : (
            <span className={styles.main_none_message}>
              {list === "likes"
                ? "気になったものがありません"
                : list === "outputs"
                ? "出力するものがありません"
                : list === "entries" && "問い合わせしたものがありません"}
            </span>
          )}
        </div>
      )}
      {posts?.length >= 50 && (
        <div ref={load} className={styles.main_load}>
          {page < hit.pages - 1 && (
            <Loader type="Oval" color="#49b757" height={32} width={32} />
          )}
        </div>
      )}
    </>
  );
};
