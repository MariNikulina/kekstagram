import {createRandomId} from './util.js';
import {renderPictures} from './pictures.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;
const debouncedRenderPictures = debounce(renderPictures, RERENDER_DELAY);

const filters = document.querySelector('.img-filters');

const filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = '';
let pictures = [];


function turnOnFilter (loadedPictures) {
  filters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = filter.DEFAULT;
}

function choseRandomPictures (elements) {
  const result = [];

  while (result.length < 10) {
    const index = createRandomId(0, 24);
    result.push(elements[index()]);
    //result = result.filter((v, i, arr) =>  arr.indexOf(v) === i);
  }
  return result;
}

function compareDiscussedPictures (pictureA, pictureB) {
  return pictureB.comments.length - pictureA.comments.length;
}

function filterPictures () {
  switch (currentFilter) {
    case filter.RANDOM:
      return [...choseRandomPictures(pictures)];
    case filter.DISCUSSED:
      return [...pictures].slice().sort(compareDiscussedPictures);
    default:
      return [...pictures];
  }
}

filters.addEventListener('click', (evt) => {
  console.log(pictures);
  const currentElement = evt.target;
  if (!currentElement.classList.contains('img-filters__button') || currentElement.classList.contains('img-filters__button--active')) {
    return;
  }

  filters
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  currentElement.classList.add('img-filters__button--active');
  currentFilter = currentElement.id;

  debouncedRenderPictures(filterPictures());
});

export {turnOnFilter};
