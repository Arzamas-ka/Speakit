import { createElement, removeElement } from '../helper/domHelpers';
import renderTrainBlock from './renderTrainBlock';

const levels = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export let currentTrainLevel = 1;

const createTrainLevel = (id) => {
  const level = createElement('li', 'train-levels__level');
  level.id = id;

  return level;
};

const renderTrainBullets = (trainLevelsWrapper) => {
  levels.forEach((level, indx) => {
    const levelElement = createTrainLevel(level.id);

    if (indx === 0) {
      levelElement.classList.add('train-levels__level--active');
    }

    trainLevelsWrapper.append(levelElement);
  });
};

const handleLevelTrainClick = (evt) => {
  const clickedElement = evt.target;

  if (currentTrainLevel === parseInt(evt.target.id)) {
    return;
  }

  if (evt.target.tagName === 'LI') {
    const trainLevelElements = [
      ...document.querySelectorAll('.train-levels__level'),
    ];
    trainLevelElements.forEach((el) =>
      el.classList.remove('train-levels__level--active')
    );

    clickedElement.classList.add('train-levels__level--active');

    currentTrainLevel = parseInt(evt.target.id);
    renderTrainBlock(currentTrainLevel);
  }
};

const renderTrainLevels = () => {
  removeElement('.train-levels');

  const trainPage = document.querySelector('.train-page');
  const trainLevelsWrapper = createElement('ul', 'train-levels');

  renderTrainBullets(trainLevelsWrapper);
  trainPage.append(trainLevelsWrapper);

  trainLevelsWrapper.addEventListener('click', handleLevelTrainClick);
};

export default renderTrainLevels;
