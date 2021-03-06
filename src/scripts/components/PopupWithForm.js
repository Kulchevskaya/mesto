import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__form-item');
    this._button = this._popupForm.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
        formValues[input.name] = input.value;
    });
    return formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...'
    } else {
      this._button.textContent = 'Сохранить'
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._itemsValue = this._getInputValues();
      this._handleSubmitForm(this._itemsValue);
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
