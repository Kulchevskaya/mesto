import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__form-item');
    this._formValues = {};
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._itemsValue = this._getInputValues();
      this._handleSubmitForm(this._itemsValue);
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
