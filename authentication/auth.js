import firebase from "firebase";
import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { auth, firestore } from "./firebase";

export const register = async (email, password) => {
  try {
    findUserByEmail(email).then((exist) => {
      if (!exist) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            storeUser({
              email: email,
            });
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      } else {
        alert("Adress already used !");
      }
    });
  } catch (e) {
    return { error: true };
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        storeUser({
          email: email,
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
    if (result.type === "success") {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        result.idToken,
        result.accessToken
      );
      signInAndStoreUser(result, credential);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: Constants.manifest.extra.ANDROID_KEY,
      iosClientId: Constants.manifest.extra.IOS_KEY,
      scopes: ["profile", "email"],
    }).catch((error) => {
      alert("Error during the login with Google Provider :", error);
    });

    if (result.type === "success") {
      console.log("Success");
      const credential = firebase.auth.GoogleAuthProvider.credential(
        result.idToken,
        result.accessToken
      );
      signInAndStoreUser(result, credential);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export const signInWithFacebook = async () => {
  try {
    await Facebook.initializeAsync({
      appId: "598062151523851",
    });
    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    })
      .then(
        ({ type, token, expirationDate, permissions, declinedPermissions }) => {
          if (type === "success") {
            console.log(token);
            const credential =
              firebase.auth.FacebookAuthProvider.credential(token);

            signInAndStoreUser(result, credential);
            return result.accessToken;
            //   const credential = firebase.auth.GoogleAuthProvider.credential(
            //     result.idToken,
            //     result.accessToken
            //   );
            //return auth.signInWithCredential(credential);
            // Successful sign in is handled by auth.onAuthStateChanged
          }
          return Promise.reject(); // Or handle user cancelation separatedly
        }
      )
      .catch((error) => {
        // ...
        console.log(error);
      });
  } catch (e) {
    return { error: true };
  }
};

export const signOut = async () => {
  try {
    return await auth.signOut();
  } catch (e) {
    alert("Error when signing out: ", error);
  }
};

function signInAndStoreUser(result, credential) {
  auth
    .signInWithCredential(credential)
    .then(() => {
      storeUser(result.user);
    })
    .catch((error) => {
      console.log(error);
    });
}

function storeUser(user) {
  firestore.collection("users").doc(user.email).set(user);
}

export const findUserById = (id) => {
  const user = firestore.collection("users").where("id", "==", id);

  if (user) {
    console.log("Logged ?:", user);
  }
};

export function findUserByEmail(email) {
  return firebase
    .firestore()
    .collection("users")
    .doc(email)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        return true;
      }
      return false;
    });
}
