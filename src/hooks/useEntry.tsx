import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as rootSlice from 'features/root/rootSlice';

import { User } from 'types/user';
import { Matter, Resource } from 'types/post';

export const useEntry = (index: 'matters' | 'resources', post: Matter | Resource, user: User) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef<any>(null);
  const entryRef = useRef<HTMLDivElement>(null);
  const displayedRef = useRef<boolean>(false);

  const [entry, setEntry] = useState(false);
  const entries = useMemo(() => user.entries?.[index] ?? [], [user.entries, index]);

  const handleEntry = () => {
    if (user.payment.status === 'canceled') {
      dispatch(rootSlice.handleModal({ type: 'advertise', meta: { type: 'active' } }));
    } else {
      dispatch(rootSlice.handleModal({ type: 'entry' }));
    }
  };

  useEffect(() => {
    if (!Object.keys(post).length) return;

    const isEntry = entries.includes(post?.objectID);

    setEntry(isEntry);

    if (post.uid !== user.uid && !isEntry) {
      timeoutRef.current = setTimeout(() => {
        dispatch(rootSlice.handleModal({ type: 'advertise', meta: { type: 'entry' } }));
        displayedRef.current = true;
      }, 30000);
    }
  }, [post?.objectID, entries]);

  useEffect(() => {
    const el = entryRef.current;

    if (!el) return;

    const isEntry = entries.includes(post?.objectID);

    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (!isIntersecting || displayedRef.current) return;

      dispatch(rootSlice.handleModal({ type: 'advertise', meta: { type: 'entry' } }));

      displayedRef.current = true;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    });

    if (post.uid !== user.uid && !isEntry) {
      observer.observe(el);
    }

    return () => {
      observer.unobserve(el);
    };
  }, [post]);

  return { entry, handleEntry, entryRef };
};
