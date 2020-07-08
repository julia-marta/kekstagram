'use strict';

(function () {
  var PHOTOS_COUNT = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MAX_COMMENTS = 5;

  var DESCRIPTIONS = ['Летний чил на югах', 'Отдыхаем...', 'Как же круто тут кормят', 'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать.....', 'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр', 'Затусили с друзьями на море', 'Вот это тачка!', 'Тестим новую камеру!', 'Норм'];
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Степан', 'Николай', 'Харитон', 'Тимур', 'Аким'];

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

  //  cоздание случайных комментариев для мок-данных

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

  getComments();

  // создание массива фотографий с мок-данными

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

  getPhotos();

  window.data = {
    photos: photos
  };
})();
