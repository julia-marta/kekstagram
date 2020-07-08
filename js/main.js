'use strict';

var PHOTOS_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MAX_COMMENTS = 5;

var DESCRIPTIONS = ['Летний чил на югах', 'Отдыхаем...', 'Как же круто тут кормят', 'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать.....', 'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр', 'Затусили с друзьями на море', 'Вот это тачка!', 'Тестим новую камеру!', 'Норм'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Степан', 'Николай', 'Харитон', 'Тимур', 'Аким'];

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var pictures = document.querySelector('.pictures');

var picturePreview = document.querySelector('.big-picture');
var picturePreviewImage = picturePreview.querySelector('.big-picture__img');
var picturePreviewComment = picturePreview.querySelector('.social__comment');
var picturePreviewClose = picturePreview.querySelector('.big-picture__cancel');

var pictureUploadField = document.querySelector('#upload-file');
var pictureEditForm = document.querySelector('.img-upload__overlay');
var pictureEditFormClose = pictureEditForm.querySelector('#upload-cancel');
var pictureEditImage = pictureEditForm.querySelector('.img-upload__preview img');
var pictureEditFilters = pictureEditForm.querySelector('.effects');
var slider = pictureEditForm.querySelector('.effect-level');
var sliderToggle = slider.querySelector('.effect-level__pin');
var sliderBar = slider.querySelector('.effect-level__line');
var effectLevelInput = slider.querySelector('input[name=effect-level]');
var decreaseControl = pictureEditForm.querySelector('.scale__control--smaller');
var increaseControl = pictureEditForm.querySelector('.scale__control--bigger');
var scaleLevelInput = pictureEditForm.querySelector('.scale__control--value');
var hashtagsInput = pictureEditForm.querySelector('.text__hashtags');

var HASHTAG_LENGTH = 20;
var MAX_HASTAGS = 5;

var Key = {
  ENTER: 'Enter',
  ESC: 'Escape'
};

var Scale = {
  MIN: 25,
  MAX: 100,
  GAP: 25
};

var ValidateError = {
  NO_HASH: 'Хэш-тег должен начинаться с символа #',
  BAD_SYMBOLS: 'Хэш-тег должен состоять из букв и чисел и не может содержать спецсимволы',
  ONLY_HASH: 'Хеш-тег не может состоять только из одной решётки',
  TOO_LONG: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
  NO_SPACES: 'Хэш-теги должны разделяться пробелами',
  REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
  TOO_MUCH: 'Нельзя указать больше пяти хэш-тегов'
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

// функция случайного выбора

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция перемешивания массива

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

//  функция создания массива с комментариями

var comments = [];

var getComments = function () {
  for (var i = 0; i < MAX_COMMENTS; i++) {
    var shuffledMessages = shuffleArray(MESSAGES);
    comments.push({
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: shuffledMessages.slice(2, 3) + ' ' + shuffledMessages.slice(0, getRandomInt(0, 1)),
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
    });
  }
};

// создание массива с комментариями

getComments();

// функция создания массива с описаниями фотографий и комментариями

var photos = [];

var getPhotos = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photos.push({
      url: 'photos/' + [i + 1] + '.jpg',
      description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: shuffleArray(comments).slice(0, getRandomInt(1, comments.length))
    });
  }
};

// создание массива с фотографиями

getPhotos();


// отрисовка комментариев

var renderComments = function (photo) {
  var newComments = document.createDocumentFragment();
  for (var i = 0; i < photo.comments.length; i++) {
    var newComment = picturePreviewComment.cloneNode(true);
    newComment.querySelector('img').src = photo.comments[i].avatar;
    newComment.querySelector('img').alt = photo.comments[i].name;
    newComment.querySelector('.social__text').textContent = photo.comments[i].message;
    newComments.appendChild(newComment);
  }

  return newComments;
};

// просмотр фотографии в полноразмерном режиме

var showFullPreview = function (photo) {
  picturePreviewImage.querySelector('img').src = photo.url;
  picturePreview.querySelector('.likes-count').textContent = photo.likes;
  picturePreview.querySelector('.comments-count').textContent = photo.comments.length;
  picturePreview.querySelector('.social__comments').innerHTML = '';
  picturePreview.querySelector('.social__comments').appendChild(renderComments(photo));
  picturePreview.querySelector('.social__caption').textContent = photo.description;
  picturePreview.querySelector('.social__comment-count').classList.add('hidden');
  picturePreview.querySelector('.comments-loader').classList.add('hidden');
  picturePreview.classList.remove('hidden');
  document.body.classList.add('modal-open');

  var closeFullPreview = function () {
    picturePreview.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onFullPreviewEscPress);
  };

  var onFullPreviewEscPress = function (evt) {
    isEscEvent(evt, closeFullPreview);
  };

  document.addEventListener('keydown', onFullPreviewEscPress);
  picturePreviewClose.addEventListener('click', closeFullPreview);
};


//  создание фотографии с обработчиком полноразмерного просмотра

var renderPicture = function (photo) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;

  var onPhotoEnterPress = function (evt) {
    isEnterEvent(evt, showFullPreview, photo);
  };

  picture.addEventListener('click', function () {
    showFullPreview(photo);
  });
  picture.addEventListener('keydown', onPhotoEnterPress);

  return picture;
};

// отрисовка всех фотографий

var createPhotos = function (arr) {
  var photo = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    photo.appendChild(renderPicture(arr[i]));
  }

  return pictures.appendChild(photo);
};

createPhotos(photos);


// показ и закрытие формы редактирования фотографии

var showEditForm = function () {
  document.body.classList.add('modal-open');
  pictureEditForm.classList.remove('hidden');
  slider.classList.add('hidden');

  var closeEditForm = function () {
    document.body.classList.remove('modal-open');
    pictureEditForm.classList.add('hidden');
    pictureUploadField.value = '';
    pictureEditFormClose.removeEventListener('click', closeEditForm);
    document.removeEventListener('keydown', onEditFormEscPress);
  };

  var onEditFormEscPress = function (evt) {
    if (!evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      isEscEvent(evt, closeEditForm);
    }
  };

  pictureEditFormClose.addEventListener('click', closeEditForm);
  document.addEventListener('keydown', onEditFormEscPress);
};

pictureUploadField.addEventListener('change', showEditForm);


// добавление фильтра на фотографию

var onFilterToggle = function (evt) {
  pictureEditImage.className = '';
  pictureEditImage.style.filter = '';
  pictureEditImage.classList.add('effects__preview--' + evt.target.value);
  if (pictureEditImage.className === 'effects__preview--none') {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
};

pictureEditFilters.addEventListener('change', onFilterToggle);

// изменение насыщенности эффекта

var changeEffectLevel = function () {
  var togglePosition = sliderToggle.offsetLeft + (sliderToggle.offsetWidth / 2);
  var effectLevel = Math.floor(togglePosition / sliderBar.offsetWidth * 100);
  effectLevelInput.setAttribute('value', effectLevel);

  switch (pictureEditImage.className) {
    case ('effects__preview--chrome'):
      pictureEditImage.style.filter = 'grayscale(' + (effectLevel / 100).toFixed(1) + ')';
      break;
    case ('effects__preview--sepia'):
      pictureEditImage.style.filter = 'sepia(' + (effectLevel / 100).toFixed(1) + ')';
      break;
    case ('effects__preview--marvin'):
      pictureEditImage.style.filter = 'invert(' + effectLevel + '%)';
      break;
    case ('effects__preview--phobos'):
      pictureEditImage.style.filter = 'blur(' + (effectLevel / 100 * 3).toFixed(1) + 'px)';
      break;
    case ('effects__preview--heat'):
      pictureEditImage.style.filter = ((effectLevel / 100 * 3).toFixed(1) <= 1) ? 'brightness(1)' : 'brightness(' + (effectLevel / 100 * 3).toFixed(1) + ')';
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
  pictureEditImage.style.transform = 'scale(' + scaleLevel / 100 + ')';
};

var onDecreaseControlClick = function () {
  changeScale(decreaseLevel);
};

var onIncreaseControlClick = function () {
  changeScale(increaseLevel);
};

decreaseControl.addEventListener('click', onDecreaseControlClick);
increaseControl.addEventListener('click', onIncreaseControlClick);

// валидация хэштегов

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
