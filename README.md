# SES_HUB

## 構築

|     Project      | Firebase | Algolia | Hosting |                    access                    |
| :--------------: | :------: | :-----: | :-----: | :------------------------------------------: |
|      admin       |   prod   |  prod   | enable  | [URL](https://ses-hub-admin-2e26u5.web.app/) |
|     SES_HUB      |   prod   |  prod   | enable  |         [URL](https://ses-hub.app/)          |
| Freelance Direct |   prod   |  prod   | enable  |     [URL](https://freelance-direct.app/)     |

### ディレクトリ

```
ses_hub
│
├── build [ses-hub]
├── functions
│
├── admin
│   └─ build [ses-hub-admin-2e26u5]
│
├── freelance_direct
│   └─ build [freelance-direct]
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
yarn start
yarn build
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
    - Trigger Email
    - Run Subscription Payments with Stripe

- Algolia
- Stripe
- SendGrid

- Fort Awesome
- Material-UI
- Material-Icons
