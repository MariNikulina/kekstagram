const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsItems = Array.from(document.querySelectorAll('.effects__item'));
const image = document.querySelector('.img-upload__preview');
const valueElement = document.querySelector('.effect-level__value');

const options = [
  {
    className: 'chrome',
    style: 'grayscale',
    units: false,
    optionsNoUiSlider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
  {
    className: 'sepia',
    style: 'sepia',
    units: false,
    optionsNoUiSlider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
  {
    className: 'marvin',
    style: 'invert',
    units: '%',
    optionsNoUiSlider: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
      format: {
        to: function (value) {
          return value.toFixed(0);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
  {
    className: 'phobos',
    style: 'blur',
    units: 'px',
    optionsNoUiSlider: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
  {
    className: 'heat',
    style: 'brightness',
    units: false,
    optionsNoUiSlider: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  }
];

noUiSlider.cssClasses.connect += ' noUiSlider';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderContainer.style.display = 'none';

let selectedOption = {};

sliderElement.noUiSlider.on('update', (...rest) => {
  valueElement.value = sliderElement.noUiSlider.get();

  //проверить наличие единиц измерения
  if (selectedOption.units) {
    image.children[0].style.filter = `${selectedOption.style}(${valueElement.value}${selectedOption.units})`;
  } else {
    image.children[0].style.filter = `${selectedOption.style}(${valueElement.value})`;
  };
});

//наложение слушателя на эффекты
effectsItems.forEach((item) => {
  item.addEventListener('click', () => {

    if (item.children[0].value === 'on') {
      sliderContainer.style.display = 'none';
      return;
    } else {
      sliderContainer.style.display = 'block';
    }

    //sliderElement.removeAttribute('disabled', true);

    //проверка наличия класса и значения в инпуте
    if (image.children[0].className) {
      image.children[0].className = '';
      valueElement.value = '';
    };

    //переопределение класса в зависимости от эффекта
    const effectClassName = `effects__preview--${item.children[0].value}`;
    image.children[0].classList.add(effectClassName);

    //найти выбранный эффект
    selectedOption = options.find((option) => {
      return option.className === item.children[0].value;
    });

    //присвоить слайдеру выбранные параметры
    sliderElement.noUiSlider.updateOptions(selectedOption.optionsNoUiSlider);

  });
});

