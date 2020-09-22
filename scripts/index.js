// Выборка элементов для формы редактирования
const popupEditProfile = document.querySelector('.popup_type_edit-form');
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-item_type_name-input'); 
const jobInput = formElement.querySelector('.popup__form-item_type_job-input');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Выборка элементов для формы добавления
const popupAddForm = document.querySelector('.popup_type_add-form');
const popupOpenButtonAddForm = document.querySelector('.profile__add-button');
const popupCloseButtonAddForm = popupAddForm.querySelector('.popup__close-button');

const formAddElement = popupAddForm.querySelector('.popup__form_type_add-form');
const titleInput = popupAddForm.querySelector('.popup__form-item_type_place-title-input');
const imageUrlInput = popupAddForm.querySelector('.popup__form-item_type_image-url-input');

// Выборка элементов template карточек
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

// Выборка элементов для попап увеличения картинок
const imagePopup = document.querySelector('.popup_type_zoom-image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
const imagePopupUrl = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// Исходные карточки
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция по открытию/закрытию попапов
const togglePopup = (item) => {
  item.classList.toggle('popup_opened');
}

// Функция по взятию значений профаила в инпут попапа
const getUserInfo = () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

const toggleEditUserProfilePopup = () => {
  getUserInfo();
  togglePopup (popupEditProfile);
}

// Регистрируем обработчики событий по попапам
popupEditProfileOpenButton.addEventListener('click', toggleEditUserProfilePopup);
popupEditProfileCloseButton.addEventListener('click', () => {togglePopup(popupEditProfile)});
popupOpenButtonAddForm.addEventListener('click', () => {togglePopup(popupAddForm)});
popupCloseButtonAddForm.addEventListener('click', () => {togglePopup(popupAddForm)});
imagePopupCloseButton.addEventListener('click', () => {togglePopup(imagePopup)});

// Функция по редактированию профиля 
const formSubmitHandler = (evt) => {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  togglePopup(popupEditProfile);  
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Функция по удалению карточки
const deleteCard = (evt) => {
  const eventTarget = evt.target;
  eventTarget.closest('.cards__item').remove();
}

// Функция по лайкам карточки
const likeCard = (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('cards__like_active');
}

// Функция по увеличению карточек
const zoomImage = (evt) => {
  const eventTarget = evt.target;
  imagePopupUrl.src = eventTarget.src;
  imagePopupUrl.alt = eventTarget.alt;
  imagePopupCaption.textContent = eventTarget.alt;
  togglePopup(imagePopup);
}

// Функция по добавлению обработчика для карточек (лайк, удалить)
function setCardListeners(element) {  
  element.querySelector('.cards__like').addEventListener('click', likeCard);  
  element.querySelector('.cards__delete').addEventListener('click', deleteCard);  
  element.querySelector('.cards__image').addEventListener('click', zoomImage);
}

// Функция по созданию карточки
function createCard({name, link}) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.cards__image');
  cardElementImage.alt = name;
  cardElementImage.src = link;
  cardElement.querySelector('.cards__text').textContent = name;
  setCardListeners(cardElement);
  return cardElement;  
}

// Функция по добавлению карточки
function addCard(item) {
  cardsContainer.prepend(item);
}

// Функция по выводу карточек в прод (╯ ° □ °) ╯ (┻━┻)
function renderInitialCards(array) {
  const arrayWithCards = array.map(createCard);
  arrayWithCards.forEach(addCard);  
}

// Функция по добавлению новых карточек юзером
function formAddSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.
  const card = createCard({
    name: titleInput.value,
    link: imageUrlInput.value
  });
  addCard(card);

  togglePopup(popupAddForm);
  titleInput.value = '';
  imageUrlInput.value = '';
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', formAddSubmitHandler);


renderInitialCards(initialCards);



