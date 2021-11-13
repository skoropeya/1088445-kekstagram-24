import { showPreviews, clearPreviews } from './gallery.js';
import { makeArrayFromRange } from './utils/get-array-from-range.js';
import { debounce } from './utils/debounce.js';

const blockFilters = document.querySelector('.img-filters');
const formFilters = blockFilters.querySelector('.img-filters__form');
const buttonsFilters = formFilters.querySelectorAll('.img-filters__button');

const COUNT_RANDOM_POSTS = 10;

const showFilters = () => {
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
  showFilters();

  const sortPosts = (attribute) => {
    if (attribute === 'filter-default') {
      showPreviews(posts);
    }

    if (attribute === 'filter-random') {
      const selectedId = makeArrayFromRange(1, posts.length, COUNT_RANDOM_POSTS)();
      const filteredPosts = posts.filter((post) => selectedId.includes(post.id));
      showPreviews(filteredPosts);
    }

    if (attribute === 'filter-discussed') {
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
