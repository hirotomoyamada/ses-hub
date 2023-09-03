import React from 'react';
import styles from './Item.module.scss';
import root from '../Main.module.scss';
import { useFormContext } from 'react-hook-form';

import { Data } from 'functions/_form';

export const Position: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data['matter'] & Data['resource']>();

  return (
    <div className={`${root.main_col} ${root.main_col_mid}`}>
      <span className={root.main_tag}>ポジション</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <select
          className={`${styles.item_input} ${errors.position && styles.item_input_error}`}
          {...register('position', {
            required: {
              value: true,
              message: 'ポジションを選択してください',
            },
          })}>
          <option hidden value=''>
            -
          </option>
          <option value='フロントエンドエンジニア'>フロントエンドエンジニア</option>
          <option value='バックエンドエンジニア'>バックエンドエンジニア</option>
          <option value='サーバーエンジニア'>サーバーエンジニア</option>
          <option value='ブロックチェーンエンジニア'>ブロックチェーンエンジニア</option>
          <option value='インフラエンジニア'>インフラエンジニア</option>
          <option value='データベースエンジニア'>データベースエンジニア</option>
          <option value='クラウドエンジニア'>クラウドエンジニア</option>
          <option value='ネットワークエンジニア'>ネットワークエンジニア</option>
          <option value='セキュリティエンジニア'>セキュリティエンジニア</option>
          <option value='リードエンジニア'>リードエンジニア</option>
          <option value='システムエンジニア'>システムエンジニア</option>
          <option value='社内SE'>社内SE</option>
          <option value='アプリエンジニア'>アプリエンジニア</option>
          <option value='iOSエンジニア'>iOSエンジニア</option>
          <option value='Androidエンジニア'>Androidエンジニア</option>
          <option value='機械学習エンジニア'>機械学習エンジニア</option>
          <option value='AIエンジニア(人工知能)'>AIエンジニア(人工知能)</option>
          <option value='汎用機エンジニア'>汎用機エンジニア</option>
          <option value='マークアップエンジニア'>マークアップエンジニア</option>
          <option value='テストエンジニア'>テストエンジニア</option>
          <option value='テスター・デバッガー・QA'>テスター・デバッガー・QA</option>
          <option value='組み込み・制御'>組み込み・制御</option>
          <option value='データサイエンティスト'>データサイエンティスト</option>
          <option value='PdM'>PdM</option>
          <option value='PM/PL'>PM/PL</option>
          <option value='PM'>PM</option>
          <option value='PMO'>PMO</option>
          <option value='PMOサポート'>PMOサポート</option>
          <option value='VPoE'>VPoE</option>
          <option value='CRE'>CRE</option>
          <option value='SRE'>SRE</option>
          <option value='エンジニアリングマネージャー'>エンジニアリングマネージャー</option>
          <option value='SAP'>SAP</option>
          <option value='プロデューサー'>プロデューサー</option>
          <option value='コンサルタント'>コンサルタント</option>
          <option value='マーケター'>マーケター</option>
          <option value='Webディレクター'>Webディレクター</option>
          <option value='Webプランナー'>Webプランナー</option>
          <option value='Webデザイナー'>Webデザイナー</option>
          <option value='Webコーダー'>Webコーダー</option>
          <option value='UI・UXデザイナー'>UI・UXデザイナー</option>
          <option value='グラフィックデザイナー'>グラフィックデザイナー</option>
          <option value='3Dデザイナー'>3Dデザイナー</option>
          <option value='2Dデザイナー'>2Dデザイナー</option>
          <option value='キャラクターデザイナー'>キャラクターデザイナー</option>
          <option value='イラストレーター'>イラストレーター</option>
          <option value='アートディレクター'>アートディレクター</option>
          <option value='ゲームプランナー'>ゲームプランナー</option>
          <option value='ゲームデザイナー'>ゲームデザイナー</option>
          <option value='サポート'>サポート</option>
          <option value='キッティング'>キッティング</option>
          <option value='ヘルプデスク'>ヘルプデスク</option>
          <option value='IT事務'>IT事務</option>
          <option value='若手枠'>若手枠</option>
          <option value='未経験可'>未経験可</option>
          <option value='その他'>その他</option>
        </select>

        {errors.position?.message && (
          <span className={styles.item_error}>{errors.position.message}</span>
        )}
      </div>
    </div>
  );
};
