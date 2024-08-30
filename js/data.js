import {getrandomInteger, createIdGenerator, createRandomId, getRandomElement} from './util.js';

const countComments = getrandomInteger(1, 8);
const randomAvatar = getrandomInteger(1, 6);

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const DESCRIPTION = [
  'Интересное',
  'Фантастическое',
  'Креативное',
  'Смешное',
  'Доброе',
  'Милое',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generatePhotoId = createIdGenerator();
const generateUrlPhoto = createIdGenerator();
const generateCommentId = createRandomId(10, 1000);

const getCommentsPhoto = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getrandomInteger(1, 6)}.svg`,
    message: getRandomElement(MESSAGE),
    name: getRandomElement(NAMES),
  };
};

const getDescriptionPhoto = function () {
  return {
    id: generatePhotoId(),
    url: `photos/${generateUrlPhoto()}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getrandomInteger(15, 200),
    comments: Array.from({length: getrandomInteger(1, 8)}, getCommentsPhoto),
  };
};

const arrayDescriptionPhoto = () => Array.from({length: 25}, getDescriptionPhoto);

export {arrayDescriptionPhoto};
