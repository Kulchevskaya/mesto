class Card {
  constructor({name, link}, templateSelector, openPopupWithImage) {
    this._name = name,
    this._link = link,
    this._templateSelector = templateSelector
    this._openPopupWithImage = openPopupWithImage;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
  }
  
  _zoomImage() {
    this._openPopupWithImage({
      name: this._name, 
      link: this._link});
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
