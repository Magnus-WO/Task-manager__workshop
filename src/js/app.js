import addTasks from "./addTasks.js";
import app, { database } from "./firebaseConfig.js";
import { openModal, closeModal, closeDeleteModal } from "./modal.js";
import renderTasks from "./renderTasks.js";

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
  closeModal(formModal, closeModalButton);
  renderTasks();
  closeDeleteModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTasks(
    titleInput.value,
    dateInput.value,
    timeInput.value,
    categorySelect.value,
    prioritySelect.value
  );
  renderTasks();
});
