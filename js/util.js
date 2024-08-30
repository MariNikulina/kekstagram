let previousValues = [];

const getrandomInteger = function (min, max) {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

//проверить длину строки
const checkStringLength = function (string, maxLength) {
  return (string.length <= maxLength) ? true : false;
}

const createIdGenerator =  function () {
  let lastGeneratedId = null;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomElement = function (element) {
  return element[getrandomInteger(0, element.length - 1)];
};

const createRandomId = function (min, max) {
  return function () {
    let randomNumber = getrandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      previousValues = [];
    }
    while (previousValues.includes(randomNumber)) {
      randomNumber = getrandomInteger(min, max);
    }
    previousValues.push(randomNumber);
    return randomNumber;
  };
};

const createLengthArray = function () {
  let previousValue = -5;
  return function () {
    previousValue += 5;
    return previousValue;
  };
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getrandomInteger, checkStringLength, createIdGenerator, createRandomId, getRandomElement, createLengthArray, debounce};
