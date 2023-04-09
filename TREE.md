# functions

```
├── libs # コンパイル先
├── src # コンパイル元
│   ├── admin # 管理画面
│   │   ├── _dataOrganize.ts #  ユーザー取得時に削除されている投稿などを削除
│   │   ├── _fetch.ts # 取得する際の整形
│   │   ├── _format.ts # 作成・編集する際の整形
│   │   ├── _userAuthenticated.ts
│   │   ├── account.ts # アカウントを編集
│   │   ├── data.ts # 全般を編集
│   │   ├── extract.ts # ユーザーの投稿やフォロー・グループアカウント一覧を取得
│   │   ├── fetch.ts # 投稿・投稿一覧・ユーザーを取得
│   │   ├── index.ts
│   │   ├── login.ts # ログイン
│   │   ├── mail # メール本文
│   │   │   ├── _type.ts # 法人アカウントの申請の承認
│   │   │   └── index.ts
│   │   ├── post.ts # 投稿を編集・削除
│   │   ├── resume.ts # 職務経歴書を更新・削除
│   │   ├── send.ts # メールを配信
│   │   └── user.ts # ユーザーを編集
│   │
│   ├── backup # バックアップ
│   │   ├── _algolia.ts # Algolia
│   │   ├── _firestore.ts # Firestore
│   │   └── index.ts
│   │
│   ├── freelance_direct
│   │   ├── index.ts
│   │   ├── mail # 問い合わせ / メール本文
│   │   │   ├── _create.ts # ユーザーの作成
│   │   │   ├── _decline.ts # ユーザーの謝絶(無効)
│   │   │   ├── _disable.ts # ユーザーの無効
│   │   │   ├── _enable.ts # ユーザーの有効
│   │   │   ├── _goBack.ts # ユーザーの復活
│   │   │   ├── _promotion.ts # LPの問い合わせ
│   │   │   ├── _request.ts # リクエスト
│   │   │   ├── contact.ts # 問い合わせ
│   │   │   └── index.ts
│   │   │
│   │   ├── post
│   │   │   ├── _fetch.ts # 取得する際の整形
│   │   │   ├── _userAuthenticated.ts #
│   │   │   ├── extract.ts # ユーザーが登録している(いいねやリクエストなど)一覧を取得
│   │   │   ├── fetch.ts # 投稿・投稿一覧を取得
│   │   │   ├── home.ts # ホームを取得
│   │   │   ├── promotion.ts # LPに表示する投稿一覧を取得
│   │   │   └── user.ts # ユーザーが保有する投稿一覧を取得
│   │   │
│   │   └── user
│   │       ├── _fetch.ts # 取得する際の整形
│   │       ├── _format.ts # 作成・編集する際の整形
│   │       ├── _loginAuthenticated.ts #
│   │       ├── _userAuthenticated.ts #
│   │       ├── agree.ts # 利用規約を同意
│   │       ├── remind.ts # 案件・人材投稿の催促
│   │       ├── automation.ts #
│   │       ├── email.ts # メールアドレスを変更
│   │       ├── entry.ts # エントリー
│   │       ├── fetch.ts # ユーザーを取得
│   │       ├── follow.ts # フォローする・解除する
│   │       ├── home.ts # ホームに追加・削除する
│   │       ├── like.ts # いいねする・解除する
│   │       ├── login.ts # ログイン
│   │       ├── profile.ts # プロフィールを作成・編集 / ユーザー状態を変更
│   │       ├── provider.ts # ソーシャルログインを追加
│   │       ├── request.ts # リクエストを承認・ブロックする
│   │       └── resume.ts # 職務経歴書を更新・削除
│   │
│   ├── ses_hub
│   │   ├── index.ts
│   │   ├── mail # 問い合わせ/ メール本文
│   │   │   ├── _create.ts # ユーザーの作成
│   │   │   ├── _decline.ts # ユーザーの謝絶(無効)
│   │   │   ├── _disable.ts # ユーザーの無効
│   │   │   ├── _enable.ts # ユーザーの有効
│   │   │   ├── _goBack.ts # ユーザーの復活
│   │   │   ├── _post.ts # 投稿
│   │   │   ├── _promotion.ts # LPの問い合わせ
│   │   │   ├── _request.ts # リクエスト
│   │   │   ├── _tweet.ts # ツイート
│   │   │   ├── _type.ts # 法人アカウントの申請の承認
│   │   │   ├── contact.ts # 問い合わせ
│   │   │   └── index.ts
│   │   │
│   │   ├── pay
│   │   │   ├── TaxBehavior.ts
│   │   │   ├── _userAuthenticated.ts
│   │   │   ├── checkout.ts # チェックアウトを作成
│   │   │   ├── create.ts # プラン・オプションを追加
│   │   │   ├── fetch.ts # プラン・オプション一覧を取得
│   │   │   ├── notice.ts # 通知を無効
│   │   │   ├── schedule.ts # 通知・閲覧回数を更新
│   │   │   └── update.ts # プラン・オプションを追加
│   │   │
│   │   ├── post
│   │   │   ├── _fetch.ts # 取得する際の整形
│   │   │   ├── _format.ts # 作成・編集する際の整形
│   │   │   ├── _postAuthenticated.ts
│   │   │   ├── _userAuthenticated.ts
│   │   │   ├── extract.ts # ユーザーが登録している(いいねやリクエストなど)一覧を取得
│   │   │   ├── fetch.ts # 投稿・投稿一覧を取得
│   │   │   ├── home.ts # フォローしているユーザーの投稿一覧などを取得
│   │   │   ├── post.ts # 投稿を作成・編集・削除・メール配信・ツイート配信
│   │   │   ├── activity.ts # 投稿のいいね・出力などの統計データ
│   │   │   ├── promotion.ts # LPに表示する投稿一覧を取得
│   │   │   └── user.ts # ユーザーが保有する投稿一覧を取得
│   │   │
│   │   └── user
│   │       ├── _fetch.ts # 取得する際の整形
│   │       ├── _format.ts # 作成・編集する際の整形
│   │       ├── _loginAuthenticated.ts
│   │       ├── _userAuthenticated.ts
│   │       ├── agree.ts # 利用規約に同意
│   │       ├── application.ts # 申請(法人アカウントの変更など)
│   │       ├── automation.ts
│   │       ├── child.ts # 子アカウントを作成・削除・メールアドレス変更
│   │       ├── email.ts # メールアドレスを変更
│   │       ├── entry.ts # エントリー
│   │       ├── fetch.ts # ユーザーを取得
│   │       ├── follow.ts # フォローする・解除する
│   │       ├── home.ts # ホームに追加・削除する
│   │       ├── like.ts # いいねする・解除する
│   │       ├── activity.ts # ユーザーのいいね・出力などの統計データ
│   │       ├── login.ts # ログイン
│   │       ├── output.ts # 出力に登録・解除する
│   │       ├── profile.ts # プロフィールを作成・編集
│   │       ├── provider.ts # ソーシャルログインを追加
│   │       ├── request.ts # リクエストする・解除する
│   │       └── verification.ts # パスワードを変更する際、有効なユーザーかどうかを判断(例：子アカウントは無効)
│   │
│   └── types
│   │   ├── algolia.d.ts # Algolia 型定義
│   │   ├── auth.d.ts # 管理画面 型定義
│   │   ├── firestore.d.ts # Firestore 型定義
│   │   └── utils.d.ts
│   │
│   ├── sendgrid.ts # SendGrid API
│   ├── algolia.ts # Algolia API
│   ├── bitly.ts # bitly API
│   ├── dummy.ts # ダミー情報 作成
│   ├── firebase.ts # Firebase API
│   ├── stripe.ts # Stripe API
│   ├── twitter.ts # Twitter API
│   └── index.ts #
│
├── package.json
├── tsconfig.json
└── yarn.lock
```

# admin

```
├── hooks
├── functions # コード整形・無限スクロールなど
├── libs # API
├── types # 型定義
├── components
│   ├── announce # アナウンス(更新・編集が完了した際に画面に表示される通知)
│   ├── command # コマンド(新着順や更新順を選択する際のモーダル)
│   ├── cover # カバー
│   ├── header # ヘッダー(ページごとに切替)
│   ├── btn # ボタン
│   ├── icon # アイコン
│   ├── item # ユーザー情報や投稿情報の一部抜粋したカード
│   ├── load # ローディング
│   ├── list # ユーザー・投稿一覧(インナー)
│   ├── side # ユーザーの情報や投稿一覧
│   └── modal # モーダル
│
├── features
│   ├── post # 投稿に関する処理
│   ├── root # 全体に関する処理
│   └── user # ユーザーに関する処理
│
└── pages
    ├── admin # 管理画面
    ├── account # アカウントを更新するページ
    ├── list # ユーザー・投稿一覧
    ├── notSupport # IE非対応
    ├── post # 投稿を表示するページ
    ├── user # ユーザーを表示するページ
    ├── setting # 全般を更新するページ
    ├── mail # メールを配信するページ
    └── auth # ログイン画面
```

# ses_hub

```
├── hooks
├── functions # アカウント・設定・支払い関連・コード整形・無限スクロールなど
├── libs # API
├── types # 型定義
├── components
│   ├── announce # アナウンス(画面上に表示される通知)
│   ├── operation # 三点リーダー(ボタンを押した際、表示されるモーダル)
│   ├── command # 投稿カード or 投稿詳細 or ユーザーページ に表示されるいいね・出力・エントリーボタン
│   ├── cover # カバー
│   ├── follow # フォロー(ボタン)
│   ├── header # ヘッダー(ページごとに切替)
│   ├── icon # アイコン
│   ├── load # ローディング
│   ├── menu # メニュー(右下)
│   ├── item # ユーザー情報や投稿情報の一部抜粋したカード
│   ├── list # 投稿一覧
│   ├── modal # モーダル
│   │   └── components
│   │       ├── activity # ユーザー・投稿のいいね・出力などの統計データ
│   │       ├── application # 法人アカウントの変更の申請
│   │       ├── account # グループアカウント
│   │       ├── advertise # 広告
│   │       ├── agree # 利用規約
│   │       ├── delete # 削除する際の注意
│   │       ├── demo # デモ
│   │       ├── entry # エントリー
│   │       ├── form # 案件・人材
│   │       ├── home # ホーム
│   │       ├── information # お知らせ
│   │       ├── profile # プロフィール
│   │       └── request # リクエスト
│   └── request # リクエスト(ボタン)
│
├── features
│   ├── pay # Stripeに関する処理
│   ├── post # 投稿に関する処理
│   ├── root # 全体に関する処理
│   └── user # ユーザーに関する処理
│
└── pages # ページ
　   ├── account # グループアカウント
　   ├── asct # 特定商取引法に基づく表示
　   ├── auth # 新規登録・ログイン
　   ├── contact # 問い合わせ
　   ├── howTo # How to App
　   ├── list # いいね・出力・エントリー
　   ├── maintenance # メンテナンス
　   ├── notFound # 404
　   ├── notSupport # IE非対応
　   ├── limit # 閲覧回数
　   ├── setting # アカウント情報
　   ├── user # ユーザーページ
　   ├── post # 投稿詳細ページ
　   ├── pay # プラン
　   ├── success # プランやオプションが正常に完了した際に表示
　   ├── terms # 利用規約
　   └── promotion # LP
        └── layouts
            ├── footer
            ├── fv
            ├── header
            └── section
                ├── can # できること
                ├── feature # 機能
                ├── lets # さぁ、はじめよう
                ├── option # オプション
                ├── post # みつけよう
                ├── price # 料金
                └── what # What's SES_HUB?
```

# freelance_direct

```
├── hooks
├── functions # アカウント・設定・支払い関連・コード整形・無限スクロールなど
├── libs # API
├── types # 型定義
├── components
│   ├── announce # アナウンス(画面上に表示される通知)
│   ├── operation # 三点リーダー(ボタンを押した際、表示されるモーダル)
│   ├── command # 投稿カード or 投稿詳細 or ユーザーページ に表示されるいいね・出力・エントリーボタン
│   ├── cover # カバー
│   ├── follow # フォロー(ボタン)
│   ├── header # ヘッダー(ページごとに切替)
│   ├── icon # アイコン
│   ├── load # ローディング
│   ├── item # ユーザー情報や投稿情報の一部抜粋したカード
│   ├── list # 投稿一覧
│   ├── menu # メニュー(左)
│   ├── modal # モダール
│   │   └── components
│   │       ├── agree # 利用規約
│   │       ├── delete # 削除する際の注意
│   │       ├── demo # デモ
│   │       ├── entry # エントリー
│   │       ├── home # ホーム
│   │       ├── information # お知らせ
│   │       └── profile # プロフィール
│   ├── overlay メニューが表示された際の背景(TB/SPのみ)
│   └── request リクエスト(ボタン)
│
├── features
│   ├── post # 投稿に関する処理
│   ├── root # 全体に関する処理
│   └── user # ユーザーに関する処理
│
└──pages
　   ├── auth # 新規登録・ログイン
　   ├── contact # 問い合わせ
　   ├── howTo # How to App
　   ├── list # いいね・・エントリー・リクエスト・閲覧履歴
　   ├── maintenance # メンテナンス
　   ├── notFound # 404
　   ├── notSupport # IE非対応
　   ├── user # ユーザーページ
　   ├── post # 投稿詳細ページ
　   ├── setting # アカウント情報
　   ├── terms # 利用規約
　   └── promotion #LP
　       └── layouts
　           ├── header
　           ├── footer
　           ├── fv
　           └── section
　               ├── can # できること
　               ├── feature # 機能
　               ├── lets # もっと、探しませんか？
　               ├── search # 探してみよう
　               ├── target # ご利用いただける方
　               └── what # フリーランスダイレクトって
```
