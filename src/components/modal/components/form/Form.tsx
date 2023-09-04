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
// import { completePost } from './chatgpt';

const completePost: HttpsCallable<
  { index: 'matters' | 'resources'; content: string },
  { posts: Matter[] | Resource[] }
> = httpsCallable(firebase.functions, 'sh-completePost', { timeout: 300 * 1000 });

interface PropType {
  index: 'matters' | 'resources' | 'companys' | 'persons';
  user: User;
  post: Matter | Resource;
  handleClose: () => void;
  edit?: boolean;
}

const placeholder = {
  matters: `【案件名】SES_HUBの保守・運用
【業界】WEBサービス
【ポジション】フロントエンドエンジニア
【業務詳細】
  サービスの保守・運用を行い、新規機能の開発を担当。
【勤務地】荒川区西日暮里
【リモート】あり
【開始時期】2023年9月〜
【就業時間】9:00~18:00
【環境】
  - 言語・フレームワーク
    - TypeScript
    - JavaScript
    - React
    - Next.js
  - ツール
    - Firebase
    - Docker
    - Slack
【必須】
  - TypeScriptの実務業務3年以上
  - Reactを用いてWEBアプリケーションを開発したことがある
【歓迎】
  - FirebaseやGCPを用いてWEBアプリケーションを運用したことがある
  - Stripeを用いて決算システムを構築したことがある
【面談】オンライン上 1回
【単価】100万円〜120万円
【精算】140h〜180h
【商流】エンド→弊社
【支払いサイト】30日
【稟議速度】当日中
-------------------------
【案件名】Freelance Directのデザイン・機能改修
【業界】WEBサービス
【ポジション】フロントエンドエンジニア
【業務詳細】
  サービスのデザイン・機能の改修を行い、リリース後保守も担当。
【勤務地】荒川区西日暮里
【リモート】あり
【開始時期】2023年10月〜
【就業時間】9:00~18:00
【環境】
  - 言語・フレームワーク
    - TypeScript
    - JavaScript
    - React
    - Next.js
  - ツール
    - Firebase
    - Docker
    - Slack
【必須】
  - TypeScriptの実務業務3年以上
  - Reactを用いてWEBアプリケーションを開発したことがある
【歓迎】
  - FirebaseやGCPを用いてWEBアプリケーションを運用したことがある
【面談】オンライン上 1回
【単価】100万円〜120万円
【精算】140h〜180h
【商流】エンド→弊社
【支払いサイト】30日
【稟議速度】当日中
`,
  resources: `【氏名】H.Y
【ポジション】リードエンジニア
【性別】男性
【年齢】30歳
【PR文】
  多数のWEBアプリケーションの設計・開発・運用まで経験しており、iOSやAndroidアプリケーションも経験しております。プロジェクトでバックエンド開発やサーバー構築も参加することが多く得意です。UIデザイナーの一面もあり、アプリケーションのデザインまで幅広く担当しています。また、オープンソースのChakra UIやMantine UIの開発に参加し、日本発のReact UIコンポーネントライブラリのYamada UIの開発をリーダーとして行なっています。
【所属】直個人事業主
【最寄駅】新宿駅
【稼働可能時期】2023年9月〜
【単価】140万円〜160万円
【環境】
  - 言語・フレームワーク
    - TypeScript
    - PHP
    - Python
    - Go
    - SQL
    - React
    - Laravel
    - Flutter
  - ツール
    - Docker
    - AWS
    - Firebase
    - Google Cloud Platform
    - Figma
    - Photoshop
    - Illustrator
    - Adobe XD
【スキル】
  - ReactとTypeScriptを用いてWEBアプリケーションと開発・保守を3年以上経験。
  - API設計からPHPやPythonを用いてAPIを開発・保守を3年以上経験。
  - リード経験あり、とくにフロント側の技術選定が得意。
  - アプリケーションの要件定義から設計までのデザインを多数経験。
【並行】あり
-------------------------
【氏名】Y.I
【ポジション】UI・UXデザイナー
【性別】女性
【年齢】22歳
【PR文】
  多数のWEBアプリケーションのデザインを担当し、品質担保・アクセシビリティを得意としています。
【所属】直個人事業主
【最寄駅】中野駅
【稼働可能時期】2023年10月〜
【単価】100万円〜120万円
【環境】
  - 言語・フレームワーク
    - HTML
    - JavaScript
  - ツール
    - Figma
    - Photoshop
    - Illustrator
    - Adobe XD
【スキル】
  - アプリケーションの要件定義から設計までのデザインを多数経験。
【並行】あり
`,
};

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
            <p className={styles.main_tag}>
              {index === 'matters' ? '案件' : '人材'}情報をコピー&ペーストしてください
            </p>
            <textarea
              className={`${styles.main_textarea} ${
                aiMethods.formState.errors.content && styles.main_textarea_error
              }`}
              {...aiMethods.register('content', {
                required: `${index === 'matters' ? '案件' : '人材'}情報を入力してください`,
              })}
              placeholder={
                index === 'matters' ? placeholder.matters : placeholder.resources
              }></textarea>

            {aiMethods.formState.errors.content?.message ? (
              <span className={styles.main_error}>
                {aiMethods.formState.errors.content?.message}
              </span>
            ) : null}

            <span className={styles.main_desc}>
              &nbsp;※&nbsp;区切り線は、5文字以上の同一文字で入力してください。区切り線が正しくない場合、情報が正しく読み込まれない可能性があります。
              <br />
              &nbsp;※&nbsp;人工知能は、発展途上の技術です。情報によっては、正しく文章の認識・生成が出来ない場合があります。
              <br />
              &nbsp;※&nbsp;生成された内容をご確認の上、不足情報は備考などに記載を行いご登録ください。
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
