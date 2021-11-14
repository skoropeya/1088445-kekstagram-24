const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const descriptionImage = bigPicture.querySelector('.social__caption');
const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const buttonCancel = bigPicture.querySelector('#picture-cancel');
const listComments = bigPicture.querySelector('.social__comments');
const comment = listComments.querySelector('.social__comment');

const COMMENTS_COUNT = 5;
let counter = 0;

const showComments = (post) => {
  const allComments = post.comments.slice();
  const total = post.comments.length;
  let partComments = [];

  const updateCounter = () => {
    commentCounter.innerHTML = `${counter} из <span class="comments-count">${total}</span> комментариев`;
  };

  const drawComments = (comments) => {
    const listCommentsFragment = document.createDocumentFragment();

    comments.forEach((commentItem) => {
      const newComment = comment.cloneNode(true);
      const img = newComment.querySelector('.social__picture');
      const text = newComment.querySelector('.social__text');

      img.src = commentItem.avatar;
      img.alt = commentItem.name;
      text.textContent = commentItem.message;

      listCommentsFragment.appendChild(newComment);
    });

    listComments.appendChild(listCommentsFragment);
    updateCounter();
  };

  const selectPartComments = (comments) => {
    partComments = comments.splice(0, COMMENTS_COUNT);
    counter = counter + partComments.length;
  };

  const onCommentsLoaderClick = () => {
    selectPartComments(allComments);
    drawComments(partComments);
    if (counter === total) {
      commentsLoader.classList.add('hidden');
    }
  };

  if (total <= COMMENTS_COUNT) {
    counter = total;
    drawComments(allComments);
    commentsLoader.classList.add('hidden');
  } else {
    selectPartComments(allComments);
    drawComments(partComments);

    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
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
  descriptionImage.textContent = post.description;
  listComments.innerHTML = '';
  counter = 0;
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
