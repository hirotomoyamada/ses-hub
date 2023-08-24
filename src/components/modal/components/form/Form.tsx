import React, { memo, useRef, useState } from 'react';
import styles from './Form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { httpsCallable, HttpsCallable } from 'firebase/functions';
import * as firebase from 'libs/firebase';
import { createPost, editPost } from 'features/post/actions';
import * as rootSlice from 'features/root/rootSlice';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import * as functions from 'functions';
import { Matter, Resource } from 'types/post';
import { User } from 'types/user';
import { Oval } from 'react-loader-spinner';
import { AIHeader } from './components/header/AIHeader';
import { OwnDispatch } from '@reduxjs/toolkit';

const completePost: HttpsCallable<
  { index: 'matters' | 'resources'; content: string },
  { posts: Matter[] | Resource[] }
> = httpsCallable(firebase.functions, 'sh-completePost');

interface PropType {
  index: 'matters' | 'resources' | 'companys' | 'persons';
  user: User;
  post: Matter | Resource;
  handleClose: () => void;
  edit?: boolean;
}

export const Form: React.FC<PropType> = memo(({ index, user, post, handleClose, edit }) => {
  const dispatch = useDispatch();
  const fetch = useSelector(rootSlice.load).fetch;
  const page = useSelector(rootSlice.page);
  const demo = useSelector(rootSlice.verified)?.demo;
  const [isAI, setIsAI] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const completedPosts = useRef<any[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);

  const aiMethods = useForm({ defaultValues: { content: '' } });
  const basicMethods = useForm<functions.form.Data['matter'] & functions.form.Data['resource']>({
    defaultValues: functions.form.defaultValues(index as 'matters' | 'resources', post, edit),
  });

  const handleCreate: SubmitHandler<
    functions.form.Data['matter'] & functions.form.Data['resource']
  > = async (data) => {
    if (index !== 'matters' && index !== 'resources') return;

    if (page !== 'home' && page !== 'search' && page !== 'user') return;

    if (demo) {
      handleClose();

      return;
    }

    const create = (() => {
      switch (index) {
        case 'matters':
          return functions.form.matters(data as unknown as functions.form.Data['matter']);

        case 'resources':
          return functions.form.resources(data as unknown as functions.form.Data['resource']);

        default:
          return;
      }
    })();

    if (create) {
      if (posts.length) {
        completedPosts.current = [...completedPosts.current, create];

        if (posts.length - 1 !== currentIndex) {
          mainRef.current?.scrollTo({ top: 0 });
          setPost(posts[currentIndex + 1]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          dispatch(rootSlice.handleLoad({ fetch: true }));

          await Promise.allSettled(
            completedPosts.current.map(async (post) => {
              await (dispatch as OwnDispatch)(createPost({ index, page, post, hasPosts: true }));
            }),
          );

          dispatch(rootSlice.handleLoad());
          handleClose();
        }
      } else {
        dispatch(createPost({ index, page, post: create }));
      }
    }
  };

  const handleEdit: SubmitHandler<
    functions.form.Data['matter'] & functions.form.Data['resource']
  > = (data) => {
    if (index !== 'matters' && index !== 'resources') return;

    if (user.uid !== post.uid) {
      handleClose();

      return;
    }

    const edit = (() => {
      switch (index) {
        case 'matters':
          return {
            ...post,
            ...functions.form.matters(data as unknown as functions.form.Data['matter']),
          };

        case 'resources':
          return {
            ...post,
            ...functions.form.resources(data as unknown as functions.form.Data['resource']),
          };

        default:
          return;
      }
    })();

    if (edit) dispatch(editPost({ index, post: edit }));
  };

  const handleComplete: SubmitHandler<{ content: string }> = async ({ content }) => {
    if (index !== 'matters' && index !== 'resources') return;

    try {
      dispatch(rootSlice.handleLoad({ fetch: true }));

      const { data } = await completePost({ index, content });

      const post = data.posts[currentIndex];

      if (!post) throw new Error('読み込みに失敗しました');

      aiMethods.reset({ content: '' });

      const defaultValues = functions.form.defaultValues(index, post, true);

      basicMethods.reset(defaultValues);

      setPosts(data.posts);
    } catch (e) {
      if (e instanceof Error)
        dispatch(
          rootSlice.handleAnnounce({
            error: e.message,
          }),
        );
    } finally {
      dispatch(rootSlice.handleLoad());
    }
  };

  const setPost = (post: any) => {
    if (index !== 'matters' && index !== 'resources') return;

    basicMethods.resetField('handles', {
      defaultValue: [{ handle: undefined }, { handle: undefined }, { handle: undefined }],
    });
    basicMethods.resetField('tools', {
      defaultValue: [{ tool: undefined }, { tool: undefined }, { tool: undefined }],
    });
    basicMethods.resetField('requires', {
      defaultValue: [{ require: undefined }, { require: undefined }, { require: undefined }],
    });
    basicMethods.resetField('prefers', {
      defaultValue: [{ prefer: undefined }, { prefer: undefined }, { prefer: undefined }],
    });
    basicMethods.resetField('skills', {
      defaultValue: [{ skill: undefined }, { skill: undefined }, { skill: undefined }],
    });

    const defaultValues = functions.form.defaultValues(index, post, true);

    basicMethods.reset(defaultValues);
  };

  return !isAI || !!posts.length ? (
    <FormProvider {...basicMethods}>
      <form
        className={styles.form}
        onSubmit={
          edit ? basicMethods.handleSubmit(handleEdit) : basicMethods.handleSubmit(handleCreate)
        }>
        <Header
          edit={edit}
          isAI={isAI}
          setIsAI={setIsAI}
          fetch={fetch}
          handleClose={handleClose}
          hasPosts={!!posts.length}
          isLast={!!posts.length && posts.length - 1 !== currentIndex}
        />
        <Main
          ref={mainRef}
          index={index as 'matters' | 'resources'}
          edit={edit}
          handleClose={handleClose}
        />

        {fetch && (
          <div className={styles.form_fetch}>
            <Oval color='#49b757' height={56} width={56} />
          </div>
        )}

        {!!posts.length && (
          <div className={styles.form_footer}>
            <button
              className={styles.form_cancel}
              disabled={fetch}
              type='button'
              onClick={() => {
                setPosts((prev) => {
                  const next = prev.filter((_, index) => index !== currentIndex);
                  completedPosts.current = completedPosts.current.filter(
                    (_, index) => index !== currentIndex,
                  );

                  if (!next.length) {
                    basicMethods.reset(
                      functions.form.defaultValues(index as 'matters' | 'resources', post, edit),
                    );
                    setCurrentIndex(0);
                  } else if (next.length - 1 < currentIndex) {
                    mainRef.current?.scrollTo({ top: 0 });
                    setPost(completedPosts.current[completedPosts.current.length - 1]);
                    setCurrentIndex(next.length - 1);
                  } else {
                    mainRef.current?.scrollTo({ top: 0 });
                    setPost(next[currentIndex]);
                  }

                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                  return next;
                });
              }}>
              取消
            </button>

            <div className={styles.form_pagination}>
              <div className={styles.form_pagination_inner}>
                <span>{currentIndex + 1}</span>
                <span className={styles.form_pagination_desc}>/</span>
                <span className={styles.form_pagination_desc}>{posts.length}</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  ) : (
    <FormProvider {...aiMethods}>
      <form className={styles.form} onSubmit={aiMethods.handleSubmit(handleComplete)}>
        <AIHeader
          edit={edit}
          isAI={isAI}
          setIsAI={setIsAI}
          fetch={fetch}
          handleClose={handleClose}
        />

        <div className={styles.main}>
          <div className={styles.main_col}>
            <textarea
              className={`${styles.main_textarea} ${
                aiMethods.formState.errors.content && styles.main_textarea_error
              }`}
              {...aiMethods.register('content', {
                required: `${index === 'matters' ? '案件' : '人材'}情報を入力してください`,
              })}></textarea>

            {aiMethods.formState.errors.content?.message ? (
              <span className={styles.main_error}>
                {aiMethods.formState.errors.content?.message}
              </span>
            ) : null}

            <span className={styles.main_desc}>
              &nbsp;※&nbsp;区切り線は、5文字以上の同一文字で入力してください。区切り線が正しくない場合、情報が正しく読み込まれない可能性があります。
            </span>
          </div>
        </div>

        {fetch && (
          <div className={styles.form_fetch}>
            <Oval color='#49b757' height={56} width={56} />
          </div>
        )}
      </form>
    </FormProvider>
  );
});
