import * as firebase from "firebase";
import Constants from "expo-constants";

export const firebaseConfig = {
  apiKey: Constants.manifest.extra.API_KEY,
  authDomain: Constants.manifest.extra.AUTH_DOMAIN,
  projectId: Constants.manifest.extra.PROJECT_ID,
  storageBucket: Constants.manifest.extra.STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.MESSAGE_SENDER_ID,
  appId: Constants.manifest.extra.APP_ID,
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
