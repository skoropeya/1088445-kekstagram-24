
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

const updateCounter = (counter, total) => {
  commentCounter.innerHTML = `${counter} из <span class="comments-count">${total}</span> комментариев`;
};

const drawCommentItems = (bitComments) => {
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

const selectBitComments = (allComments) => {
  const bitComments = allComments.splice(0, COMMENTS_COUNT);
  let numberComments = 0;
  if (bitComments) {
    numberComments = bitComments.length;
    drawCommentItems(bitComments);
  }
  return numberComments;
};

const onCommentsLoaderClick = (allComments, counter, total) => {
  counter += selectBitComments(allComments);
  updateCounter(counter, total);

};

const showComments = (post) => {
  listComments.innerHTML = '';
  const allComments = post.comments.slice();
  const total = post.comments.length;
  let counter = 0;

  if (total <= COMMENTS_COUNT) {
    counter = total;
    commentsLoader.classList.add('hidden');
    drawCommentItems(allComments);
  } else {
    counter = selectBitComments(allComments);
    commentsLoader.addEventListener('click', () => onCommentsLoaderClick(allComments, counter, total));
  }

  updateCounter(counter, total);
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
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
  socialCaption.textContent = post.description;

  showComments(post);

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

export {openPhoto};
