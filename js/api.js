const getData = (onSuccess, onError) => {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((pictures) => {
      //console.log(pictures)
      onSuccess(pictures);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body,
  },
    )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((dataForm) => {
      onSuccess();
    })
    .catch((err) => {
      onError(err);
    });
};

export {getData, sendData};
