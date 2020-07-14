'use strict';

(function () {
  var MAX_COMMENTS = 5;
  var preview = document.querySelector('.big-picture');
  var previewClose = preview.querySelector('.big-picture__cancel');
  var previewImage = preview.querySelector('.big-picture__img img');
  var previewComments = preview.querySelector('.social__comments');
  var commentTemplate = preview.querySelector('.social__comment');
  var commentsCount = preview.querySelector('.comments-loaded');
  var commentsLoader = preview.querySelector('.comments-loader');

  var renderComments = function (photo) {
    photo.comments.forEach(function (item) {
      var comment = commentTemplate.cloneNode(true);
      comment.querySelector('img').src = item.avatar;
      comment.querySelector('img').alt = item.name;
      comment.querySelector('.social__text').textContent = item.message;
      previewComments.appendChild(comment);
    });
  };

  var loadComments = function () {
    var loadedComments = MAX_COMMENTS;
    var allComments = previewComments.children;

    var addComments = function () {
      for (var i = 0; i < allComments.length; i++) {
        if (i < loadedComments) {
          allComments[i].classList.remove('hidden');
        } else {
          allComments[i].classList.add('hidden');
        }
      }
      commentsCount.textContent = loadedComments;
    };

    if (allComments.length < MAX_COMMENTS) {
      commentsLoader.classList.add('hidden');
      commentsCount.textContent = allComments.length;
    } else {
      commentsLoader.classList.remove('hidden');
      addComments();
    }

    commentsLoader.addEventListener('click', function () {
      loadedComments += MAX_COMMENTS;

      if (loadedComments < allComments.length) {
        commentsLoader.classList.remove('hidden');
      } else {
        commentsLoader.classList.add('hidden');
        loadedComments = allComments.length;
      }
      addComments();
    });
  };

  var showPreview = function (photo) {
    previewImage.src = photo.url;
    preview.querySelector('.likes-count').textContent = photo.likes;
    preview.querySelector('.comments-count').textContent = photo.comments.length;
    preview.querySelector('.social__caption').textContent = photo.description;
    previewComments.innerHTML = '';
    renderComments(photo);
    loadComments();

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
