const removeClasses = (element) => {
  const classes = element.classList;
  for (let i=0; i<classes.length; i++) {
    element.classList.remove(classes[i]);
  }
};

export {removeClasses};
