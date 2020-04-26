import { createElement, removeElement } from '../helper/domHelpers';
import renderTrainLevels from './renderTrainLevels';
import renderTrainBlock from './renderTrainBlock';

const renderTrainPage = () => {
  removeElement('.train-page');

  const body = document.querySelector('body');
  const trainPageWrapper = createElement('div', 'train-page');

  body.append(trainPageWrapper);
  renderTrainLevels();

  renderTrainBlock(1);
};

export default renderTrainPage;
