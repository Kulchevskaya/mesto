import FormValidator from './FormValidator.js';
import Card from './Card.js';

// Параметры для валидатора
const parameters = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error-text_visible',
  popupEditProfileSelector: '.popup_type_edit-form',
  popupAddForm: '.popup_type_add-form'
}

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

// Функция по взятию значений профаила в инпут попапа
const getUserInfo = () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

// Функция по закрытию попапов кнопкой esc
const closePopupWithEsc = (evt) => {
  const popupToClose = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupToClose) {
    closePopup(popupToClose);
  }
}

 // Функция открытия попапа с дополнениями 
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}


// Функция по открытию Попапа профиля
const toggleEditUserProfilePopup = () => {
  getUserInfo();
  openPopup(popupEditProfile);
}

// Регистрируем обработчики событий по попапам
popupEditProfileOpenButton.addEventListener('click', toggleEditUserProfilePopup);
popupEditProfileCloseButton.addEventListener('click', () => {closePopup(popupEditProfile)});
popupOpenButtonAddForm.addEventListener('click', () => {openPopup(popupAddForm)});
popupCloseButtonAddForm.addEventListener('click', () => {closePopup(popupAddForm)});
imagePopupCloseButton.addEventListener('click', () => {closePopup(imagePopup)});


//Функция по закрытию по оверлею
const closePopupByClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  }
}

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((formElement) => {
  formElement.addEventListener('mouseup', closePopupByClickOnOverlay);
});

// Функция по редактированию профиля 
const formSubmitHandler = (evt) => {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);  
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// валидация форм
const popupEditProfileValidator = new FormValidator(parameters, parameters.popupEditProfileSelector);
popupEditProfileValidator.enableValidation();

const popupAddFormValidator = new FormValidator(parameters, parameters.popupAddForm);
popupAddFormValidator.enableValidation();

// Функция по добавлению карточки
function addCard(item) {
  cardsContainer.prepend(item);
}

// Функция по выводу карточек в прод
function renderInitialCards(array) {
  array.map(({name, link}) => {
    const cardElement = new Card({name, link}, '#card-template');
    const card = cardElement.generateCard();
    addCard(card)
  });
}

// Функция по добавлению новых карточек юзером
function formAddSubmitHandler (evt) {
  evt.preventDefault(); 

  const cardElement = new Card({
    name: titleInput.value,
    link: imageUrlInput.value
  }, '#card-template');
  const card = cardElement.generateCard();
  addCard(card);

  closePopup(popupAddForm);
  titleInput.value = '';
  imageUrlInput.value = '';
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', formAddSubmitHandler);


renderInitialCards(initialCards);



