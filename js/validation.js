import {checkStringLength} from './util.js';

const userModalElement = document.querySelector('.img-upload__overlay');
const re = /^#[А-Яа-яA-Za-zЁё0-9]{1,19}$/;
const hashtags = userModalElement.querySelector('.text__hashtags');

const comments = userModalElement.querySelector('.text__description');

const pristine = new Pristine(userModalElement);

//перевести в строчные toLowerCase()
//уникальность
//не больше 5

function checkUniqueHashtags () {
  const hashtagsArray = hashtags.value.split(' ');

  hashtagsArray.forEach((hashtag, ind) => {
    hashtagsArray[ind].toLowerCase();
  });

  const result = hashtagsArray.reduce((acc, item) => {
    if (acc.includes(item)) {
      return false;
    }
    return true;
  }, []);
  return result;
}

function validateHashtag () {

  const hashtagsArray = hashtags.value.split(' ');
  for (let i = 1; i < hashtagsArray.length; i++) {
    if (!re.test(hashtagsArray[i])) {
      console.log(false);
      return false;
    }
  }
  return hashtagsArray.length <= 5 && checkUniqueHashtags();
}

function validateComments () {
  return checkStringLength(comments.textContent, 140);
}

pristine.addValidator(
  hashtags,
  validateHashtag
);

pristine.addValidator(
  comments,
  validateComments
);


function validateForm () {
  return pristine.validate();
}

export {validateForm};
