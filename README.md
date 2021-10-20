# SES_HUB

## 環境

|     Project      | Hosting |                     prod                     |                      dev                       |
| :--------------: | :-----: | :------------------------------------------: | :--------------------------------------------: |
|      admin       | enable  | [URL](https://ses-hub-admin-2e26u5.web.app/) |   [URL](https://ses-hub-dev-ed356.web.app/)    |
|     SES_HUB      | enable  |         [URL](https://ses-hub.app/)          |  [URL](https://ses-hub-admin-2c308.web.app/)   |
| Freelance Direct | enable  |     [URL](https://freelance-direct.app/)     | [URL](https://freelance-direct-2855f.web.app/) |

### ディレクトリ

```
ses_hub
│
├── build [ses-hub, ses-hub-dev-ed356]
├── functions
│   ├─ ses_hub
│   ├─ admin
│   ├─ freelance_direct
│   └─ export
│
├── admin
│   └─ build [ses-hub-admin-2e26u5, ses-hub-admin-2c308]
│
├── freelance_direct
│   └─ build [freelance-direct, freelance-direct-2855f]
│
├── public
└── src
```

### 認証

1. `firebase` `ユーザーと権限` `メンバーの追加` を行い `ロール` を付与
2. `firebase CLI` でログイン `firebase login`

### 取得

1. `firebase functions:config:get seshub > .config.json`
2. 各自 `.env` に入れ込む

### コマンド

```
<!-- 環境切り替え -->
firebase use dev //開発環境
firebase use prod //本番環境

<!-- 開発環境 -->
yarn start
yarn build

<!-- 本番環境 -->
yarn start-prod
yarn build-prod

firebase functions:config:get
firebase functions:config:set
firebase deploy
firebase deploy --only functions
firebase deploy --only functions:sh-login,functions:sh-fetchPosts
firebase deploy --only hosting
firebase deploy --only hosting:sh
```

### デモ

|      domain      |           email           | password |                access                |
| :--------------: | :-----------------------: | :------: | :----------------------------------: |
|     SES_HUB      |     demo@ses-hub.app      | qwer1234 |     [URL](https://ses-hub.app/)      |
| Freelance Direct | demo@freelance-direct.app | qwer1234 | [URL](https://freelance-direct.app/) |

## 技術

- React

  - Redux Toolkit
  - React Hook Form
  - React Router
  - React Hemlmet
  - React CountUp
  - react-copy-to-clipboard
  - react-loader-spinner
  - react-to-print
  - use-postal-jp

- Firebase

  - Authentication
  - Firestore
  - Storage
  - Hosting
  - Functions

  - Extensions
    - Run Subscription Payments with Stripe

- Algolia
- Stripe
- SendGrid

- Fort Awesome
- Material-UI
- Material-Icons
