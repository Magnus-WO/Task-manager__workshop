import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { database } from "./firebaseConfig";
import toggleCompletion from "./toggleTaskCompletion";
import { closeDeleteModal, openDeleteModal } from "./modal";

const renderTasks = async (tasks = "all") => {
  const tableBody = document.querySelector(".table__body");
  tableBody.innerHTML = "";

  let renderCollection;

  if ((tasks = "all")) {
    const taskCollection = collection(database, "tasks");
    const q = query(taskCollection, orderBy("createdAt"));
    const tasksSnapshot = await getDocs(q);
    renderCollection = tasksSnapshot.docs;
  } else {
    renderCollection = tasks;
  }
  renderCollection.forEach((doc, index) => {
    const task = doc.data();

    // Creating elements
    const tableRow = document.createElement("tr");

    const taskNumber = document.createElement("td");
    const taskTitle = document.createElement("td");
    const taskDate = document.createElement("td");
    const taskTime = document.createElement("td");
    const taskCategory = document.createElement("td");
    const taskPriority = document.createElement("td");
    const taskTools = document.createElement("td");

    const completeTaskButton = document.createElement("button");
    const deleteTaskButton = document.createElement("button");
    const editTaskButton = document.createElement("button");

    // Append elements
    tableBody.append(tableRow);
    tableRow.append(
      taskNumber,
      taskTitle,
      taskDate,
      taskTime,
      taskCategory,
      taskPriority,
      taskTools
    );
    taskTools.append(completeTaskButton, deleteTaskButton, editTaskButton);

    // Adding taks´s details
    taskNumber.textContent = index + 1;
    taskTitle.textContent = task.title;
    taskDate.textContent = task.date;
    taskTime.textContent = task.time ? task.time : "—";
    taskCategory.textContent = task.category;
    taskPriority.textContent = task.priority;

    completeTaskButton.innerHTML = "<i class='fa-solid fa-check'></i>";
    deleteTaskButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
    editTaskButton.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";

    // Add class names

    tableRow.classList.add("table__body-row");
    taskNumber.classList.add("table__body-number");
    taskTitle.classList.add("table__body-title");
    taskDate.classList.add("table__body-date");
    taskTime.classList.add("table__body-time");
    taskCategory.classList.add("table__body-category");
    taskPriority.classList.add("table__body-priority");

    taskTools.classList.add("table__body-tools");
    completeTaskButton.classList.add("tools__button");
    deleteTaskButton.classList.add("tools__button");
    editTaskButton.classList.add("tools__button");

    if (task.isCompleted) {
      tableRow.classList.add("task--completed");
    }
    // Add eventlisteners
    completeTaskButton.addEventListener("click", () => {
      toggleCompletion(doc.id, tableRow);
    });
    deleteTaskButton.addEventListener("click", () => {
      openDeleteModal(doc.id, task.title);
    });
  });
};

export default renderTasks;
