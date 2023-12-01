import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseAppConfig";

export const writeMonitoring = async (monitoringTaskName: string) => {
  const docRef = await updateDoc(doc(db, "monitoring", "generalMonitoring"), {
    [monitoringTaskName]: monitoringTaskName,
  });
};

export const readMonitoring = async (): Promise<string[]> => {
  const docRef = doc(db, "monitoring", "generalMonitoring");
  const docSnap = await getDoc(docRef);

  // get all the entries in docSnap and return them as an array
  if (!docSnap.data()) return [];

  let monitoringTasksList: string[] = [];
  for (const [key, value] of Object.entries(docSnap.data() as object)) {
    monitoringTasksList.push(value);
  }
  monitoringTasksList.sort();
  return monitoringTasksList;
};

export const deleteMonitoring = async (monitoringTaskName: string) => {
  const docRef = doc(db, "monitoring", "generalMonitoring");
  await updateDoc(docRef, {
    [monitoringTaskName]: deleteField(),
  });
};
