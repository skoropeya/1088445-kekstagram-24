import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Описание1',
  'Описание2',
  'Описание3',
  'Описание4',
  'Описание5',
  'Описание6',
];
const NAMES = [
  'Евгений',
  'Евдоким',
  'Евсей',
  'Евстахий',
  'Егор',
  'Елисей',
  'Емельян',
  'Еремей',
  'Ефим',
  'Ефрем',
];

const createComment = () => ({
  id: getRandomPositiveInteger(1, 200),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomPositiveInteger(1, MESSAGES.length-1)],
  name: NAMES[getRandomPositiveInteger(1, NAMES.length-1)],
});

const createPosts = () => {
  const commentsCount = getRandomPositiveInteger(1, 10);

  const comments = Array.from({length: commentsCount}, createComment);

  return {
    id: getRandomPositiveInteger(1, 25),
    url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
    description: DESCRIPTIONS[getRandomPositiveInteger(1, DESCRIPTIONS.length-1)],
    likes: getRandomPositiveInteger(15, 200),
    comments: comments,
  };
};

export {createPosts};
