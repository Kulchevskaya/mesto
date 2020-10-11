class Card {
  constructor({name, link}, templateSelector) {
    this._name = name,
    this._link = link,
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
  }

  _closePopupWithEsc = (evt) => {
    if (evt.key === 'Escape') {
      const popupToClose = document.querySelector('.popup_opened');
      popupToClose.classList.toggle('popup_opened');
    }
  }

  _openPopup = (item) => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => { this._closePopupWithEsc(evt); });
  }

  _zoomImage() {
    const imagePopup = document.querySelector('.popup_type_zoom-image');
    const imagePopupUrl = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');
    
    imagePopupUrl.src = this._element.querySelector('.cards__image').src
    imagePopupUrl.alt = this._element.querySelector('.cards__image').alt;
    imagePopupCaption.textContent = this._element.querySelector('.cards__image').alt;
    this._openPopup(imagePopup);
  }

  _deleteCard() {
    this._element.remove();
  }
  
  _likeCard() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
  }

  _setCardListeners() {  
    this._element.querySelector('.cards__like').addEventListener('click', () => { this._likeCard (); });  
    this._element.querySelector('.cards__delete').addEventListener('click', () => { this._deleteCard(); });  
    this._element.querySelector('.cards__image').addEventListener('click', () => { this._zoomImage(); });
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardElementImage = this._element.querySelector('.cards__image');
    cardElementImage.alt = this._name;
    cardElementImage.src = this._link;
    this._element.querySelector('.cards__text').textContent = this._name;
    this._setCardListeners();

    return this._element;
  }  
}

export default Card;
