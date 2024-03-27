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
    const entries = user.entries?.[index] ? user.entries[index] : [];

    setEntry(entries.length && entries.indexOf(post?.objectID) >= 0 ? true : false);
  }, [index, post?.objectID, user.entries]);

  return [entry, handleEntry];
};
