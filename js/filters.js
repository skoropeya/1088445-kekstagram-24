import { show as showPreviews, clear as clearPreviews } from './gallery.js';
import { makeArrayFromRange } from './utils/get-array-from-range.js';
import { debounce } from './utils/debounce.js';

const COUNT_RANDOM_POSTS = 10;

const AttributesFilter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const blockFilters = document.querySelector('.img-filters');
const formFilters = blockFilters.querySelector('.img-filters__form');
const buttonsFilters = formFilters.querySelectorAll('.img-filters__button');

const show = () => {
  blockFilters.classList.remove('img-filters--inactive');
};

const deactivateButtons  = () => {
  buttonsFilters.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const comparePosts = (postA, postB) => {
  const commentsA = postA.comments.length;
  const commentsB = postB.comments.length;
  return commentsB - commentsA;
};

const setFiltersClick = (posts) => {
  show();

  const sortPosts = (attribute) => {
    if (attribute === AttributesFilter.DEFAULT) {
      showPreviews(posts);
    }

    if (attribute === AttributesFilter.RANDOM) {
      const selectedId = makeArrayFromRange(0, posts.length - 1, COUNT_RANDOM_POSTS)();
      const filteredPosts = posts.filter((post) => selectedId.includes(post.id));
      showPreviews(filteredPosts);
    }

    if (attribute === AttributesFilter.DISCUSSED) {
      const filteredPosts = posts.slice().sort(comparePosts);
      showPreviews(filteredPosts);
    }
  };

  const onFiltersClick = (evt) => {
    deactivateButtons();

    const activeButton = evt.target;
    if (activeButton.closest('.img-filters__button')) {
      activeButton.classList.add('img-filters__button--active');
    }

    clearPreviews();
    sortPosts(activeButton.id);
  };

  formFilters.addEventListener('click', debounce(onFiltersClick));
};

export {setFiltersClick};
