import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import * as rootSlice from 'features/root/rootSlice';

import { User } from 'types/user';
import { Matter, Resource } from 'types/post';

export const useEntry = (index: 'matters' | 'resources', post: Matter | Resource, user: User) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef<any>(null);
  const entryRef = useRef<HTMLDivElement>(null);
  const displayedRef = useRef<boolean>(false);

  const [entry, setEntry] = useState(false);

  const handleEntry = () => {
    if (user.payment.status === 'canceled') {
      dispatch(rootSlice.handleModal({ type: 'advertise', meta: { type: 'active' } }));
    } else {
      dispatch(rootSlice.handleModal({ type: 'entry' }));
    }
  };

  useEffect(() => {
    if (!Object.keys(post).length) return;

    const entries = user.entries?.[index] ?? [];
    const isEntry = entries.includes(post?.objectID);

    setEntry(isEntry);

    if (post.uid !== user.uid && !isEntry) {
      timeoutRef.current = setTimeout(() => {
        dispatch(rootSlice.handleModal({ type: 'advertise', meta: { type: 'entry' } }));
        displayedRef.current = true;
      }, 30000);
    }
  }, [index, post?.objectID, user.entries]);

  useEffect(() => {
    const el = entryRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (!isIntersecting || displayedRef.current) return;

      dispatch(rootSlice.handleModal({ type: 'advertise', meta: { type: 'entry' } }));

      displayedRef.current = true;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    });

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [post]);

  return { entry, handleEntry, entryRef };
};
