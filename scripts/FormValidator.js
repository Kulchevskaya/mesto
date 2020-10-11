class FormValidator {
  constructor(parameters, formSelector) {
    this._parameters = parameters;
    this._formSelector = formSelector;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._parameters.errorClass);
    inputElement.classList.add(this._parameters.inputErrorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;;
    errorElement.textContent = "";
    errorElement.classList.remove(this._parameters.errorClass);
    inputElement.classList.remove(this._parameters.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  } 
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._parameters.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._parameters.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._parameters.inputSelector));
    const buttonElement = formElement.querySelector(this._parameters.submitButtonSelector);
    // обнуляем кнопку при запуске
    this._toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    const formElement = document.querySelector(this._formSelector);
    const submitFormHandler = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener('submit', submitFormHandler);
    this._setEventListeners(formElement); 
  };
}

export default FormValidator;