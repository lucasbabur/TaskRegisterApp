import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { orderBy } from "firebase/firestore";
import { auth } from "../firebaseAppConfig";

const provider = new GoogleAuthProvider();

export const signIn = () => {
  signInWithPopup(auth, provider);
};

export const signOut = () => {
  auth.signOut();
};
