'use strict';

(function () {
  var Filter = {
    blur: {
      MIN: 0,
      MAX: 3
    },
    brightness: {
      MIN: 1,
      MAX: 3
    }
  };

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
  var sliderToggle = slider.querySelector('.effect-level__pin');
  var sliderBar = slider.querySelector('.effect-level__line');
  var effectLevelInput = slider.querySelector('input[name=effect-level]');
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

  // добавление фильтра на фотографию

  var changeFilter = function (evt) {
    image.className = '';
    image.style.filter = '';
    effectLevelInput.value = 100 + '%';
    image.classList.add('effects__preview--' + evt.target.value);
    if (image.className === 'effects__preview--none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  };

  filters.addEventListener('change', changeFilter);

  // изменение насыщенности эффекта

  var changeEffectLevel = function () {
    var togglePosition = sliderToggle.offsetLeft + (sliderToggle.offsetWidth / 2);
    var effectLevelPercent = Math.round(togglePosition * 100 / sliderBar.offsetWidth);
    var effectLevelDecimal = (effectLevelPercent / 100).toFixed(1);
    effectLevelInput.value = effectLevelPercent + '%';

    switch (image.className) {
      case ('effects__preview--chrome'):
        image.style.filter = 'grayscale(' + effectLevelDecimal + ')';
        break;
      case ('effects__preview--sepia'):
        image.style.filter = 'sepia(' + effectLevelDecimal + ')';
        break;
      case ('effects__preview--marvin'):
        image.style.filter = 'invert(' + effectLevelPercent + '%)';
        break;
      case ('effects__preview--phobos'):
        image.style.filter = 'blur(' + effectLevelDecimal * Filter.blur.MAX + 'px)';
        break;
      case ('effects__preview--heat'):
        image.style.filter = (effectLevelDecimal * Filter.brightness.MAX <= Filter.brightness.MIN) ? 'brightness(' + Filter.brightness.MIN + ')' : 'brightness(' + effectLevelDecimal * Filter.brightness.MAX + ')';
        break;
    }
  };

  sliderToggle.addEventListener('mouseup', changeEffectLevel);

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
    dialog: form
  };
})();
