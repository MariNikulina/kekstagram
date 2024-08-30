import {validateForm} from './validation.js';
import {sendData} from './api.js';
import {showMessage, successMessage, closeSuccessMessage, errorMessage, closeErrorMessage} from './message-result-request.js';
import {downloadNewPicture} from './download-picture.js';

const userModalOpenEditingPhoto = document.querySelector('.img-upload__label');
const imageUploadInput = document.querySelector('#upload-file');
const userModalElement = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const userModalCloseElement = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const scaleValue = document.querySelector('.scale__control--value');
const effectValue = document.querySelector('.effect-level__value');
const image = document.querySelector('.img-upload__preview');
const hashtags = form.querySelector('.text__hashtags');
const comments = form.querySelector('.text__description');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const radioInputs = document.querySelectorAll('.effects__radio');

function onPopupEscKeyDown (closeModal) {
  return (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  };
}

const onDeleteEscListener = () => {
  document.removeEventListener('keydown', onPopupEscKeyDown(closeUserModal));
};

const onHangEscListener = () => {
  document.addEventListener('keydown', onPopupEscKeyDown(closeUserModal));
};

function openUserModal () {
  userModalElement.classList.remove('hidden');
  body.classList.add('modal-open');

  hashtags.addEventListener('focus', onDeleteEscListener);

  hashtags.addEventListener('blur', onHangEscListener);

  document.addEventListener('keydown', onPopupEscKeyDown(closeUserModal));

  imageUploadInput.addEventListener('change', () => {
    downloadNewPicture();
  });
}

function closeUserModal () {
  userModalElement.classList.add('hidden');
  body.classList.remove('modal-open');
  imageUploadInput.value = '';
  scaleValue.value = '100%';
  image.children[0].style.transform = 'scale(1)';
  image.children[0].className = '';
  effectValue.value = '';
  hashtags.value = '';
  comments.value = '';
  sliderContainer.style.display = 'none';
  radioInputs[0].checked = true;
  image.children[0].style.filter = '';
  document.removeEventListener('keydown', onPopupEscKeyDown(closeUserModal));
}

userModalOpenEditingPhoto.addEventListener('click', () => {
  openUserModal();
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    sendData(
      () => {
        showMessage(successMessage, closeSuccessMessage);
        closeUserModal();
      },
      () => {
        showMessage(errorMessage, closeErrorMessage);
        closeUserModal();
      },
      new FormData(evt.target),
    );
  }
});

export {onPopupEscKeyDown};


