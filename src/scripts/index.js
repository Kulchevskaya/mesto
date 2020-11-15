import '../pages/index.css';

import { parametersValidation } from './components/components.js';
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithQuestion from './components/PopupWithQuestion.js';
import UserInfo from './components/UserInfo.js';
import Api from './utils/Api.js';

// Апи - вызываем сервер
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '4f7cbaee-8eca-456c-b2b6-53b18a278335',
    'Content-Type': 'application/json'
  }
}); 

// Формы -- валидация
const popupEditProfileValidator = new FormValidator(parametersValidation, parametersValidation.popupEditProfileSelector);
popupEditProfileValidator.enableValidation();

const popupAddFormValidator = new FormValidator(parametersValidation, parametersValidation.popupAddForm);
popupAddFormValidator.enableValidation();

const popupAvatarFormValidator = new FormValidator(parametersValidation, parametersValidation.popupAvatarForm);
popupAvatarFormValidator.enableValidation();

// Форма для увеличению картинок в карточках
function openPopupWithImage({name,link}) {
  const zoomImage = new PopupWithImage('.popup_type_zoom-image');
  zoomImage.setEventListeners();
  zoomImage.open({name,link});
}

// Форма с вопросом на удаление карточки
function openPopupWithQuestion({element, id}) {
  const deleteElement = element;
  const idElement = id;
  console.log(idElement);
  const deleteCard = new PopupWithQuestion({
    popupSelector: '.popup_type_question',
    handleSubmitForm: () => {
      console.log(idElement);
      api.deleteCard(idElement)
        .then((result) => {
          deleteElement.remove();
        })
    }
  });
  deleteCard.setEventListeners();
  deleteCard.open();
}

// Функция по лайкам
function likeCard({element, cardId, method}) {
  api.likeCard(cardId, method)
    .then((result) => {
      element.querySelector('.cards__like').classList.toggle('cards__like_active');
      element.querySelector('.cards__counter').textContent = result.likes.length;
    })
}


// Разметка для вывода карточек в прод
const initialCardsList = new Section ({
  renderer: ({name, link, likes, cardId, owner, userId}) => {
    const card = new Card({name, link, likes, cardId, owner, userId}, '#card-template', openPopupWithImage, openPopupWithQuestion, likeCard);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  }
}, '.cards')

// Вызываем первоначальные данные с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    const cards = cardData.map(item => {
      return {
        name: item.name,
        link: item.link,
        likes: item.likes,
        cardId: item._id,
        owner: item.owner._id
      }
    })
    initialCardsList.renderItems(cards, {userId: userData._id});
    userInfo.setUserInfo(userData);
    avatarUser.src = userData.avatar;
  });


// Форма добавления новых карточек
const popupOpenButtonAddForm = document.querySelector('.profile__add-button');

const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add-form',
  handleSubmitForm: (inputValues) => {
    api.createNewCard(inputValues)
      .then((result) => {
        const card = new Card({
          name: result.name, 
          link: result.link, 
          likes: result.likes, 
          cardId: result._id, 
          owner: result.owner._id,
          userId: result.owner._id}, '#card-template', openPopupWithImage, openPopupWithQuestion, likeCard);
        const cardElement = card.generateCard();
        initialCardsList.addItem(cardElement);
      })
      .finally (() => {
        popupAddForm.renderLoading(false);
        popupAddForm.close();
      })
  }
});

// --навешиваем обработчики событий на форму добавления карточек и на кнопку открытия формы
popupAddForm.setEventListeners();
popupOpenButtonAddForm.addEventListener('click', () => {
  popupAddForm.open();
});

// Форма профиля 
const avatarEditLayer = document.querySelector('.profile__overlay');
const avatarUser = document.querySelector('.profile__avatar');
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const userInfo = new UserInfo({ nameProfile:'.profile__name', jobProfile: '.profile__job' });
const nameInput = document.querySelector('.popup__form-item_type_name-input'); 
const jobInput = document.querySelector('.popup__form-item_type_job-input');

// форма по данным юзера
const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-form',
  handleSubmitForm: (inputValues) => {
    api.renewUserInfo(inputValues)
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .finally (() => {
        popupEditForm.renderLoading(false);
        popupEditForm.close();
      })
  }
});

// форма по аватарке
const popupAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar-form',
  handleSubmitForm: (inputValues) => {
    api.renewUserAvatar(inputValues)
      .then((result) => {
        avatarUser.src = result.avatar;
      })
      .finally (() => {
        popupAvatarForm.renderLoading(false);
        popupAvatarForm.close();
      })
  }
});

// --навешиваем обработчики на формы профиля и на кнопку и иконку открытия
popupEditForm.setEventListeners();
popupAvatarForm.setEventListeners();

popupEditProfileOpenButton.addEventListener('click', () => {
  const userProfile = userInfo.getUserInfo();
  nameInput.value = userProfile.name;
  jobInput.value = userProfile.about;
  popupEditProfileValidator.cleanInputErrors();
  popupEditForm.open();
})

avatarEditLayer.addEventListener('click', () => {
  popupAvatarFormValidator.cleanInputErrors();
  popupAvatarForm.open()
});
