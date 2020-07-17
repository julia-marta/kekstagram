'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var gallery = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var photos = [];

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

  var createPhotos = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      gallery.appendChild(renderPicture(arr[i]));
    }
  };

  var removePhotos = function () {
    Array.from(gallery.children).forEach(function (item) {
      if (item.classList.contains('picture')) {
        gallery.removeChild(item);
      }
    });
  };

  var filterPhotos = function () {
    var filteredPhotos = window.filter.data(photos);
    createPhotos(filteredPhotos);
  };

  var onSuccess = function (data) {
    photos = data.slice();
    filterPhotos();
    filters.classList.remove('img-filters--inactive');
  };

  window.data.get(onSuccess, window.form.onError);

  window.gallery = {
    filters: filters,
    removePhotos: removePhotos,
    filterPhotos: filterPhotos
  };
})();
