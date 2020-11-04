import '../pages/index.css';

import {
  parametersValidation,
  initialCards,
} from './components.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js';


// Формы -- валидация
const popupEditProfileValidator = new FormValidator(parametersValidation, parametersValidation.popupEditProfileSelector);
popupEditProfileValidator.enableValidation();

const popupAddFormValidator = new FormValidator(parametersValidation, parametersValidation.popupAddForm);
popupAddFormValidator.enableValidation();

// Форма для увеличению картинок в карточках
function openPopupWithImage({name,link}) {
  const zoomImage = new PopupWithImage('.popup_type_zoom-image');
  zoomImage.setEventListeners();
  zoomImage.open({name,link});
}

// Разметка для вывода карточек в прод
const initialCardsList = new Section ({
  items: initialCards, 
  renderer: ({name, link}) => {
    const card = new Card({name, link}, '#card-template', openPopupWithImage);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  }
}, '.cards')

// Форма добавления новых карточек
const popupOpenButtonAddForm = document.querySelector('.profile__add-button');

const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add-form',
  handleSubmitForm: (itemsValue) => {
    const card = new Card({name: itemsValue.title, link: itemsValue.url}, '#card-template', openPopupWithImage);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  }
});

// --навешиваем обработчики событий на форму добавления карточек и на кнопку открытия формы
popupAddForm.setEventListeners();
popupOpenButtonAddForm.addEventListener('click', () => {
  popupAddForm.open();
});

// Форма профиля 
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const userInfo = new UserInfo({ nameProfile:'.profile__name', jobProfile: '.profile__job' });
const nameInput = document.querySelector('.popup__form-item_type_name-input'); 
const jobInput = document.querySelector('.popup__form-item_type_job-input');

const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-form',
  handleSubmitForm: (inputValues) => {
    userInfo.setUserInfo(inputValues);
  }
});

// --навешиваем обработчики на форму профиля и на кнопку открытия
popupEditForm.setEventListeners();

popupEditProfileOpenButton.addEventListener('click', () => {
  const userProfile = userInfo.getUserInfo();
  nameInput.value = userProfile.name;
  jobInput.value = userProfile.job;
  popupEditProfileValidator.cleanInputErrors();
  popupEditForm.open();
})

// выводим базовые карточки в прод
initialCardsList.renderItems();



