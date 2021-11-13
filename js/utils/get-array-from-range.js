import {getRandomPositiveInteger} from './get-random-positive-integer.js';

const makeArrayFromRange = (min, max, count) => {
  if (count > max) {
    count = max;
  }

  const values = [];

  return function () {
    for (let i=0; i<count; i++) {
      let currentValue = getRandomPositiveInteger(min, max);

      while (values.includes(currentValue)) {
        currentValue = getRandomPositiveInteger(min, max);
      }
      values.push(currentValue);
    }

    return values;
  };
};

export {makeArrayFromRange};
