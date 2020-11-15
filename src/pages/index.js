import './index.css';

import { parametersValidation } from '../scripts/utils/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithQuestion from '../scripts/components/PopupWithQuestion.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/utils/Api.js';

// Апи - вызываем сервер
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '4f7cbaee-8eca-456c-b2b6-53b18a278335',
    'Content-Type': 'application/json'
  }
}); 


// Вызываем первоначальные данные с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    (function () {
      const cards = cardData.map(item => {
        return {
          name: item.name,
          link: item.link,
          likes: item.likes,
          cardId: item._id,
          owner: item.owner._id
        }
      })

      // Разметка для вывода карточек в прод
      const initialCardsList = new Section ({
        renderer: ({name, link, likes, cardId, owner, userId}) => {
          const card = new Card({name, link, likes, cardId, owner, userId}, '#card-template', openPopupWithImage, openPopupWithQuestion, likeCard);
          const cardElement = card.generateCard();
          initialCardsList.addItemAppend(cardElement);
        }
      }, '.cards')
      
      // Формы -- валидация
      const popupEditProfileValidator = new FormValidator(parametersValidation, parametersValidation.popupEditProfileSelector);
      const popupAddFormValidator = new FormValidator(parametersValidation, parametersValidation.popupAddForm);
      const popupAvatarFormValidator = new FormValidator(parametersValidation, parametersValidation.popupAvatarForm);


      // Форма профиля + константы
      const avatarEditLayer = document.querySelector('.profile__overlay');
      const avatarUser = document.querySelector('.profile__avatar');
      const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
      const nameInput = document.querySelector('.popup__form-item_type_name-input'); 
      const jobInput = document.querySelector('.popup__form-item_type_job-input');

      const userInfo = new UserInfo({ nameProfile:'.profile__name', jobProfile: '.profile__job' });

      // форма по данным пользователя
      const popupEditForm = new PopupWithForm({
        popupSelector: '.popup_type_edit-form',
        handleSubmitForm: (inputValues) => {
          api.renewUserInfo(inputValues)
            .then((result) => {
              userInfo.setUserInfo(result);
              popupEditForm.close();
            })
            .finally (() => {
              popupEditForm.renderLoading(false);
            })
            .catch(err => {
              alert(err);
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
              popupAvatarForm.close();
            })
            .finally (() => {
              popupAvatarForm.renderLoading(false);
            })
            .catch(err => {
              alert(err);
            })
        }
      });


      // Форма для увеличению картинок в карточках + колбэк для формы
      const zoomImage = new PopupWithImage('.popup_type_zoom-image');

      function openPopupWithImage({name,link}) {
        zoomImage.open({name,link});
      }

      // Форма с вопросом на удаление карточки
      const deleteCard = new PopupWithQuestion({
        popupSelector: '.popup_type_question',
        handleSubmitForm: ({element, id}) => {
          const deleteElement = element;
          const idElement = id;
          api.deleteCard(idElement)
              .then((result) => {
                deleteElement.remove();
                deleteCard.close();
              })
              .catch(err => {
                alert(err);
              })
        }
      });

      function openPopupWithQuestion({element, id}) {
        deleteCard.open({element, id});
      }

      // Функция по лайкам
      function likeCard({element, cardId, method}) {
        api.likeCard(cardId, method)
          .then((result) => {
            element.querySelector('.cards__like').classList.toggle('cards__like_active');
            element.querySelector('.cards__counter').textContent = result.likes.length;
          })
          .catch(err => {
            alert(err);
          })
      }


      // Форма добавления новых карточек + константы
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
                userId: userData._id}, '#card-template', openPopupWithImage, openPopupWithQuestion, likeCard);
              const cardElement = card.generateCard();
              initialCardsList.addItemPrepend(cardElement);
              popupAddForm.close();
            })
            .finally (() => {
              popupAddForm.renderLoading(false);
            })
            .catch(err => {
              alert(err);
            })
        }
      });

      // выводим карточки в прод и данные пользователя
      initialCardsList.renderItems(cards, {userId: userData._id});
      userInfo.setUserInfo(userData);
      avatarUser.src = userData.avatar;

      //активируем валидацию
      popupEditProfileValidator.enableValidation();
      popupAddFormValidator.enableValidation();
      popupAvatarFormValidator.enableValidation();

      // вешаем обработчики форм увеличения и удаления карточки
      zoomImage.setEventListeners();
      deleteCard.setEventListeners();

      // --навешиваем обработчики событий на форму добавления карточек и на кнопку открытия формы
      popupAddForm.setEventListeners();
      popupOpenButtonAddForm.addEventListener('click', () => {
        popupAddFormValidator.cleanInputErrors();
        popupAddForm.open();
      });

      // --навешиваем обработчики на формы профиля, на кнопку и иконку открытия
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

    })();
  })
  .catch(err => {
    alert(err);
  })




