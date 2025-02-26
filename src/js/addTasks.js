import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseConfig";

const addTasks = async (title, date, time, category, priority) => {
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
    console.log(task);

    await addDoc(collection(database, "tasks"), task);
    console.log("Task added successfully!");
  } catch (error) {
    console.log(error, "error adding the tasks");
  }
};

export default addTasks;
