import { doc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";
import renderTasks from "./renderTasks";

const toggleCompletion = async (id, isCompleted) => {
  try {
    const taskToComplete = doc(database, "tasks", id);
    console.log(taskToComplete);

    await updateDoc(taskToComplete, { isCompleted: !isCompleted });
    console.log(isCompleted);
  } catch (error) {
    console.log(error, "error updating task completion");
  }
};

export default toggleCompletion;
