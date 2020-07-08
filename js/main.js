'use strict';

(function () {
  var Key = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };

  var isEnterEvent = function (evt, action, argument) {
    if (evt.key === Key.ENTER) {
      action(argument);
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === Key.ESC) {
      action();
    }
  };

  window.main = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
