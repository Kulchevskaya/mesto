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

export { closePopup, openPopup };


