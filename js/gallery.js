import { openPhoto } from './full-photo.js';

const pictures = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const clearPreviews = () => {
  const allPreviews = pictures.querySelectorAll('a.picture');
  allPreviews.forEach((preview) => {
    preview.remove();
  });
};

const showPreviews = (posts) => {
  posts.forEach((post) => {
    const postElement = templatePicture.cloneNode(true);
    postElement.id = post.id;
    postElement.querySelector('.picture__img').src = post.url;
    postElement.querySelector('.picture__likes').textContent = post.likes;
    postElement.querySelector('.picture__comments').textContent = post.comments.length;
    picturesFragment.appendChild(postElement);
  });

  pictures.appendChild(picturesFragment);
};

const setPictureClick = (posts) => {
  pictures.addEventListener(('click'), (evt) => {
    const targetElement = evt.target.closest('.picture');

    if (targetElement) {
      evt.preventDefault();
      openPhoto(posts[targetElement.id]);
    }
  });
};

export {showPreviews, clearPreviews, setPictureClick};
