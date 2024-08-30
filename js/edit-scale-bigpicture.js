const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview');

function getScaleValue () {
  return parseInt(scaleControlValue.value.slice(0, -1));
};

function checkScaleControlValue (min, max, button) {
  if (getScaleValue() <= min || getScaleValue() >= max) {
    button.disabled = true;
  }
};

function isButtonActive (button) {
  if (button.disabled) {
    button.disabled = false;
  };
};

function changeScale (step) {
  scaleControlValue.value = `${getScaleValue() + step}%`;
  image.children[0].style.transform = `scale(${(getScaleValue()) / 100})`;
}

checkScaleControlValue(50, 100, scaleControlBigger);

scaleControlSmaller.addEventListener('click', () => {
  isButtonActive(scaleControlBigger);
  checkScaleControlValue(50, 101, scaleControlSmaller);
  changeScale(-25);
});

scaleControlBigger.addEventListener('click', () => {
  isButtonActive(scaleControlSmaller);
  checkScaleControlValue(24, 75, scaleControlBigger);
  changeScale(25);
});
