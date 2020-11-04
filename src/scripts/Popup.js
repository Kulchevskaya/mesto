export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closePopupByClickOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mouseup', this._closePopupByClickOnOverlay.bind(this));
  }
}
