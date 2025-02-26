import deleteTask from "./deleteTasks";

const deleteModal = document.querySelector(".delete-modal");
const deleteModalText = document.querySelector(".delete-modal__text");
const closeDeleteModalButton = document.querySelector(
  ".delete-modal__cancel-button"
);

const confirmDeleteButton = document.querySelector(
  ".delete-modal__confirm-button"
);

const openModal = (formModal, openModalButton) => {
  openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.add("form-modal--display");
  });
};

const closeModal = (formModal, closeModalButton) => {
  closeModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.remove("form-modal--display");
  });
};

const openDeleteModal = (id, taskTitle) => {
  deleteModal.classList.add("delete-modal--display");
  deleteModalText.textContent = `Are you sure you want to delete ${taskTitle}?`;
  console.log("from openDeleteModal");

  const confirmDeleteHandler = async () => {
    await deleteTask(id);
    deleteModal.classList.remove("delete-modal--display");
    confirmDeleteButton.addEventListener("click", confirmDeleteHandler);
    console.log("from confirmDeleteHandler");
  };
};

const closeDeleteModal = () => {
  closeDeleteModalButton.addEventListener("click", () => {
    deleteModal.classList.remove("delete-modal--display");
  });
};

export { openModal, closeModal, openDeleteModal, closeDeleteModal };
