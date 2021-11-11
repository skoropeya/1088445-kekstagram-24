const editorImage = document.querySelector('.img-upload__overlay');
const image = editorImage.querySelector('.img-upload__preview img');
const slider = editorImage.querySelector('.effect-level__slider');
const effectLevel = editorImage.querySelector('.effect-level__value');

const EFFECT_SETTINGS = {
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


const createSlider = (effect) => {
  const nameEffect = EFFECT_SETTINGS[effect];
  effectLevel.value = nameEffect.max;

  noUiSlider.create(slider, {
    range: {
      min: nameEffect.min,
      max: nameEffect.max,
    },
    start: nameEffect.max,
    step: nameEffect.step,
    connect: 'lower',
  });

  slider.noUiSlider.on('update', (values, handle) => {
    const styleValue = values[handle];
    effectLevel.value = styleValue;

    if (nameEffect.nameStyle === 'invert') {
      image.style.filter = `${nameEffect.nameStyle}(${styleValue}%)`;
    } else if (nameEffect.nameStyle === 'blur') {
      image.style.filter = `${nameEffect.nameStyle}(${styleValue}px)`;
    } else {
      image.style.filter = `${nameEffect.nameStyle}(${styleValue})`;
    }
  });

};

const updateSliderOptions = (effect) => {
  const nameEffect = EFFECT_SETTINGS[effect];

  slider.noUiSlider.updateOptions({
    range: {
      min: nameEffect.min,
      max: nameEffect.max,
    },
    step: nameEffect.step,
  });

  slider.noUiSlider.set(nameEffect.max);
};

const deleteSlider = () => {
  slider.noUiSlider.destroy();
};

export {createSlider, updateSliderOptions, deleteSlider};
