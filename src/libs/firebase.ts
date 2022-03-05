import { initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {
  Firestore,
  getFirestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { getFunctions } from "firebase/functions";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

export const auth = ((): Auth => getAuth())();
export const db = ((): Firestore => getFirestore())();
export const functions = getFunctions(app, "asia-northeast1");
export const providerGoogle = new GoogleAuthProvider();
export const providerTwitter = new TwitterAuthProvider();
export const providerGithub = new GithubAuthProvider();

export const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (doc: T) => doc,
  fromFirestore: (doc: QueryDocumentSnapshot<T>, op) => doc.data(op),
});
