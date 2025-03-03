import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";
import renderTasks from "./renderTasks";

const toggleCompletion = async (id, tableRow) => {
  try {
    const taskToComplete = doc(database, "tasks", id);
    const taskSnapshot = await getDoc(taskToComplete);
    const currentIsCompletedState = taskSnapshot.data().isCompleted;
    const updatedIsCompletedState = !currentIsCompletedState;

    await updateDoc(taskToComplete, { isCompleted: updatedIsCompletedState });
    if (updatedIsCompletedState) {
      tableRow.classList.add("task--completed");
    } else {
      tableRow.classList.remove("task--completed");
    }
  } catch (error) {
    console.log(error, "error updating task completion");
  }
};

export default toggleCompletion;
