import {arrayDescriptionPhoto} from './data.js';
import {renderPictures, showErrorMessage} from './pictures.js';
import './bigpicture.js';
import './user-modal.js';
import './validation.js';
import './edit-scale-bigpicture.js';
import './edit-effect-bigpicture.js';
import './filters.js'
import {getData} from './api.js';
import {turnOnFilter} from './filters.js';

getData(
  (pictures) => {
    console.log(pictures)
    turnOnFilter(pictures);
    renderPictures(pictures);

  },
  (err) => {
    showErrorMessage(err);
  });


