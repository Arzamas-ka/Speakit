import { createElement, findElement } from '../helper/domHelpers';
import { getImageUrl } from '../helper/wordResourceHelper';
import doneImg from '../assets/img/done.png';

export let recognition;

const compareWords = (transcript, words) => {
  console.log('words: ', words);

  const cardsElements = [...document.querySelectorAll('.word-cards__card')];
  const correctAnswersElement = findElement('.train-answers');
  const answeringImg = document.querySelector('.train__img');
  const guessingWord = words.find((word) => word.word === transcript);
  const guessingWordCard = cardsElements.find((card) => card.id === transcript);
  const isNotGuessed = guessingWord && !guessingWord.guessed;

  if (isNotGuessed) {
    guessingWordCard.classList.add('word-cards__card--guessed');

    guessingWord.guessed = true;
    const correctAnswerElement = createElement('img', 'train-answers__img');
    correctAnswerElement.setAttribute('src', doneImg);
    correctAnswersElement.append(correctAnswerElement);
    answeringImg.src = getImageUrl(guessingWord);
  }

  const isAllGuessed = words.every((word) => word.guessed);

  if (isAllGuessed) {
    stopSpeechRecognition();
  }
};

const createSpeechRecognition = (words) => {
  const speechConstructor =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  recognition = new speechConstructor();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onresult = function (event) {
    const inputElement = findElement('.train-word__speak-input');

    const transcript = event.results[event.results.length - 1][0].transcript
      .trim()
      .toLowerCase();

    inputElement.value = transcript;
    compareWords(transcript, words);
  };
};

const renderSpeechRecognition = (words) => {
  const trainWordContainer = findElement('.train-word');
  const speakContainer = createElement('div', 'train-word__speak');
  const inputSpeakRecognized = createElement(
    'input',
    'train-word__speak-input'
  );
  inputSpeakRecognized.setAttribute('type', 'text');
  inputSpeakRecognized.setAttribute('readonly', true);
  speakContainer.append(inputSpeakRecognized);

  createSpeechRecognition(words);
  recognition.start();

  trainWordContainer.append(speakContainer);
};

export const stopSpeechRecognition = () => recognition && recognition.stop();

export default renderSpeechRecognition;
