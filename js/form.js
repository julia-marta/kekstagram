'use strict';

(function () {

  var Scale = {
    MIN: 25,
    MAX: 100,
    GAP: 25
  };

  var DEFAULT_IMAGE = 'img/upload-default-image.jpg';
  var IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

  var mainPage = document.querySelector('main');
  var uploadField = document.querySelector('#upload-file');
  var dialog = document.querySelector('.img-upload__overlay');
  var form = document.querySelector('.img-upload__form');
  var dialogClose = dialog.querySelector('#upload-cancel');
  var image = dialog.querySelector('.img-upload__preview img');
  var filters = dialog.querySelector('.effects');
  var decreaseControl = dialog.querySelector('.scale__control--smaller');
  var increaseControl = dialog.querySelector('.scale__control--bigger');
  var scaleLevelInput = dialog.querySelector('input[name=scale]');
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');

  var onImageLoad = function (evt) {
    var file = evt.target.files[0];
    var fileType = file.type.toLowerCase();

    var isValidType = IMAGE_TYPES.some(function (it) {
      return fileType.endsWith(it);
    });

    if (isValidType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  uploadField.addEventListener('change', onImageLoad);

  // закрытие формы и сброс всех данных

  var closeForm = function () {
    document.body.classList.remove('modal-open');
    dialog.classList.add('hidden');
    image.className = '';
    image.style.filter = '';
    image.src = DEFAULT_IMAGE;
    uploadField.value = '';
    resetScale();
    form.reset();
    window.slider.reset();
    document.removeEventListener('keydown', onFormEscPress);
  };

  var onFormEscPress = function (evt) {
    if (!evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      window.main.isEscEvent(evt, closeForm);
    }
  };

  // показ формы

  var showForm = function () {
    document.body.classList.add('modal-open');
    dialog.classList.remove('hidden');
    if (image.className === '') {
      window.slider.scale.classList.add('hidden');
    }

    dialogClose.addEventListener('click', closeForm);
    document.addEventListener('keydown', onFormEscPress);
  };

  uploadField.addEventListener('change', showForm);

  // переключение фильтров

  var onFilterToggle = function (evt) {
    image.className = '';
    image.style.filter = '';
    image.classList.add('effects__preview--' + evt.target.value);
    window.slider.reset();
  };

  filters.addEventListener('change', onFilterToggle);

  // изменение масштаба фотографии

  var decreaseLevel = function (level) {
    level = (level >= (Scale.MIN + Scale.GAP)) ? level - Scale.GAP : Scale.MIN;
    return level;
  };

  var increaseLevel = function (level) {
    level = (level <= (Scale.MAX - Scale.GAP)) ? level + Scale.GAP : Scale.MAX;
    return level;
  };

  var changeScale = function (change) {
    var scaleLevel = parseInt(scaleLevelInput.value, 10);
    scaleLevel = change(scaleLevel);
    scaleLevelInput.value = scaleLevel + '%';
    image.style.transform = 'scale(' + scaleLevel / 100 + ')';
  };

  var resetScale = function () {
    scaleLevelInput.value = Scale.MAX + '%';
    image.style.transform = 'scale(' + Scale.MAX / 100 + ')';
  };

  var onDecreaseControlClick = function () {
    changeScale(decreaseLevel);
  };

  var onIncreaseControlClick = function () {
    changeScale(increaseLevel);
  };

  decreaseControl.addEventListener('click', onDecreaseControlClick);
  increaseControl.addEventListener('click', onIncreaseControlClick);

  // добавление сообщений об успехе/ошибке

  var renderMessage = function (template) {
    var message = template.cloneNode(true);
    mainPage.appendChild(message);
    message.style.zIndex = '100';

    var closeMessage = function () {
      mainPage.removeChild(message);

      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', closeMessage);
    };

    var onMessageEscPress = function (evt) {
      window.main.isEscEvent(evt, closeMessage);
    };

    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', closeMessage);

    var closeButton = (message.classList.contains('success')) ? message.querySelector('.success__button') : message.querySelector('.error__button');

    if (closeButton) {
      closeButton.addEventListener('click', closeMessage);
    }
  };

  var onSuccess = function () {
    renderMessage(successMessage);
    closeForm();
  };

  var onError = function () {
    renderMessage(errorMessage);
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.data.post(onSuccess, onError, new FormData(form));
  };

  form.addEventListener('submit', onSubmit);

  window.form = {
    upload: uploadField,
    dialog: dialog,
    image: image,
    onError: onError
  };
})();
