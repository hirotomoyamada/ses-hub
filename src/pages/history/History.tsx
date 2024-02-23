import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { useParams } from 'react-router-dom';

import * as rootSlice from 'features/root/rootSlice';
import * as postSlice from 'features/post/postSlice';
import * as userSlice from 'features/user/userSlice';

import { Header } from 'components/header/Header';

import { List as Main } from 'components/list/List';

import { historyPosts } from 'features/post/actions';

export const History: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{
    index: 'matters' | 'resources';
  }>();
  const rootIndex = useSelector(rootSlice.index);
  const index = params.index ? params.index : rootIndex;
  const user = useSelector(userSlice.user);

  const posts = useSelector((state: RootState) =>
    postSlice.posts({
      state: state,
      page: 'history',
      index: index,
    }),
  );

  useEffect(() => {
    dispatch(
      historyPosts({
        index: index === 'companys' ? 'matters' : index,
      }),
    );
  }, [dispatch, index, user]);

  useEffect(() => {
    dispatch(rootSlice.handlePage('history'));
  }, [dispatch]);

  return (
    <div>
      <Header index={index} user={user} />

      <Main index={index} user={user} type='history' posts={posts} />
    </div>
  );
};
