const showPopup = (status) => {
  const templatePopup = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const popup = templatePopup.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', popup);

  const onKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      popup.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };

  document.addEventListener('keydown', onKeydown);

  document.addEventListener('click',
    () => popup.remove(),
    {once: true},
  );
};

export {showPopup};
