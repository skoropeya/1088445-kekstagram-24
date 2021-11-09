import { openPhoto } from './full-photo.js';

const pictures = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

// сюда запишем массив объетов, полученный с сервера
let dataPosts;

const onPictureClick = (evt) => {
  const targetElement = evt.target.closest('.picture');

  if (targetElement) {
    evt.preventDefault();
    openPhoto(dataPosts[targetElement.id]);
  }
};

const showPreviews = (posts) => {
  dataPosts = posts;

  posts.forEach((post) => {
    const postElement = templatePicture.cloneNode(true);
    postElement.id = post.id;
    postElement.querySelector('.picture__img').src = post.url;
    postElement.querySelector('.picture__likes').textContent = post.likes;
    postElement.querySelector('.picture__comments').textContent = post.comments.length;
    picturesFragment.appendChild(postElement);
  });

  pictures.appendChild(picturesFragment);
  pictures.addEventListener('click', onPictureClick);
};

export {showPreviews};
