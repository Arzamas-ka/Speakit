import { createElement, removeElement } from '../helper/domHelpers';

const renderCorrectAnswers = () => {
  removeElement('.train-answers');
  return createElement('div', 'train-answers');
};

export default renderCorrectAnswers;