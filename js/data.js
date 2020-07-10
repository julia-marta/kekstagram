'use strict';

(function () {

  var URL = {
    GET: 'https://javascript.pages.academy/kekstagram/data'
  };

  var Method = {
    GET: 'GET'
  };

  var StatusCode = {
    OK: 200
  };

  var onLoad = function (onSuccess, onError) {
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

    xhr.open(Method.GET, URL.GET);
    xhr.send();
  };

  window.data = {
    load: onLoad
  };
})();
