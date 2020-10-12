class Card {
  constructor({name, link}, templateSelector) {
    this._name = name,
    this._link = link,
    this._templateSelector = templateSelector
    this._imagePopup = document.querySelector('.popup_type_zoom-image');
    this._imagePopupUrl = this._imagePopup.querySelector('.popup__image');
    this._imagePopupCaption = this._imagePopup.querySelector('.popup__caption');
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
  }
  
  // _closePopupWithEsc(evt) {
  //   const popupToClose = document.querySelector('.popup_opened');
  //   if (evt.key === 'Escape' && popupToClose) {
  //     popupToClose.classList.remove('popup_opened');
  //   }
  // }

  
  _openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', function closePopupWithEsc(evt) {
      const popupToClose = document.querySelector('.popup_opened');
      if (evt.key === 'Escape' && popupToClose) {
      popupToClose.classList.remove('popup_opened');
      }
      this.removeEventListener('keydown', closePopupWithEsc);
    });
  }

  _zoomImage() {
    this._imagePopupUrl.src = this._link
    this._imagePopupUrl.alt = this._name;
    this._imagePopupCaption.textContent = this._name;
    this._openPopup(this._imagePopup);
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
