const Effects = {
  ORIGINAL: 'none',
  CHROME: 'grayscale',
  SEPIA: 'sepia',
  HEAT: 'brightness',
  MARVIN: 'invert',
  PHOBOS: 'blur',
};

const EFFECT_SETTINGS = {
  'none': {
    nameStyle: 'none',
    min: -1,
    max: 0,
    step: 0,
  },
  'chrome': {
    nameStyle: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'sepia': {
    nameStyle: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'marvin': {
    nameStyle: 'invert',
    min: 0,
    max: 100,
    step: 1,
  },
  'phobos': {
    nameStyle: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
  },
  'heat': {
    nameStyle: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
  },
};

const editorImage = document.querySelector('.img-upload__overlay');
const image = editorImage.querySelector('.img-upload__preview img');
const slider = editorImage.querySelector('.effect-level__slider');
const effectLevel = editorImage.querySelector('.effect-level__value');

const createSlider = () => {
  const noEffect = EFFECT_SETTINGS['none'];
  effectLevel.value = noEffect.max;

  noUiSlider.create(slider, {
    range: {
      min: noEffect.min,
      max: noEffect.max,
    },
    start: noEffect.max,
    step: noEffect.step,
    connect: 'lower',
  });

  slider.noUiSlider.on('update', (values, handle) => {
    const styleValue = values[handle];
    effectLevel.value = styleValue;

    const selectedInput = editorImage.querySelector('input[type="radio"]:checked');
    const settingsEffect = EFFECT_SETTINGS[selectedInput.value];

    switch (settingsEffect.nameStyle) {
      case Effects.CHROME:
      case Effects.SEPIA:
      case Effects.HEAT:
        image.style.filter = `${settingsEffect.nameStyle}(${styleValue})`;
        break;
      case Effects.MARVIN:
        image.style.filter = `${settingsEffect.nameStyle}(${styleValue}%)`;
        break;
      case Effects.PHOBOS:
        image.style.filter = `${settingsEffect.nameStyle}(${styleValue}px)`;
        break;
      default:
        image.style.filter = 'none';
    }
  });
};

const updateSliderOptions = () => {

  const selectedInput = editorImage.querySelector('input[type="radio"]:checked');
  const settingsEffect = EFFECT_SETTINGS[selectedInput.value];

  slider.noUiSlider.updateOptions({
    range: {
      min: settingsEffect.min,
      max: settingsEffect.max,
    },
    step: settingsEffect.step,
  });

  slider.noUiSlider.set(settingsEffect.max);
};

const deleteSlider = () => {
  slider.noUiSlider.destroy();
};

export {createSlider, updateSliderOptions, deleteSlider};
