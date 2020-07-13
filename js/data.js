'use strict';

(function () {

  var URL = {
    GET: 'https://javascript.pages.academy/kekstagram/data',
    POST: 'https://javascript.pages.academy/kekstagram'
  };

  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var StatusCode = {
    OK: 200
  };

  var onLoad = function (onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });

    if (data) {
      xhr.open(Method.POST, URL.POST);
      xhr.send(data);
    } else {
      xhr.open(Method.GET, URL.GET);
      xhr.send();
    }
  };

  window.data = {
    get: onLoad,
    post: onLoad
  };
})();
