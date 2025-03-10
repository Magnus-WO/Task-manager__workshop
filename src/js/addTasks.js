import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseConfig";
import { hideSpinner, showSpinner } from "./spinner";

const addTasks = async (title, date, time, category, priority) => {
  showSpinner();
  try {
    const task = {
      title,
      date,
      time,
      category,
      priority,
      isCompleted: false,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(database, "tasks"), task);
    console.log("Task added successfully!");
  } catch (error) {
    console.log(error, "error adding the tasks");
  } finally {
    hideSpinner();
  }
};

export default addTasks;
