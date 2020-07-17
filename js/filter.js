'use strict';

(function () {
  var MAX_RANDOM_PHOTOS = 10;
  var filterButtons = window.gallery.filters.querySelector('.img-filters__form');

  var filterRules = {
    'filter-default': function (pictures) {
      return pictures;
    },
    'filter-random': function (pictures) {
      return pictures.slice().sort(function () {
        return 0.5 - Math.random();
      }).slice(0, MAX_RANDOM_PHOTOS);
    },
    'filter-discussed': function (pictures) {
      return pictures.slice().sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
    }
  };

  var filterData = function (arr) {
    var activeFilter = filterButtons.querySelector('.img-filters__button--active');
    return filterRules[activeFilter.id](arr);
  };

  var onFilterChange = window.debounce(function (evt) {
    Array.from(filterButtons.children).forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    window.gallery.removePhotos();
    window.gallery.filterPhotos();
  });

  filterButtons.addEventListener('click', onFilterChange);

  window.filter = {
    data: filterData
  };
})();
