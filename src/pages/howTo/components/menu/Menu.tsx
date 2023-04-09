import React, { useLayoutEffect } from 'react';
import styles from './Menu.module.scss';
import { useLocation } from 'react-router-dom';

interface PropType {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

export const Menu: React.FC<PropType> = ({ page, setPage, type }) => {
  const location = useLocation();
  const index = location?.state as string | undefined;
  const indexs = [
    { page: 'home', name: 'ホーム' },
    { page: 'search', name: '検索' },
    { page: 'likes', name: 'いいね' },
    { page: 'outputs', name: '出力' },
    { page: 'entries', name: 'お問い合わせ' },
    { page: 'posts', name: '投稿' },
    { page: 'plan', name: 'プラン' },
    { page: 'requests', name: 'リクエスト' },
    { page: 'activity', name: 'アクティビティ' },
    { page: 'analytics', name: 'アナリティクス' },
    type !== 'individual' && { page: 'account', name: 'グループアカウント' },
  ];

  useLayoutEffect(() => {
    if (index) setPage(index);
  }, [index]);

  return (
    <div className={styles.menu}>
      {indexs.map(
        (index) =>
          index && (
            <button
              key={index.page}
              type="button"
              onClick={() => setPage(index.page)}
              className={`${styles.menu_btn} ${
                index.page === page && styles.menu_btn_current
              }`}>
              {index.name}
            </button>
          ),
      )}
    </div>
  );
};
