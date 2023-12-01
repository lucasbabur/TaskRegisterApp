import React, { createContext, useContext, ReactNode } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseAppConfig";

import { useSignal, useSignalEffect } from "@preact/signals-react";

import { Firestore } from "firebase/firestore";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import * as FirebaseFunctions from "./firebaseFunctions";

import { auth, db } from "./firebaseAppConfig";

auth.useDeviceLanguage();

interface FirebaseContextProps {
  db: Firestore;
  auth: Auth;
  currentUser: User | null;
  loading: boolean;
  functions: typeof FirebaseFunctions /* The Goal of this property is to provide all the firebase functions in a type safe way */;
}

interface FirebaseProviderProps {
  children: ReactNode;
}

const FirebaseContext = createContext<FirebaseContextProps>({
  db,
  auth,
  currentUser: null,
  loading: true,
  functions: FirebaseFunctions,
});

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  React.useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, []);

  const currentUser = useSignal<User | null>(null);
  const loading = useSignal(true);

  useSignalEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      currentUser.value = user;
      loading.value = false;
    });

    return unsubscribe;
  });

  const value = {
    db,
    auth,
    currentUser: currentUser.value,
    loading: loading.value,
    functions: FirebaseFunctions,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading.value && children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase needs to be used inside the FirebaseProvider");
  }
  return context;
};
