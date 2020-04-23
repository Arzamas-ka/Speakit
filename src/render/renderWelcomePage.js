import renderTrainPage from './renderTrainPage';
import {
  createElement,
  removeElement,
  findElement,
} from '../helper/domHelpers';

const handleStartClick = () => {
  const startButton = findElement('.welcome__start-button');
  startButton.removeEventListener('click', handleStartClick);
  removeElement('.welcome-wrapper');
  renderTrainPage();
};

export const renderWelcomePage = () => {
  removeElement('.welcome-wrapper');

  const body = document.querySelector('body');
  const welcomePageWrapper = createElement('div', 'welcome-wrapper');
  const welcomeTitle = createElement('h1', 'welcome__title');
  welcomeTitle.textContent = 'Speakit';
  const welcomeTextSound = createElement('p', 'welcome__text');
  welcomeTextSound.textContent = 'Click on the words to hear them sound.';
  const welcomeTextMicrophone = createElement('p', 'welcome__text');
  welcomeTextMicrophone.textContent =
    'Click on the button and speak the words into the microphone.';
  const welcomeStartButton = createElement('button', 'welcome__start-button');
  welcomeStartButton.textContent = 'Start';

  welcomePageWrapper.append(welcomeTitle);
  welcomePageWrapper.append(welcomeTextSound);
  welcomePageWrapper.append(welcomeTextMicrophone);
  welcomePageWrapper.append(welcomeStartButton);
  body.append(welcomePageWrapper);

  welcomeStartButton.addEventListener('click', handleStartClick);
};
