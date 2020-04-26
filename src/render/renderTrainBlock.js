import {
  createElement,
  removeElement,
  findElement,
} from '../helper/domHelpers';
import defaultTrainImg from '../assets/img/train-img.jpg';
import loadWordsForLevel from '../api/loadCards';
import {
  getWordResources,
  insertWordResources,
  translateWord,
} from '../helper/wordResourceHelper';
import renderCorrectAnswers from './renderCorrectAnswers';
import renderSpeechRecognition, {
  stopSpeechRecognition,
} from './renderSpeechRecognition';
import { createAudioFile } from './renderAudioFile';
import { STATIC_URL } from '../constants/url';

let isSpeakState = false;

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
    wordText.textContent = word.word.toLowerCase();
    const wordTranscription = createElement('p', 'word-cards__transcription');
    wordTranscription.textContent = word.transcription;
    wordCard.append(wordText);
    wordCard.append(wordTranscription);
    wordCards.append(wordCard);
  });

  return wordCards;
};

const resetActiveClass = () => {
  const cardsElements = [...document.querySelectorAll('.word-cards__card')];
  cardsElements.forEach((el) =>
    el.classList.remove('word-cards__card--active')
  );
};

const handleSpeakIt = () => {
  if (!isSpeakState) {
    const trainWordElement = findElement('.train-word');
    trainWordElement.innerHTML = '';
    resetImg();

    resetActiveClass();
    renderSpeechRecognition(words);
    isSpeakState = true;
  }
};

const resetTrainAnswers = () => {
  const trainAnswers = findElement('.train-answers');
  trainAnswers.innerHTML = '';
};

const resetCards = () => {
  const cardElements = [...document.querySelectorAll('.word-cards__card')];
  cardElements.forEach((elem) => (elem.className = 'word-cards__card'));
};

const resetImg = () => {
  const trainImage = findElement('.train__img');
  trainImage.src = defaultTrainImg;
};

const resetTrainWordInput = () => {
  const trainWordContainer = findElement('.train-word');
  trainWordContainer.innerHTML = '';
};

const resetWords = () => {
  words.forEach((word) => (word.guessed = false));
};

const resetResults = () => {
  removeElement('.results-container');
};

const handleRestart = () => {
  stopSpeechRecognition();
  resetTrainAnswers();
  resetCards();
  resetImg();
  resetTrainWordInput();
  resetWords();
  isSpeakState = false;
};

const addAudioElement = (wordData) => {
  const body = findElement('body');

  const audioUrl = `${STATIC_URL}${wordData.audio}`;

  removeElement('.audio');
  const audioContainer = createElement('div', 'audio');
  const audioElement = createAudioFile(audioUrl);
  audioContainer.append(audioElement);
  body.append(audioContainer);
};

const handleAudioResultsClick = (evt) => {
  const path = evt.path || (evt.composedPath && evt.composedPath());

  const wordElement = path.find((elem) => {
    if (elem.className && elem.className.includes('results-list__item')) {
      return elem;
    }
  });

  if (wordElement) {
    const wordEng = wordElement.querySelector('.results-list__eng').textContent;
    console.log(wordEng);
    const wordData = words.find((word) => word.word === wordEng);

    if (wordData) {
      addAudioElement(wordData);
    }
  }
};

const renderResultsBody = (resultElement) => {
  const notGuessedTitle = createElement('h3', 'results__title');
  notGuessedTitle.textContent = 'Mistakes';

  const notGuessedWords = words.filter((word) => !word.guessed);

  const notGuessedCount = createElement('span', 'results__title-number');
  notGuessedCount.classList.add('results__title-number--error');
  notGuessedCount.textContent = notGuessedWords.length;
  notGuessedTitle.append(notGuessedCount);

  const listNotGuestedWords = createElement('ul', 'results-list');

  notGuessedWords.forEach(async (word) => {
    const wordItem = createElement('li', 'results-list__item');
    const wordEng = createElement('span', 'results-list__eng');
    const wordTranscription = createElement(
      'span',
      'results-list__transcription'
    );
    const wordTranslate = createElement('span', 'results-list__translate');

    const wordTranslateText = await translateWord(word.word);

    wordEng.textContent = word.word.toLowerCase();
    wordTranscription.textContent = word.transcription;
    wordTranslate.textContent = wordTranslateText.toLowerCase();

    wordItem.append(wordEng);
    wordItem.append(wordTranscription);
    wordItem.append(wordTranslate);
    wordItem.append(wordTranslate);

    listNotGuestedWords.append(wordItem);
  });

  const guessedTitle = createElement('h3', 'results__title');
  guessedTitle.textContent = 'Success';

  const guessedWords = words.filter((word) => word.guessed);

  const guessedCount = createElement('span', 'results__title-number');
  guessedCount.classList.add('results__title-number--success');
  guessedCount.textContent = guessedWords.length;
  guessedTitle.append(guessedCount);

  const listGuestedWords = createElement('ul', 'results-list');

  guessedWords.forEach(async (word) => {
    const wordItem = createElement('li', 'results-list__item');
    const wordEng = createElement('span', 'results-list__eng');
    const wordTranscription = createElement(
      'span',
      'results-list__transcription'
    );
    const wordTranslate = createElement('span', 'results-list__translate');

    const wordTranslateText = await translateWord(word.word);

    wordEng.textContent = word.word.toLowerCase();
    wordTranscription.textContent = word.transcription;
    wordTranslate.textContent = wordTranslateText.toLowerCase();

    wordItem.append(wordEng);
    wordItem.append(wordTranscription);
    wordItem.append(wordTranslate);
    wordItem.append(wordTranslate);

    listGuestedWords.append(wordItem);
  });

  resultElement.append(notGuessedTitle);
  resultElement.append(listNotGuestedWords);
  resultElement.append(guessedTitle);
  resultElement.append(listGuestedWords);

  resultElement.addEventListener('click', handleAudioResultsClick);
};

const addEventListenerReturn = (buttonReturn) => {
  buttonReturn.addEventListener('click', () => {
    resetResults();
  });
};

const addEventListenerNewGame = (buttonNewGame) => {
  buttonNewGame.addEventListener('click', () => {
    handleRestart();
    resetResults();
  });
};

const renderResultButtons = (resultElement) => {
  const buttons = createElement('div', 'result-buttons');
  const buttonReturn = createElement('button', 'result-buttons__return');
  const buttonNewGame = createElement('button', 'result-buttons__new-game');
  const buttonStatistics = createElement(
    'button',
    'result-buttons__statistics'
  );

  buttonReturn.textContent = 'Return';
  buttonNewGame.textContent = 'New game';
  buttonStatistics.textContent = 'Statistics';

  addEventListenerReturn(buttonReturn);
  addEventListenerNewGame(buttonNewGame);

  buttons.append(buttonReturn);
  buttons.append(buttonNewGame);
  buttons.append(buttonStatistics);
  resultElement.append(buttons);
};

const handleResults = () => {
  removeElement('.results-container');

  const body = findElement('body');
  const resultContainerElement = createElement('div', 'results-container');
  const resultElement = createElement('div', 'results');

  renderResultsBody(resultElement);
  renderResultButtons(resultElement);

  resultContainerElement.append(resultElement);
  body.append(resultContainerElement);
};

const addListenerSpeakPlease = (buttonSpeak) => {
  buttonSpeak.addEventListener('click', handleSpeakIt);
};

const addListenerRestart = (buttonRestart) => {
  buttonRestart.addEventListener('click', handleRestart);
};

const addListenerResults = (buttonResults) => {
  buttonResults.addEventListener('click', handleResults);
};

const renderTrainButtons = () => {
  const buttons = createElement('div', 'train-buttons');
  const buttonRestart = createElement('button', 'train-buttons__restart');
  const buttonSpeak = createElement('button', 'train-buttons__speak');
  const buttonResults = createElement('button', 'train-buttons__results');
  buttonRestart.textContent = 'Restart';
  buttonSpeak.textContent = 'Speak please';
  buttonResults.textContent = 'Results';

  addListenerSpeakPlease(buttonSpeak);
  addListenerRestart(buttonRestart);
  addListenerResults(buttonResults);

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

const setActiveCard = (activeCard) => {
  const allCardElements = [...document.querySelectorAll('.word-cards__card')];

  allCardElements.forEach((elem) =>
    elem.classList.remove('word-cards__card--active')
  );
  activeCard.classList.add('word-cards__card--active');
};

const addTrainBlockListener = (wordCards) => {
  wordCards.addEventListener('click', async (evt) => {
    const path = evt.path || (evt.composedPath && evt.composedPath());

    const wordCard = path.find((elem) => {
      if (elem.className && elem.className.includes('word-cards__card')) {
        return elem;
      }
    });

    if (wordCard && !isSpeakState) {
      setActiveCard(wordCard);

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
  const correctAnswers = renderCorrectAnswers();

  trainContainer.append(imgElement);
  trainContainer.append(trainWord);
  trainContainer.append(wordCards);
  trainContainer.append(buttons);
  trainContainer.append(audioContainer);
  trainContainer.append(correctAnswers);
  trainPage.append(trainContainer);

  addTrainBlockListener(wordCards);
};

export default renderTrainBlock;
