import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as rootSlice from 'features/root/rootSlice';

import { User } from 'types/user';
import { Matter, Resource } from 'types/post';

export const useEntry = (
  index: 'matters' | 'resources',
  post: Matter | Resource,
  user: User,
): [entry: boolean, handleEntry: () => void] => {
  const dispatch = useDispatch();

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
      dispatch(rootSlice.handleModal({ type: 'advertise', meta: { type: 'entry' } }));
    }
  }, [index, post?.objectID, user.entries]);

  return [entry, handleEntry];
};
