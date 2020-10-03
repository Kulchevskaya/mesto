const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error-text_visible' //class for span with message of error 2 show it (opacity 1)
}

// Ф показать ошибку 
const showInputError = (parameters, inputElement, errorMessage) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameters.errorClass);
  inputElement.classList.add(parameters.inputErrorClass);
};

// Ф скрыть ошибку
const hideInputError = (parameters, inputElement) => {
  const errorElement = inputElement.nextElementSibling;;
  errorElement.textContent = "";
  errorElement.classList.remove(parameters.errorClass);
  inputElement.classList.remove(parameters.inputErrorClass);
}

// Функция по выводу и скрытию текста ошибки
const checkInputValidity = (parameters, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(parameters, inputElement, errorMessage);
  } else {
    hideInputError(parameters, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
} 

// Функция по обнулению кнопки
const toggleButtonState = (parameters, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(parameters.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(parameters.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

// Функция по событиям формы и проверке кнопки
const setEventListeners = (parameters,formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  // обнуляем кнопку при запуске
  toggleButtonState(parameters, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(parameters, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(parameters, inputList, buttonElement);
    });
  });
};

// Функция валидирования форм
enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(parameters, formElement);         
  });
};

enableValidation(parameters); 
