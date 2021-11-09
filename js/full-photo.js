
const bigPicture = document.querySelector('.big-picture');

const image = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
// const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const listComments = bigPicture.querySelector('.social__comments');

const comment = listComments.querySelector('.social__comment');

const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const buttonCancel = bigPicture.querySelector('#picture-cancel');

const COMMENTS_COUNT = 5;

const createComments = (bitComments) => {
  const listCommentsFragment = document.createDocumentFragment();

  bitComments.forEach((commentItem) => {
    const newComment = comment.cloneNode(true);
    const img = newComment.querySelector('.social__picture');
    const text = newComment.querySelector('.social__text');

    img.src = commentItem.avatar;
    img.alt = commentItem.name;
    text.textContent = commentItem.message;

    listCommentsFragment.appendChild(newComment);
  });

  listComments.appendChild(listCommentsFragment);
};

const updateCounter = (counter, total) => {
  commentCounter.innerHTML = `${counter} из <span class="comments-count">${total}</span> комментариев`;
};

const showComments = (post) => {
  listComments.innerHTML = '';
  const allComments = post.comments.slice();
  let counter = 0;

  if (allComments.length <= COMMENTS_COUNT) {

    commentsLoader.classList.add('hidden');
    counter = allComments.length;
    createComments(allComments);

  } else {
    commentsLoader.classList.remove('hidden');
    let bitComments;

    bitComments = allComments.splice(0, COMMENTS_COUNT);
    counter += bitComments.length;
    createComments(bitComments);

    const onCommentsLoaderClick = () => {
      bitComments = allComments.splice(0, COMMENTS_COUNT);
      counter += bitComments.length;
      createComments(bitComments);
      updateCounter(counter, post.comments.length);
    };
    commentsLoader.addEventListener('click', onCommentsLoaderClick);

  }
  updateCounter(counter, post.comments.length);
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onButtonCancelClick = () => {
  closePhoto();
  buttonCancel.removeEventListener('click', onButtonCancelClick);
  // commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const openPhoto = (post) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  image.src = post.url;
  likesCount.textContent = post.likes;
  socialCaption.textContent = post.description;

  showComments(post);

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePhoto();
      buttonCancel.removeEventListener('click', onButtonCancelClick);
      // commentsLoader.removeEventListener('click', onCommentsLoaderClick);
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  document.addEventListener('keydown', onEscKeydown);
  buttonCancel.addEventListener('click', onButtonCancelClick);
  // commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export {openPhoto};
