const getData = (onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Данные с сервера не загружены.');
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
