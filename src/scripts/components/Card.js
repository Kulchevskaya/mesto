class Card {
  constructor({name, link, likes, cardId, owner, userId}, templateSelector, openPopupWithImage, openPopupWithQuestion, likeCard) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = cardId;
    this._owner = owner;
    this._user = userId;
    this._templateSelector = templateSelector;
    this._openPopupWithImage = openPopupWithImage;
    this._openPopupWithQuestion = openPopupWithQuestion;
    this._likeCards = likeCard;
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
    this._openPopupWithQuestion({
      element: this._element,
      id: this._cardId});
  }
  
  _likeCard() {
    this._like = this._element.querySelector('.cards__like');
    if (this._like.classList.contains('cards__like_active')) {
      this._likeCards({
        element: this._element, 
        cardId: this._cardId, 
        method: 'DELETE'})
    } else {
      this._likeCards({
        element: this._element, 
        cardId: this._cardId, 
        method: 'PUT'})
    }
  }

  _checkLikes() {
    if (this._likes.some(item => item._id === this._user)) {
      this._element.querySelector('.cards__like').classList.add('cards__like_active');
    }
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
    this._element.querySelector('.cards__counter').textContent = this._likes.length;
    this._checkLikes();
    this._setCardListeners();
    if (this._owner != this._user) {
      this._element.querySelector('.cards__delete').classList.add('cards__delete_disabled');
      return this._element;
    } else {
      return this._element;
    }  
  }  
}

export default Card;