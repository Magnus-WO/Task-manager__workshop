import addTasks from "./addTasks.js";
import appState from "./appState.js";
import { editTask } from "./editTasks.js";
import filterTasksByMonth from "./filterTasks.js";
import app, { database } from "./firebaseConfig.js";
import { openModal, closeModal, closeDeleteModal } from "./modal.js";
import renderTasks from "./renderTasks.js";
import validateForm from "./validation.js";

//Selecting elements from html
const formModal = document.querySelector(".form-modal");
const form = document.querySelector(".form");
const openModalButton = document.querySelector(".tools__button--add");
const closeModalButton = document.querySelector(".form__close-button");

const titleInput = document.querySelector(".form__title-input");
const dateInput = document.querySelector(".form__date-input");
const timeInput = document.querySelector(".form__time-input");
const categorySelect = document.querySelector(".form__category-select");
const prioritySelect = document.querySelector(".form__priority-select");

const openChartButton = document.querySelector(".tools__button--chart");
const filterSelect = document.querySelector(".tools__filter-month");
const submitButton = document.querySelector(".form__submit-button");
const formSubmissionFeedback = document.querySelector(
  ".form__submission-feedback"
);

// Adding eventlisteners
document.addEventListener("DOMContentLoaded", () => {
  openModal(formModal, openModalButton);
  closeModal(formModal, closeModalButton, form, submitButton);
  renderTasks();
  closeDeleteModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSubmissionFeedback.classList.remove("form--invalid-input", "form--valid");

  if (!validateForm()) {
    formSubmissionFeedback.classList.add("form--invalid-input");
    formSubmissionFeedback.textContent =
      "Please fill in the form before submitting it";
    setTimeout(() => {
      formSubmissionFeedback.textContent = "";
    }, 1000);
    return;
  }
  if (!appState.editState) {
    addTasks(
      titleInput.value,
      dateInput.value,
      timeInput.value,
      categorySelect.value,
      prioritySelect.value
    );
  } else {
    editTask(appState);
    appState.editState = null;
  }

  renderTasks();
  form.reset();
  formSubmissionFeedback.classList.remove("form--invalid-input");
  formSubmissionFeedback.classList.add("form--valid");
  formSubmissionFeedback.textContent = "Task added";
  setTimeout(() => {
    formSubmissionFeedback.textContent = "";
  }, 1000);
});

filterSelect.addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  filterTasksByMonth(selectedValue);
});
