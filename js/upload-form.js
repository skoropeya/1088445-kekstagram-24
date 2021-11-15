import { isUniqueElements } from './utils/unique-element.js';
import { removeClasses } from './utils/remove-classes.js';
import { checkTypeFile } from './utils/type-file.js';
import { createSlider, updateSliderOptions, deleteSlider } from './effect-level.js';
import { sendData } from './api.js';
import { show as showPopup } from './utils/show-popup.js';
import { isEscapeKey } from './utils/check-key.js';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const HASHTAG_LENGTH = 20;
const HASHTAG_COUNT = 5;
const DESCRIPTION_LENGTH = 140;
const ORIGINAL_EFFECT = 'none';

const uploadForm = document.querySelector('#upload-select-image');

const loaderFile = uploadForm.querySelector('#upload-file');
const buttonCancel = uploadForm.querySelector('#upload-cancel');

const editorImage = uploadForm.querySelector('.img-upload__overlay');
const image = editorImage.querySelector('.img-upload__preview img');
const scaleControl = editorImage.querySelector('.scale');
const textScale = editorImage.querySelector('.scale__control--value');
const effectsList = editorImage.querySelector('.effects__list');
const hashtags = editorImage.querySelector('.text__hashtags');
const description = editorImage.querySelector('.text__description');
const fieldEffectLevel = editorImage.querySelector('.effect-level');

const checkHasgtags = (hashtagsArray) => {
  let message = '';
  const isBeginsHash = hashtagsArray.every( (hashtag) => hashtag.startsWith('#'));
  if (!isBeginsHash) {
    message = `${message} Хэш-тег должен начинаться с символа #\n`;
  }

  // в регулярном выражении не учитываем количество символов и обязательное наличие решетки в начале строки,
  // для этого будут отдельные проверки, добавляющие свое сообщение об ошибке
  const regEx = /^#?[a-z0-9а-я]+$/ui;
  const isMatchRegEx = hashtagsArray.every( (hashtag) => regEx.test(hashtag));
  if (!isMatchRegEx) {
    message = `${message} Строка после решётки должна состоять только из букв и чисел\n`;
  }

  const isNotOnlyHash = hashtagsArray.every( (hashtag) => hashtag !== '#');
  if (!isNotOnlyHash) {
    message = `${message} Хеш-тег не может состоять только из одной решётки\n`;
  }

  const isShortHash = hashtagsArray.every( (hashtag) => hashtag.length <= HASHTAG_LENGTH);
  if (!isShortHash) {
    message = `${message} Максимальная длина одного хэш-тега 20 символов\n`;
  }

  if (!isUniqueElements(hashtagsArray)) {
    message = `${message} Один и тот же хэш-тег не может быть использован дважды\n`;
  }

  if (hashtagsArray.length > HASHTAG_COUNT) {
    message = `${message} Нельзя указать больше пяти хэш-тегов\n`;
  }

  return message;
};

const checkActiveElement = (element) => element === hashtags || element === description;

const onScaleControlClick = (evt) => {
  let valueScale = Number(textScale.value.slice(0, -1));

  if (evt.target.matches('.scale__control--smaller')) {
    if (valueScale > SCALE_MIN && (valueScale - SCALE_STEP) >= SCALE_MIN) {
      valueScale = valueScale - SCALE_STEP;
    }
  }

  if (evt.target.matches('.scale__control--bigger')) {
    if (valueScale < SCALE_MAX && (valueScale + SCALE_STEP) <= SCALE_MAX) {
      valueScale = valueScale + SCALE_STEP;
    }
  }

  image.style.transform = `scale(${valueScale/100})`;
  textScale.value = `${valueScale}%`;
};

const onEffectsChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    removeClasses(image);
    updateSliderOptions();
    if (evt.target.value !== ORIGINAL_EFFECT) {
      image.classList.add(`effects__preview--${evt.target.value}`);
      fieldEffectLevel.classList.remove('hidden');
    } else {
      fieldEffectLevel.classList.add('hidden');
    }
  }
};

const onHashtagsInput = () => {
  const text = hashtags.value.trim().toLowerCase();
  const hashtagsArray = text.split(' ');

  const message = checkHasgtags(hashtagsArray);
  hashtags.setCustomValidity(message);
  description.reportValidity();
};

const onDescriptionInput = () => {
  const valueLength = description.value.length;
  let message = '';
  if (valueLength > DESCRIPTION_LENGTH) {
    message = `Удалите лишние ${ valueLength - DESCRIPTION_LENGTH } симв.`;
  }
  description.setCustomValidity(message);
  description.reportValidity();
};

const clearUploadForm = () => {
  loaderFile.value = '';
  removeClasses(image);
  textScale.value = `${SCALE_MAX}%`;
  image.style.transform = 'scale(1)';
  hashtags.value = '';
  description.value = '';
};

const closeUploadForm = () => {
  editorImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  deleteSlider();
  clearUploadForm();

  effectsList.removeEventListener('change', onEffectsChange);
  scaleControl.removeEventListener('click', onScaleControlClick);
  hashtags.removeEventListener('input', onHashtagsInput);
  description.removeEventListener('input', onDescriptionInput);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      uploadForm.removeEventListener('submit', onUploadFormSubmit);
      closeUploadForm();
      showPopup('success');
    },

    () => {
      uploadForm.removeEventListener('submit', onUploadFormSubmit);
      closeUploadForm();
      showPopup('error');
    },

    new FormData(evt.target),
  );
};

const openUploadForm = () => {
  editorImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  createSlider();
  fieldEffectLevel.classList.add('hidden');

  const onKeydown = (evt) => {
    if (isEscapeKey && !checkActiveElement(document.activeElement)) {
      evt.preventDefault();
      closeUploadForm();
      document.removeEventListener('keydown', onKeydown);
    }
  };

  buttonCancel.addEventListener('click',
    () => closeUploadForm(),
    {once: true},
  );

  document.addEventListener('keydown', onKeydown);
  effectsList.addEventListener('change', onEffectsChange);
  scaleControl.addEventListener('click', onScaleControlClick);
  hashtags.addEventListener('input', onHashtagsInput);
  description.addEventListener('input', onDescriptionInput);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

const onLoaderFileChange = () => {
  const file = loaderFile.files[0];
  if (checkTypeFile(file)) {
    image.src = URL.createObjectURL(file);
  }
  openUploadForm();
};

export {onLoaderFileChange};
