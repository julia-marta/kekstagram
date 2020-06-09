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

//  функция создания комментариев

var comments = [];

var getComments = function (commentsCount) {
  for (var i = 0; i < commentsCount; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: shuffleArray(MESSAGES).slice(0, getRandomInt(1, 2)),
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
    });
  }
};

// создание рандомного количества комментариев

getComments((getRandomInt(1, MAX_COMMENTS)));

// функция создания массива с описаниями фотографий и комментариями

var photos = [];

var getPhotos = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photos.push({
      url: 'photos/' + [i + 1] + '.jpg',
      description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: comments
    });
  }
};

// создание массива с фотографиями

getPhotos();

//  функция создания элемента фотографии на основе объекта из массива с фотографиями

var renderPicture = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

// функция отрисовки созданных элементов фотографий

var createPicture = function (arr) {
  var picture = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    picture.appendChild(renderPicture(arr[i]));
  }

  return pictures.appendChild(picture);
};

// отрисовка фотографий

createPicture(photos);
