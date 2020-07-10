'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var gallery = document.querySelector('.pictures');
  var photos = [];

  //  создание фотографии с обработчиком полноразмерного просмотра

  var renderPicture = function (photo) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;

    var onPhotoEnterPress = function (evt) {
      window.main.isEnterEvent(evt, window.preview.show, photo);
    };

    picture.addEventListener('click', function () {
      window.preview.show(photo);
    });
    picture.addEventListener('keydown', onPhotoEnterPress);

    return picture;
  };

  // отрисовка всех фотографий

  var createPhotos = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      gallery.appendChild(renderPicture(arr[i]));
    }
  };

  var onSuccess = function (data) {
    photos = data.slice();
    createPhotos(photos);
  };

  window.data.load(onSuccess);

})();
