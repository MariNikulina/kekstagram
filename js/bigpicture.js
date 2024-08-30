import {createLengthArray} from "./util.js";

const bigPictureItem = document.querySelector('.big-picture');
const currentNumberComments = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const body = document.querySelector('body');

const createComments = function(startIndex, lastIndex, template, array, parent) {
  for (let i = startIndex; i < lastIndex; i++) {
    const clonedElement = template.cloneNode(true);
    const avatarOfCommentator = clonedElement.querySelector('.social__picture');
    avatarOfCommentator.src = array[i].avatar;
    avatarOfCommentator.alt = array[i].name;
    clonedElement.querySelector('.social__text').textContent = array[i].message;
    parent.append(clonedElement);
  };
};

const showComment = function (startIndex, nextIndex, comments, commentsElement, commentsBlock) {
  console.log(comments)
  if (nextIndex < comments.length) {
    currentNumberComments.textContent = `${nextIndex} из ${comments.length} комментариев`;
    createComments(startIndex, nextIndex, commentsElement, comments, commentsBlock);
  } else {
    currentNumberComments.textContent = `${comments.length} из ${comments.length} комментариев`;
    createComments(startIndex, comments.length, commentsElement, comments, commentsBlock);
    commentsLoader.classList.add('hidden');
  };
}

const createBigPhoto = function (url, likes, comments, description) {

  bigPictureItem.classList.remove('hidden');
  bigPictureItem.querySelector('.big-picture__img').children[0].src = url;
  bigPictureItem.querySelector('.likes-count').textContent = likes;
  //bigPictureItem.querySelector('.comments-count').textContent = comments.length;
  bigPictureItem.querySelector('.social__caption').textContent = description;
  const commentsBlock = bigPictureItem.querySelector('.social__comments');
  const commentsElement = commentsBlock.querySelector('.social__comment');

  const generateLengthComments = createLengthArray();
  //начальное значение в цикле для показа первых 5 или менее комментариев
  let startIndex = generateLengthComments();
  //конечное значение в цикле для показа первых 5 или менее комментариев
  let nextIndex = generateLengthComments();

  //функция отрисовки первыз 5 или менее комментариев
  showComment(startIndex, nextIndex, comments, commentsElement, commentsBlock);

  //слушатель события на кнопку "Загрузить еще"
  commentsLoader.addEventListener('click', () => {
    startIndex = nextIndex;
    nextIndex = generateLengthComments();
    showComment(startIndex, nextIndex, comments, commentsElement, commentsBlock);
  })

  bigPictureItem.querySelector('.big-picture__cancel').addEventListener('click', function () {
    let commentsList = commentsBlock.querySelectorAll('.social__comment');
    for (let i = 1; i < commentsList.length; i++) {

      commentsList[i].remove();
      commentsLoader.classList.remove('hidden');
    }

    bigPictureItem.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  /*document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');*/
  body.classList.add('modal-open');
};

export {createBigPhoto};
