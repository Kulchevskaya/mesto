// Выборка элементов для формы редактирования
const popup = document.querySelector('.popup_js_edit-form');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-item_js_name-input'); 
const jobInput = formElement.querySelector('.popup__form-item_js_job-input');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Выборка элементов для формы добавления
const popupAddForm = document.querySelector('.popup_js_add-form');
const popupOpenButtonAddForm = document.querySelector('.profile__add-button');
const popupCloseButtonAddForm = popupAddForm.querySelector('.popup__close-button');

const formAddElement = popupAddForm.querySelector('.popup__form_js_add-form');
const titleInput = popupAddForm.querySelector('.popup__form-item_js_place-title-input');
const imageUrlInput = popupAddForm.querySelector('.popup__form-item_js_image-url-input');

// Выборка элементов template карточек
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

// Выборка элементов для попап увеличения картинок
const imagePopup = document.querySelector('.popup_js_zoom-image');
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

// Регистрируем обработчики событий по попапам
popupOpenButton.addEventListener('click', () => {togglePopup(popup)});
popupCloseButton.addEventListener('click', () => {togglePopup(popup)});
popupOpenButton.addEventListener('click', getUserInfo, false);
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
  togglePopup(popup);  
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
  imagePopupUrl.src = eventTarget.src
  imagePopupCaption.textContent = eventTarget.alt
  togglePopup(imagePopup)
}

// Функция по добавлению обработчика для карточек (лайк, удалить)
function setCardListeners(element) {  
  element.querySelector('.cards__like').addEventListener('click', likeCard);  
  element.querySelector('.cards__delete').addEventListener('click', deleteCard);  
  element.querySelector('.cards__image').addEventListener('click', zoomImage);
}

function createCard({name, link}) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.cards__image').alt = name;
  cardElement.querySelector('.cards__image').src = link;
  cardElement.querySelector('.cards__text').textContent = name;
  setCardListeners(cardElement);
  cardsContainer.appendChild(cardElement);
}

// Функции по выводу карточек из массива
function renderInitialCards(array) {
	array.forEach(createCard);
}

// Функция по добавлению карточки
function formAddSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.
  
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.cards__image').alt = titleInput.value;
  cardElement.querySelector('.cards__image').src = imageUrlInput.value;
  cardElement.querySelector('.cards__text').textContent = titleInput.value;
  setCardListeners(cardElement);
  cardsContainer.prepend(cardElement);

  togglePopup(popupAddForm);
  titleInput.value = '';
  imageUrlInput.value = '';
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', formAddSubmitHandler);


renderInitialCards(initialCards);



