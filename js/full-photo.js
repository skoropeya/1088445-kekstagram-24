// import {createPosts} from './create-posts.js';
// const PHOTOS_COUNT = 25;
// const posts = Array.from({length: PHOTOS_COUNT}, createPosts);

const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const listComments = bigPicture.querySelector('.social__comments');
const comment = listComments.querySelector('.social__comment');

// const socialCommentCount = bigPicture.querySelector('.social__comment-count');
// const commentsLoader = bigPicture.querySelector('.comments-loader');
const buttonCancel = bigPicture.querySelector('#picture-cancel');

const createComment = (post) => {
  const listCommentsFragment = document.createDocumentFragment();
  const allComments = post.comments;

  allComments.forEach((commentItem) => {
    const newComment = comment.cloneNode(true);
    const img = newComment.querySelector('.social__picture');
    const text = newComment.querySelector('.social__text');

    img.src = commentItem.avatar;
    img.alt = commentItem.name;
    text.textContent = commentItem.message;

    listCommentsFragment.appendChild(newComment);
  });

  listComments.innerHTML = '';
  listComments.appendChild(listCommentsFragment);
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onButtonCancelClick = () => {
  closePhoto();
  buttonCancel.removeEventListener('click', onButtonCancelClick);
};

const openPhoto = (post) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  image.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;
  createComment(post);

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePhoto();
      buttonCancel.removeEventListener('click', onButtonCancelClick);
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  document.addEventListener('keydown', onEscKeydown);
  buttonCancel.addEventListener('click', onButtonCancelClick);
};

// openPhoto(posts[0]);
export {openPhoto};
