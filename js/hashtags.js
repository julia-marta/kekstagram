'use strict';

(function () {
  var HASHTAG_LENGTH = 20;
  var MAX_HASTAGS = 5;

  var ValidateError = {
    NO_HASH: 'Хэш-тег должен начинаться с символа #',
    BAD_SYMBOLS: 'Хэш-тег должен состоять из букв и чисел и не может содержать спецсимволы',
    ONLY_HASH: 'Хеш-тег не может состоять только из одной решётки',
    TOO_LONG: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
    NO_SPACES: 'Хэш-теги должны разделяться пробелами',
    REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    TOO_MUCH: 'Нельзя указать больше пяти хэш-тегов'
  };

  var hashtagsInput = window.form.dialog.querySelector('.text__hashtags');

  var checkHashtags = function () {
    var validSymbols = /^#[a-zA-Zа-яА-Я0-9]*$/;
    var invalidMessages = [];
    var inputText = hashtagsInput.value.toLowerCase().trim();
    if (!inputText) {
      return;
    }
    var hashtagsArray = inputText.split(/\s+/);
    if (hashtagsArray.length === 0) {
      return;
    }

    var isNotHashFirst = hashtagsArray.some(function (item) {
      return item[0] !== '#';
    });
    if (isNotHashFirst) {
      invalidMessages.push(ValidateError.NO_HASH);
    }

    var isNotValidSymbols = hashtagsArray.some(function (item) {
      return validSymbols.test(item) !== true;
    });
    if (isNotValidSymbols) {
      invalidMessages.push(ValidateError.BAD_SYMBOLS);
    }

    var isOnlyHashContains = hashtagsArray.some(function (item) {
      return item === '#';
    });
    if (isOnlyHashContains) {
      invalidMessages.push(ValidateError.ONLY_HASH);
    }

    var isTooLong = hashtagsArray.some(function (item) {
      return item.length > HASHTAG_LENGTH;
    });
    if (isTooLong) {
      invalidMessages.push(ValidateError.TOO_LONG);
    }

    var isNoSpaces = hashtagsArray.some(function (item) {
      return item.indexOf('#', 1) >= 1;
    });
    if (isNoSpaces) {
      invalidMessages.push(ValidateError.NO_SPACES);
    }

    var isHashtagRepeats = hashtagsArray.some(function (item, i, arr) {
      return arr.indexOf(item, i + 1) >= i + 1;
    });
    if (isHashtagRepeats) {
      invalidMessages.push(ValidateError.REPEAT);
    }

    if (hashtagsArray.length > MAX_HASTAGS) {
      invalidMessages.push(ValidateError.TOO_MUCH);
    }

    var errorsList = invalidMessages.join('. \n');
    hashtagsInput.setCustomValidity(errorsList);

    if (hashtagsInput.validationMessage) {
      hashtagsInput.style.outline = '2px solid red';
    } else {
      hashtagsInput.style.outline = '';
    }
  };

  hashtagsInput.addEventListener('input', checkHashtags);
})();
