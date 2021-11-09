// import { openPhoto } from './full-photo.js';

const pictures = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const showPreviews = (posts) => {
  posts.forEach((post) => {
    const postElement = templatePicture.cloneNode(true);
    postElement.querySelector('.picture__img').src = post.url;
    postElement.querySelector('.picture__likes').textContent = post.likes;
    postElement.querySelector('.picture__comments').textContent = post.comments.length;

    picturesFragment.appendChild(postElement);
  });

  pictures.appendChild(picturesFragment);
};

const onPictureClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    // openPhoto(?);
  }
};

pictures.addEventListener('click', onPictureClick);

export {showPreviews};
