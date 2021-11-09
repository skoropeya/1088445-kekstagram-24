const isUniqueElements = (array) => {
  const uniqueElements = [];
  array.forEach( (element) => {
    if (!uniqueElements.includes(element)) {
      uniqueElements.push(element);
    }
  });
  if (array.length > uniqueElements.length) {
    return false;
  }
  return true;
};

export {isUniqueElements};
