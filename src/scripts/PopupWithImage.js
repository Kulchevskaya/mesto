import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupUrl = this._popup.querySelector('.popup__image');
    this._imagePopupCaption = this._popup.querySelector('.popup__caption');
  }

  open({name, link}) {
    this._imagePopupUrl.src = link
    this._imagePopupUrl.alt = name;
    this._imagePopupCaption.textContent = name;
    super.open();
  }
}
