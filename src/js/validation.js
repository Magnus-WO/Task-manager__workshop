export const fieldsToValidate = [
  {
    id: "title",
    message: "please enter task title",
    errorClass: "form__title-error",
  },
  {
    id: "date",
    message: "please enter the tasks due date",
    errorClass: "form__date-error",
  },
  {
    id: "category",
    message: "please select the tasks category",
    errorClass: "form__category-error",
  },
  {
    id: "priority",
    message: "please select the tasks priority",
    errorClass: "form__priority-error",
  },
];

const validateForm = () => {
  let isValid = true;
  fieldsToValidate.forEach((field) => {
    const fieldToValidate = document.querySelector(`#${field.id}`);
    const errorParagraph = document.querySelector(`.${field.errorClass}`);
    fieldToValidate.addEventListener("blur", () => {
      if (!fieldToValidate.value.trim()) {
        errorParagraph.style.display = "block";
        errorParagraph.textContent = field.message;
      } else {
        errorParagraph.style.display = "none";
        errorParagraph.textContent = "";
      }
    });
  });
  fieldsToValidate.forEach((field) => {
    const fieldToValidate = document.querySelector(`#${field.id}`);
    if (!fieldToValidate.value.trim()) {
      isValid = false;
    }
  });
  return isValid;
};

export default validateForm;
