// Проверяем, что подключили скрипт и он работает
console.log('Привет, Мир!');

// Делаем выборку DOM элементов и пишем конст, т.к. переменные не будут меняться
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');

// Функция по доабвлению класса (на основе вебинара)
const popupToggle = (event) => {
  popup.classList.toggle('popup_opened');  
}

// Регистрируем обработчики событий по клику (на основе вебинара)
popupOpenButton.addEventListener('click', popupToggle, false);
popupCloseButton.addEventListener('click', popupToggle, false);

// Этап 2 форма отправки (Если код не работает, то м.б. не тот тип input &FTS)

// Находим форму в DOM, поля формы и поля, куда вставляем...
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
const nameInput = formElement.querySelector('.js-popup__name-input'); 
const jobInput = formElement.querySelector('.js-popup__job-input');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

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




