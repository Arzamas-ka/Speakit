import { createElement, removeElement } from '../helper/domHelpers';
import trainLevels from './renderTrainLevels';
import renderTrainBlock from './renderTrainBlock';

const renderTrainPage = () => {
  removeElement('.train-page');

  const body = document.querySelector('body');
  const trainPageWrapper = createElement('div', 'train-page');

  body.append(trainPageWrapper);
  trainLevels();
  renderTrainBlock(1);
};

export default renderTrainPage;
