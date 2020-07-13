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

  var ToggleCoord = {
    MIN: 0,
    MAX: 453
  };

  var slider = window.form.dialog.querySelector('.effect-level');
  var sliderToggle = slider.querySelector('.effect-level__pin');
  var sliderBar = slider.querySelector('.effect-level__line');
  var sliderScale = slider.querySelector('.effect-level__depth');
  var effectLevelInput = slider.querySelector('input[name=effect-level]');

  var setEffectLevel = function (togglePosition) {
    var effectLevelPercent = Math.round(togglePosition * 100 / sliderBar.offsetWidth);
    var effectLevelDecimal = (effectLevelPercent / 100).toFixed(1);
    var toggleHalfPercent = Math.round(sliderToggle.offsetWidth / 2 * 100 / sliderBar.offsetWidth);
    sliderScale.style.width = effectLevelPercent + toggleHalfPercent + '%';
    effectLevelInput.value = effectLevelPercent;

    switch (window.form.image.className) {
      case ('effects__preview--chrome'):
        window.form.image.style.filter = 'grayscale(' + effectLevelDecimal + ')';
        break;
      case ('effects__preview--sepia'):
        window.form.image.style.filter = 'sepia(' + effectLevelDecimal + ')';
        break;
      case ('effects__preview--marvin'):
        window.form.image.style.filter = 'invert(' + effectLevelPercent + '%)';
        break;
      case ('effects__preview--phobos'):
        window.form.image.style.filter = 'blur(' + effectLevelDecimal * Filter.blur.MAX + 'px)';
        break;
      case ('effects__preview--heat'):
        window.form.image.style.filter = (effectLevelDecimal * Filter.brightness.MAX <= Filter.brightness.MIN) ? 'brightness(' + Filter.brightness.MIN + ')' : 'brightness(' + effectLevelDecimal * Filter.brightness.MAX + ')';
        break;
    }
  };

  var resetEffectLevel = function () {
    sliderToggle.style.left = ToggleCoord.MAX + 'px';
    sliderScale.style.width = 100 + '%';
    effectLevelInput.value = 100;
    if (window.form.image.className === 'effects__preview--none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  };

  var onToggleMouseDown = function (evt) {
    evt.preventDefault();
    var startCoord = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;

      var toggleCoord = sliderToggle.offsetLeft - shift;

      if (toggleCoord >= ToggleCoord.MIN && toggleCoord <= ToggleCoord.MAX) {
        sliderToggle.style.left = toggleCoord + 'px';
      }

      var togglePosition = toggleCoord - (sliderToggle.offsetWidth / 2);
      setEffectLevel(togglePosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  sliderToggle.addEventListener('mousedown', onToggleMouseDown);

  window.slider = {
    scale: slider,
    reset: resetEffectLevel
  };
})();
