import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styles from '../Entry.module.scss';
import { Matter, Resource } from 'types/post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import * as postSlice from 'features/post/postSlice';
import { userPosts } from 'features/post/actions';
import { User } from 'types/user';
import { Oval } from 'react-loader-spinner';
import LaunchIcon from '@material-ui/icons/Launch';
import * as rootSlice from 'features/root/rootSlice';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface PropType {
  index: 'matters' | 'resources';
  proposedPost: Matter | Resource | undefined;
  setproposedPost: Dispatch<SetStateAction<Matter | Resource | undefined>>;
  user: User;
}

export const List: React.FC<PropType> = ({ index, user, proposedPost, setproposedPost }) => {
  index = index === 'matters' ? 'resources' : 'matters';
  const dispatch = useDispatch();
  const load = useSelector(rootSlice.load).fetch;
  const posts = useSelector((state: RootState) =>
    postSlice.posts({
      state: state,
      page: 'user',
      index,
    }),
  ) as Matter[] | Resource[];

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

      {!load ? (
        posts.length ? (
          <div className={styles.entry_list_items}>
            {posts.map((post) => (
              <div
                key={post.objectID}
                className={`${styles.entry_list_btn} ${
                  post.objectID === proposedPost?.objectID && styles.entry_list_btn_selected
                }`}
                onClick={() => setproposedPost(post)}>
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
                    <LaunchIcon className={styles.entry_list_btn_link_icon} />
                  )}
                </div>
              </div>
            ))}
          </div>
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
        )
      ) : (
        <div className={styles.entry_list_load}>
          <Oval color='#49b757' height={56} width={56} />
        </div>
      )}

      {!load && posts.length ? (
        <p className={styles.entry_list_desc}>
          ※ 提案する{index === 'matters' ? '案件' : '人材'}を選択してください。
        </p>
      ) : null}
    </div>
  );
};
