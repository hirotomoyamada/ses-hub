import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import * as functions from 'functions';

import { User } from 'types/user';
import { Search, Sort } from 'features/root/initialState';

interface PropType {
  user: User;
  index?: 'matters' | 'resources' | 'companys' | 'persons';
  hit?: {
    posts: number;
    pages: number;
    currentPage: number;
  };
  type?: 'likes' | 'outputs' | 'entries' | 'history';
  search?: Search;
  sort?: Sort;
  select?: string[];
  home?: boolean;
  side?: boolean;
  disable?: boolean;
}

export const useScrollFetch = ({
  index,
  hit,
  user,
  home,
  search,
  side,
  sort,
  type,
  select,
  disable,
}: PropType): [
  list: React.RefObject<HTMLDivElement>,
  load: React.RefObject<HTMLDivElement>,
  page: number,
] => {
  const dispatch = useDispatch();

  const list = useRef<HTMLDivElement>(null);
  const load = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (hit) {
      !disable && setPage(hit.currentPage);
      !disable && setIntersecting(false);
    }
  }, [disable, hit?.currentPage, hit?.pages]);

  useEffect(() => {
    const observer = functions.list.createObserver(
      list,
      disable,
      hit,
      page,
      setPage,
      intersecting,
      setIntersecting,
    );

    const ref = load.current;
    ref && observer?.observe(ref);

    return () => {
      ref && observer?.unobserve(ref);
    };
  }, [hit?.pages, intersecting, page]);

  useEffect(() => {
    !disable &&
      intersecting &&
      hit?.pages &&
      page !== hit.pages &&
      functions.list
        .fetchScroll(dispatch, index, user, home, search, side, sort, type, select, page)
        .then(() => {
          setIntersecting(!intersecting);
        });
  }, [page]);

  return [list, load, page];
};
