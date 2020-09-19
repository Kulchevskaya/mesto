// Проверяем, что подключили скрипт и он работает
console.log('Привет, Мир!');

// Делаем выборку DOM элементов для всего и вся
let popup = document.querySelectorAll('.popup')[0];
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelectorAll('.popup__close-button')[0];
let popupAddForm = document.querySelectorAll('.popup')[1];
let popupOpenButtonAddForm = document.querySelector('.profile__add-button');
let popupCloseButtonAddForm = document.querySelectorAll('.popup__close-button')[1]; 
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-item_js_name-input'); 
let jobInput = formElement.querySelector('.popup__form-item_js_job-input');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

let cardTemplate = document.querySelector('#card-template').content;
let cardsContainer = document.querySelector('.cards');
let formAddElement = document.querySelectorAll('.popup__form')[1];
let titleInput = document.querySelector('.popup__form-item_js_place-title-input');
let imageUrlInput = document.querySelector('.popup__form-item_js_image-url-input');

let imagePopup = document.querySelectorAll('.popup')[2];
let imagePopupCloseButton = document.querySelectorAll('.popup__close-button')[2];
let imagePopupUrl = document.querySelector('.popup__image');
let imagePopupCaption = document.querySelector('.popup__caption');



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

// Функция по доабвлению класса для попапов
let popupToggle = (event) => {
  popup.classList.toggle('popup_opened');  
}
let popupAddFormToggle = (event) => {
  popupAddForm.classList.toggle('popup_opened');  
}

let imagePopupToggle = (event) => {
  imagePopup.classList.toggle('popup_opened'); 
}

// Функция по взятию значений профаила в инпут попапа
let popupGetInfo = (event) => {
  getName = nameProfile.textContent;
  getJob = jobProfile.textContent;
  nameInput.value = getName;
  jobInput.value = getJob;
}

// Регистрируем обработчики событий по клику
popupOpenButton.addEventListener('click', popupToggle, false);
popupCloseButton.addEventListener('click', popupToggle, false);
popupOpenButton.addEventListener('click', popupGetInfo, false);
popupOpenButtonAddForm.addEventListener('click', popupAddFormToggle, false);
popupCloseButtonAddForm.addEventListener('click', popupAddFormToggle, false);
imagePopupCloseButton.addEventListener('click', imagePopupToggle, false);


// Этап 2 форма отправки (Если код не работает, то м.б. не тот тип input &FTS)
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.
  getName = nameInput.value;
  getJob = jobInput.value;
  nameProfile.textContent = getName;
  jobProfile.textContent = getJob;
  popupToggle();  
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Этап 3 - Спринт 5
// Функции по выводу карточек из массива
function render() {
	// reset();
  initialCards.forEach(renderCards);
  
	setCardsListeners()
}

function renderCards({name, link}) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.cards__image').alt = name;
  cardElement.querySelector('.cards__image').src = link;
  cardElement.querySelector('.cards__text').textContent = name;
  cardsContainer.appendChild(cardElement);
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
  cardsContainer.prepend(cardElement);
  setCardsListeners();

  popupAddFormToggle();
  titleInput.value = '';
  imageUrlInput.value = '';
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', formAddSubmitHandler);

// Функция по удалению карточки
let cardDelete = (evt) => {
	const eventTarget = evt.target;
  eventTarget.closest('.cards__item').remove();
}

// Функция по лайкам карточки
let cardLike = (evt) => {
	const eventTarget = evt.target;
  eventTarget.classList.toggle('cards__like_active');
}

// Функция по добавлению обработчика для карточек (лайк, удалить)
function setCardsListeners() {  
  document.querySelectorAll('.cards__like').forEach((btn) => {
    btn.addEventListener('click', cardLike, false)  
  });
  document.querySelectorAll('.cards__delete').forEach((btn) => {
    btn.addEventListener('click', cardDelete, false)    
  });
  document.querySelectorAll('.cards__image').forEach((item) => {
    item.addEventListener('click', imageZoom, false)
  });
  document.querySelectorAll('.cards__image').forEach((item) => {
    item.addEventListener('click', imagePopupToggle, false)
  });

}

// Функция по увеличению карточек
let imageZoom = (evt) => {
  const eventTarget = evt.target;
  imagePopupUrl.src = eventTarget.src
  imagePopupCaption.textContent = eventTarget.alt
}

render()



