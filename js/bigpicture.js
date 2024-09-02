const bigPictureItem = document.querySelector('.big-picture');
const currentNumberComments = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const body = document.querySelector('body');

//индекс для отображения нужного количества комментариев
let startIndex = 0;

const createComments = function(firstIndex, secondIndex, template, array, parent) {
  for (let i = firstIndex; i < secondIndex; i++) {
    const clonedElement = template.cloneNode(true);
    const avatarOfCommentator = clonedElement.querySelector('.social__picture');
    avatarOfCommentator.src = array[i].avatar;
    avatarOfCommentator.alt = array[i].name;
    clonedElement.querySelector('.social__text').textContent = array[i].message;
    parent.append(clonedElement);
  }
};

const showComment = function (startIndex, nextIndex, comments, commentsElement, commentsBlock) {
  if (nextIndex < comments.length) {
    currentNumberComments.textContent = `${nextIndex} из ${comments.length} комментариев`;
    createComments(startIndex, nextIndex, commentsElement, comments, commentsBlock);
  } else {
    currentNumberComments.textContent = `${comments.length} из ${comments.length} комментариев`;
    createComments(startIndex, comments.length, commentsElement, comments, commentsBlock);
    commentsLoader.classList.add('hidden');
    startIndex = 0;
  }
};

const createBigPhoto = function (url, likes, comments, description) {

  bigPictureItem.classList.remove('hidden');
  bigPictureItem.querySelector('.big-picture__img').children[0].src = url;
  bigPictureItem.querySelector('.likes-count').textContent = likes;
  bigPictureItem.querySelector('.social__caption').textContent = description;
  const commentsBlock = bigPictureItem.querySelector('.social__comments');
  const templateComments = document.querySelector('#comments').content;
  const commentsElement = templateComments.querySelector('.social__comment');

  //начальное значение в цикле для показа первых 5 или менее комментариев
  startIndex = 0;
  //конечное значение в цикле для показа первых 5 или менее комментариев
  let nextIndex = startIndex+5;

  //функция отрисовки первыз 5 или менее комментариев
  showComment(startIndex, nextIndex, comments, commentsElement, commentsBlock);

  const loadComments = () => {
    startIndex = nextIndex;
    nextIndex = startIndex+5;
    showComment(startIndex, nextIndex, comments, commentsElement, commentsBlock);
  };

  const clickCloseHandler = (evt) => {
    loadComments();
  };

  //слушатель события на кнопку "Загрузить еще"
  commentsLoader.addEventListener('click', clickCloseHandler);

  bigPictureItem.querySelector('.big-picture__cancel').addEventListener('click', () => {
    const commentsList = commentsBlock.querySelectorAll('.social__comment');

    for (let i = 0; i < commentsList.length; i++) {

      commentsList[i].remove();
      commentsLoader.classList.remove('hidden');
    }

    bigPictureItem.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', clickCloseHandler);
  });

  body.classList.add('modal-open');
};

export {createBigPhoto};
