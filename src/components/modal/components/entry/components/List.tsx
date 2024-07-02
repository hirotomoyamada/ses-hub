import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styles from '../Entry.module.scss';
import { Matter, Resource } from 'types/post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import * as postSlice from 'features/post/postSlice';
import { userPosts } from 'features/post/actions';
import { User } from 'types/user';
import { Oval } from 'react-loader-spinner';
import * as rootSlice from 'features/root/rootSlice';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { VisibilityOutlined } from '@material-ui/icons';
import { useScrollFetch } from 'hooks/useScrollFetch';
import { Load } from 'components/list/components/load/Load';

interface PropType {
  index: 'matters' | 'resources';
  proposedPost: Matter | Resource | undefined;
  setProposedPost: Dispatch<SetStateAction<Matter | Resource | undefined>>;
  user: User;
}

export const List: React.FC<PropType> = ({ index, user, proposedPost, setProposedPost }) => {
  index = index === 'matters' ? 'resources' : 'matters';
  const dispatch = useDispatch();
  const fetch = useSelector(rootSlice.load).fetch;
  const posts = useSelector((state: RootState) =>
    postSlice.posts({
      state,
      page: 'user',
      index,
    }),
  ) as Matter[] | Resource[];
  const hit = useSelector((state: RootState) =>
    postSlice.hit({
      state,
      page: 'user',
      index,
    }),
  );
  const [list, load, page] = useScrollFetch({
    index,
    hit,
    user,
    side: true,
    sort: { display: 'public', control: false },
  });

  useEffect(() => {
    if (!posts.length)
      dispatch(
        userPosts({
          index,
          uid: user.uid,
          display: 'public',
        }),
      );
  }, []);

  return (
    <div className={styles.entry_list}>
      <p className={styles.entry_list_title}>提案する{index === 'matters' ? '案件' : '人材'}</p>

      {fetch && !posts.length ? (
        <div className={styles.entry_list_load}>
          <Oval color='#49b757' height={56} width={56} />
        </div>
      ) : posts.length ? (
        <>
          <div className={styles.entry_list_items}>
            <div ref={list} className={styles.entry_list_items_inner}>
              {posts.map((post) => (
                <div
                  key={post.objectID}
                  className={`${styles.entry_list_btn} ${
                    post.objectID === proposedPost?.objectID && styles.entry_list_btn_selected
                  }`}
                  onClick={() => setProposedPost(post)}>
                  {'title' in post ? (
                    <div
                      className={`${styles.entry_list_btn_content} ${
                        post.objectID === proposedPost?.objectID &&
                        styles.entry_list_btn_content_selected
                      }`}>
                      <p>{post.title}</p>

                      <div
                        className={`${styles.entry_list_btn_data} ${
                          post.objectID === proposedPost?.objectID &&
                          styles.entry_list_btn_data_selected
                        }`}>
                        <span>{post.industry}</span>
                        <span>{post.position}</span>
                        <span>{post.location.area}</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${styles.entry_list_btn_content} ${
                        post.objectID === proposedPost?.objectID &&
                        styles.entry_list_btn_content_selected
                      }`}>
                      <p>
                        {post.roman.firstName.substring(0, 1)}&nbsp;.&nbsp;
                        {post.roman.lastName.substring(0, 1)}
                      </p>

                      <div
                        className={`${styles.entry_list_btn_data} ${
                          post.objectID === proposedPost?.objectID &&
                          styles.entry_list_btn_data_selected
                        }`}>
                        <span>{post.position}</span>
                        <span>{post.sex}</span>
                        <span>{post.age}歳</span>
                      </div>
                    </div>
                  )}

                  <div
                    className={styles.entry_list_btn_link}
                    onClick={(ev) => {
                      ev.stopPropagation();

                      if (post.objectID === proposedPost?.objectID) return;

                      const url = `/${index}/${post.objectID}`;

                      window.open(url);
                    }}>
                    {post.objectID === proposedPost?.objectID ? (
                      <CheckCircleIcon
                        className={`${styles.entry_list_btn_link_icon} ${styles.entry_list_btn_link_icon_selected}`}
                      />
                    ) : (
                      <VisibilityOutlined className={styles.entry_list_btn_link_icon} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {hit?.pages && hit?.pages !== 1 && page < hit?.pages ? (
              <Load load={load} page={page} hit={hit} boxSize={24} />
            ) : (
              <></>
            )}
          </div>

          <p className={styles.entry_list_desc}>
            ※ 提案する{index === 'matters' ? '案件' : '人材'}を選択してください。
          </p>
        </>
      ) : (
        <div className={styles.entry_list_empty}>
          <p>提案する{index === 'matters' ? '案件' : '人材'}がありません。</p>

          <button
            onClick={() => {
              dispatch(
                rootSlice.handleModal({
                  type: 'new',
                  meta: { index },
                  next: () => {
                    dispatch(rootSlice.handleModal({ type: 'entry' }));
                  },
                }),
              );
            }}>
            {index === 'matters' ? '案件' : '人材'}を登録する
          </button>
        </div>
      )}
    </div>
  );
};
