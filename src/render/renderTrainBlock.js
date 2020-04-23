import {
  createElement,
  removeElement,
  findElement,
} from '../helper/domHelpers';
import defaultTrainImg from '../assets/img/train-img.jpg';
import loadWordsForLevel from '../api/loadCards';
import { getWordResources, insertWordResources } from '../helper/wordResourceHelper';

const renderTrainImg = () => {
  const imgElement = createElement('img', 'train__img');
  imgElement.setAttribute('src', defaultTrainImg);

  return imgElement;
};

let words = [];

const renderTrainWord = () => {
  const trainWordBlock = createElement('div', 'train-word');

  return trainWordBlock;
};

const renderWordCards = (words) => {
  const wordCards = createElement('ul', 'word-cards');

  words.forEach((word) => {
    const wordCard = createElement('li', 'word-cards__card');
    wordCard.id = word.word;
    const wordText = createElement('p', 'word-cards__text');
    wordText.textContent = word.word;
    const wordTranscription = createElement('p', 'word-cards__transcription');
    wordTranscription.textContent = word.transcription;
    wordCard.append(wordText);
    wordCard.append(wordTranscription);
    wordCards.append(wordCard);
  });

  return wordCards;
};

const renderTrainButtons = () => {
  const buttons = createElement('div', 'train-buttons');
  const buttonRestart = createElement('button', 'train-buttons__restart');
  const buttonSpeak = createElement('button', 'train-buttons__speak');
  const buttonResults = createElement('button', 'train-buttons__results');
  buttonRestart.textContent = 'Restart';
  buttonSpeak.textContent = 'Speak please';
  buttonResults.textContent = 'Results';

  buttons.append(buttonRestart);
  buttons.append(buttonSpeak);
  buttons.append(buttonResults);

  return buttons;
};

const renderTrainAudioWrapper = () => {
  removeElement('.audio');
  const trainSoundContainer = createElement('div', 'audio');
  return trainSoundContainer;
};

const addTrainBlockListener = (wordCards) => {
  wordCards.addEventListener('click', async (evt) => {
    const wordCard = evt.path.find((elem) => {
      if (elem.className && elem.className.includes('word-cards__card')) {
        return elem;
      }
    });

    if (wordCard) {
      const wordText = wordCard.id;
      const wordData = words.find((word) => word.word === wordText);
      console.log('wordData:', wordData);

      const wordResources = await getWordResources(wordData);
      insertWordResources(wordResources);
    }
  });
};

const renderTrainBlock = async (trainLevel) => {
  removeElement('.train');

  words = await loadWordsForLevel(trainLevel);
  console.log(words);

  const trainPage = findElement('.train-page');
  const trainContainer = createElement('div', 'train');
  const imgElement = renderTrainImg();
  const trainWord = renderTrainWord();
  const wordCards = renderWordCards(words);
  const buttons = renderTrainButtons();
  const audioContainer = renderTrainAudioWrapper();

  trainContainer.append(imgElement);
  trainContainer.append(trainWord);
  trainContainer.append(wordCards);
  trainContainer.append(buttons);
  trainContainer.append(audioContainer);
  trainPage.append(trainContainer);

  addTrainBlockListener(wordCards);
};

export default renderTrainBlock;
