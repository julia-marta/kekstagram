'use strict';

(function () {

  var Scale = {
    MIN: 25,
    MAX: 100,
    GAP: 25
  };

  var uploadField = document.querySelector('#upload-file');
  var form = document.querySelector('.img-upload__overlay');
  var formClose = form.querySelector('#upload-cancel');
  var image = form.querySelector('.img-upload__preview img');
  var filters = form.querySelector('.effects');
  var slider = form.querySelector('.effect-level');
  var decreaseControl = form.querySelector('.scale__control--smaller');
  var increaseControl = form.querySelector('.scale__control--bigger');
  var scaleLevelInput = form.querySelector('input[name=scale]');

  // показ и закрытие формы редактирования фотографии

  var showForm = function () {
    document.body.classList.add('modal-open');
    form.classList.remove('hidden');
    if (image.className === '') {
      slider.classList.add('hidden');
    }

    var closeForm = function () {
      document.body.classList.remove('modal-open');
      form.classList.add('hidden');
      uploadField.value = '';
      document.removeEventListener('keydown', onFormEscPress);
    };

    var onFormEscPress = function (evt) {
      if (!evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
        window.main.isEscEvent(evt, closeForm);
      }
    };

    formClose.addEventListener('click', closeForm);
    document.addEventListener('keydown', onFormEscPress);
  };

  uploadField.addEventListener('change', showForm);

  // переключение фильтров

  var onFilterToggle = function (evt) {
    image.className = '';
    image.style.filter = '';
    window.slider.reset();
    image.classList.add('effects__preview--' + evt.target.value);
    if (image.className === 'effects__preview--none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
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

  var onDecreaseControlClick = function () {
    changeScale(decreaseLevel);
  };

  var onIncreaseControlClick = function () {
    changeScale(increaseLevel);
  };

  decreaseControl.addEventListener('click', onDecreaseControlClick);
  increaseControl.addEventListener('click', onIncreaseControlClick);

  window.form = {
    dialog: form,
    slider: slider,
    image: image
  };
})();
