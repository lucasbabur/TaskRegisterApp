import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  setDoc,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { TaskFormFieldsInterface } from "../../config/forms/taskRegistrationForm/interface";

import { db } from "../firebaseAppConfig";

export type UID = { uid: string };
export type Day = { day: string };

function isValidISODateString(day: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(day);
}

export function getDateISOFromDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function readTasksByDay(
  day: string
): Promise<(TaskFormFieldsInterface & UID)[]> {
  const tasksRef = collection(db, "tasks");

  const q = query(
    tasksRef,
    where("day", "==", new Date(day)),
    orderBy("startTime")
  );

  const tasksSnapshot = await getDocs(q);

  const tasksList: (TaskFormFieldsInterface & UID)[] = tasksSnapshot.docs.map(
    (doc) => ({
      uid: doc.id,
      ...(doc.data() as TaskFormFieldsInterface),
    })
  );

  return tasksList;
}

export async function readTaskByUID(
  uid: string
): Promise<TaskFormFieldsInterface & Day> {
  const taskRef = doc(db, "tasks", uid);
  const taskSnapshot = await getDoc(taskRef);
  const task = taskSnapshot.data() as TaskFormFieldsInterface & Day;
  return task;
}

export async function readTasksByRange(
  startDate: Date,
  endDate: Date
): Promise<(TaskFormFieldsInterface & { uid: string; day: Date })[]> {
  const tasksRef = collection(db, "tasks");

  const startTimestamp = Timestamp.fromDate(startDate); // startDate as a Firestore Timestamp
  const endTimestamp = Timestamp.fromDate(endDate); // endDate as a Firestore Timestamp

  const q = query(
    tasksRef,
    where("day", ">=", startTimestamp),
    where("day", "<=", endTimestamp)
  );

  const tasksSnapshot = await getDocs(q);

  const tasksList: (TaskFormFieldsInterface & { uid: string; day: Date })[] =
    tasksSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...(doc.data() as TaskFormFieldsInterface),
      day: new Date(doc.data().day.seconds * 1000),
    }));

  return tasksList;
}

export async function readTasksWhichContainsTheGivenMonitoring(
  monitoring: string,
  startDate: Date,
  endDate: Date
): Promise<(TaskFormFieldsInterface & { uid: string; day: Date })[]> {
  const tasksCollection = collection(db, "tasks"); // replace 'tasks' with your actual collection name

  // Convert startDate and endDate to Firestore Timestamp if they are JavaScript Date objects
  const startTimestamp = Timestamp.fromDate(startDate); // startDate as a Firestore Timestamp
  const endTimestamp = Timestamp.fromDate(endDate); // endDate as a Firestore Timestamp

  const monitoringQuery = query(
    tasksCollection,
    where("monitoredTasks", "array-contains", monitoring),
    where("day", ">=", startTimestamp),
    where("day", "<=", endTimestamp),
    orderBy("day")
  );

  const querySnapshot = await getDocs(monitoringQuery);

  return querySnapshot.docs.map((doc) => ({
    uid: doc.id,
    ...(doc.data() as TaskFormFieldsInterface),
    day: new Date(doc.data().day.seconds * 1000),
  }));
}

export const writeTask = async (
  task: TaskFormFieldsInterface & { day: Date | string }
): Promise<string> => {
  task.day = new Date(task.day);
  const docRef = await addDoc(collection(db, "tasks"), task);
  const generatedUID = docRef.id;
  return generatedUID; // or use it as needed
};

export const editTask = async (
  task: TaskFormFieldsInterface & UID
): Promise<string> => {
  await setDoc(doc(db, "tasks", task.uid), task);
  return task.uid; // or use it as needed
};

export const removeTask = async (uid: string) => {
  await deleteDoc(doc(db, "tasks", uid));
};
