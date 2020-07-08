'use strict';

(function () {
  var preview = document.querySelector('.big-picture');
  var previewClose = preview.querySelector('.big-picture__cancel');
  var previewImage = preview.querySelector('.big-picture__img img');
  var previewComment = preview.querySelector('.social__comment');

  // отрисовка комментариев

  var renderComments = function (photo) {
    var comments = document.createDocumentFragment();
    photo.comments.forEach(function (item) {
      var comment = previewComment.cloneNode(true);
      comment.querySelector('img').src = item.avatar;
      comment.querySelector('img').alt = item.name;
      comment.querySelector('.social__text').textContent = item.message;
      comments.appendChild(comment);
    });

    return comments;
  };

  // просмотр фотографии в полноразмерном режиме

  var showPreview = function (photo) {
    previewImage.src = photo.url;
    preview.querySelector('.likes-count').textContent = photo.likes;
    preview.querySelector('.comments-count').textContent = photo.comments.length;
    preview.querySelector('.social__comments').innerHTML = '';
    preview.querySelector('.social__comments').appendChild(renderComments(photo));
    preview.querySelector('.social__caption').textContent = photo.description;
    preview.querySelector('.social__comment-count').classList.add('hidden');
    preview.querySelector('.comments-loader').classList.add('hidden');
    preview.classList.remove('hidden');
    document.body.classList.add('modal-open');

    var closePreview = function () {
      preview.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onPreviewEscPress);
    };

    var onPreviewEscPress = function (evt) {
      window.main.isEscEvent(evt, closePreview);
    };

    document.addEventListener('keydown', onPreviewEscPress);
    previewClose.addEventListener('click', closePreview);
  };

  window.preview = {
    show: showPreview
  };
})();
