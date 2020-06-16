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

// отображение полноразмерного просмотра фотографии

picturePreview.classList.remove('hidden');

// функция отрисовки комментариев к фотографии из массива

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

// функция заполнения интерфейса полноразмерного просмотра фотографии данными из массива

var showCard = function (i) {
  picturePreviewImage.querySelector('img').src = photos[i].url;
  picturePreview.querySelector('.likes-count').textContent = photos[i].likes;
  picturePreview.querySelector('.comments-count').textContent = photos[i].comments.length;
  picturePreview.querySelector('.social__comments').innerHTML = '';
  picturePreview.querySelector('.social__comments').appendChild(renderComments(photos[i]));
  picturePreview.querySelector('.social__caption').textContent = photos[i].description;
  picturePreview.querySelector('.social__comment-count').classList.add('hidden');
  picturePreview.querySelector('.comments-loader').classList.add('hidden');
};

// заполнение интерфейса полноразмерного просмотра фотографии данными из массива

showCard(11);

// отключение скролла контейнера с фотографиями

document.body.classList.add('modal-open');
