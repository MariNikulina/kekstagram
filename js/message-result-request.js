import {onPopupEscKeyDown} from './user-modal.js';

const body = document.querySelector('body');

//создать разметку сообщения и загрузить
function createMessage (selector) {
  const templateSuccessMessage = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`);
  const element = templateSuccessMessage.cloneNode(true);
  element.classList.add('hidden');
  body.appendChild(element);
};

//создать разметку сообщения об успешной отправке
createMessage('success');
const successMessage = document.querySelector('.success');
const successMessageCloseElement = successMessage.querySelector('.success__button');

//показать сообщение о результате отправки формы
function showMessage (element, close) {
  element.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeyDown(close));
};

//скрыть сообщение об успешной отправке
function closeSuccessMessage () {
  successMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeyDown(closeSuccessMessage));
};

//установить слушатель на кнопку закрытия сообщения об успешной отправки формы
successMessageCloseElement.addEventListener('click', () => {
  closeSuccessMessage();
});

//установить слушатель на оверлей для закрытия сообщения об успешной отправки формы
successMessage.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closeSuccessMessage();
  }
});

//создать разметку сообщения об ошибки отправки формы
createMessage('error');
const errorMessage = document.querySelector('.error');
const errorMessageCloseElement = errorMessage.querySelector('.error__button');

//скрыть сообщение об ошибки отправки
function closeErrorMessage () {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeyDown(closeErrorMessage));
}

//установить слушатель на кнопку закрытия сообщения об ошибке отправки формы
errorMessageCloseElement.addEventListener('click', (evt) => {
  closeErrorMessage();
});

//установить слушатель на оверлей для закрытия сообщения об ошибки отправки формы
errorMessage.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closeErrorMessage();
  }
});

export {showMessage, successMessage, closeSuccessMessage, errorMessage, closeErrorMessage};
