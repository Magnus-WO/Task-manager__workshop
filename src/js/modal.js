import deleteTask from "./deleteTasks";
import { hideSpinner, showSpinner } from "./spinner";
import validateForm, { fieldsToValidate } from "./validation";

const deleteModal = document.querySelector(".delete-modal");
const deleteModalText = document.querySelector(".delete-modal__text");
const closeDeleteModalButton = document.querySelector(
  ".delete-modal__cancel-button"
);

const confirmDeleteButton = document.querySelector(
  ".delete-modal__confirm-button"
);

const formModal = document.querySelector(".form-modal");
const openModal = (formModal, openModalButton) => {
  openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.add("form-modal--display");
  });
  validateForm();
};

const closeModal = (formModal, closeModalButton, form, submitButton) => {
  closeModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    submitButton.textContent = "Add task";
    formModal.classList.remove("form-modal--display");
    fieldsToValidate.forEach((field) => {
      const errorParagraph = document.querySelector(`.${field.errorClass}`);

      errorParagraph.style.display = "none";
      errorParagraph.textContent = "";
    });
  });
};

let previousConfirmDeleteHandler = null;

const openDeleteModal = (id, taskTitle) => {
  deleteModal.classList.add("delete-modal--display");
  deleteModalText.textContent = `Are you sure you want to delete ${taskTitle}?`;

  const confirmDeleteHandler = async () => {
    showSpinner();
    await deleteTask(id);
    deleteModal.classList.remove("delete-modal--display");
    hideSpinner();
  };

  if (previousConfirmDeleteHandler) {
    confirmDeleteButton.removeEventListener(
      "click",
      previousConfirmDeleteHandler
    );
  }
  confirmDeleteButton.addEventListener("click", confirmDeleteHandler);
  previousConfirmDeleteHandler = confirmDeleteHandler;
};

const closeDeleteModal = () => {
  closeDeleteModalButton.addEventListener("click", () => {
    deleteModal.classList.remove("delete-modal--display");
  });
};

const openEditModal = () => {
  formModal.classList.add("form-modal--display");
};

export {
  openModal,
  closeModal,
  openDeleteModal,
  closeDeleteModal,
  openEditModal,
};
