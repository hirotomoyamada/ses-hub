import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { createObserver } from "../functions/createObserver";
import { fetchScroll } from "../functions/fetchScroll";

export const useFetch = (
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
) => {
  const dispatch = useDispatch();

  const list = useRef();
  const load = useRef();

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
    ref && observer?.observe(ref);

    return () => {
      ref && observer?.unobserve(ref);
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

  return [list, load, page];
};
