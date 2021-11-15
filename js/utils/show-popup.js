import { isEscapeKey } from './check-key.js';

const showPopup = (status) => {
  const templatePopup = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const popup = templatePopup.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', popup);

  const button = popup.querySelector('button[type="button"]');

  const onKeydown = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      popup.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  const onDocumentClick = (evt) => {
    if (!evt.target.matches(`.${status} *`)) {
      popup.remove();
      document.removeEventListener('click', onDocumentClick);
    }
  };
  document.addEventListener('click', onDocumentClick);

  button.addEventListener('click',
    () => popup.remove(),
    {once: true},
  );
};

export {showPopup};
