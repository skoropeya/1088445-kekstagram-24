const isUniqueElements = (array) => {
  const uniqueElements = [];
  array.forEach( (element) => {
    if (!uniqueElements.includes(element)) {
      uniqueElements.push(element);
    }
  });

  return (uniqueElements.length === array.length);
};

export {isUniqueElements};
