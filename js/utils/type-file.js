const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const checkTypeFile = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some( (typeFile) => fileName.endsWith(typeFile));
};

export {checkTypeFile};
