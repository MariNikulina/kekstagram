import {arrayDescriptionPhoto} from './data.js';
const ERROR_MESSAGE_SHOW_TIME = 5000;
import {createBigPhoto} from './bigpicture.js';

//const pictures = arrayDescriptionPhoto();
const pictureItem = document.querySelector('#picture').content;
const template = pictureItem.querySelector('a');
const container = document.querySelector('.pictures');

const renderPictures = (pictures) => {
  console.log(pictures)

  document.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });

  const fragment = document.createDocumentFragment();

  pictures.forEach(({url, likes, comments, description}) => {
    const element = template.cloneNode(true);
    element.children[0].src = url;
    element.children[1].querySelector('.picture__comments').textContent = comments.length;
    element.children[1].querySelector('.picture__likes').textContent = likes;
    element.addEventListener('click', function () {
      createBigPhoto(url, likes, comments, description);
    });
    fragment.appendChild(element);
  });

  container.append(fragment);

};

const showErrorMessage = (message) => {
  const errorContainer = document.querySelector('.img-upload__error');
  const errorMessage = errorContainer.querySelector('.img-upload__text');
  errorMessage.textContent = message;
  errorContainer.classList.remove('hidden');

  setTimeout(() => {
    errorContainer.classList.add('hidden');
  }, ERROR_MESSAGE_SHOW_TIME);
};

export {renderPictures, showErrorMessage};
