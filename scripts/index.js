// Проверяем, что подключили скрипт и он работает
console.log('Привет, Мир!');

// Делаем выборку DOM элементов и пишем конст, т.к. переменные не будут меняться
let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');

// Находим форму в DOM, поля формы и поля, куда вставляем... для формы отправки
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
let nameInput = formElement.querySelector('.popup__form-item_js_name-input'); 
let jobInput = formElement.querySelector('.popup__form-item_js_job-input');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

// Функция по доабвлению класса (на основе вебинара)
let popupToggle = (event) => {
  popup.classList.toggle('popup_opened');  
}

// Функция по взятию значений профаила в инпут
let popupGetInfo = (event) => {
  getName = nameProfile.textContent;
  getJob = jobProfile.textContent;
  nameInput.value = getName;
  jobInput.value = getJob;
}

// Регистрируем обработчики событий по клику (на основе вебинара)
popupOpenButton.addEventListener('click', popupToggle, false);
popupCloseButton.addEventListener('click', popupToggle, false);
popupOpenButton.addEventListener('click', popupGetInfo, false);

// Этап 2 форма отправки (Если код не работает, то м.б. не тот тип input &FTS)

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

	// Получите значение полей из свойства value (непонятно зачем, но вотъ)
  getName = nameInput.value;
  getJob = jobInput.value;
  
  // Вставьте новые значения с помощью textContent (почему не innerHTML ???)  
  nameProfile.textContent = getName;
  jobProfile.textContent = getJob;
  
  popupToggle();  
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);




