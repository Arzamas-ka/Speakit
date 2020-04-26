import { STATIC_URL } from '../constants/url';
import { createAudioFile } from '../render/renderAudioFile';
import { findElement, removeElement, createElement } from './domHelpers';
import { TRANSLATE_URL } from '../constants/url';

export const getImageUrl = (wordData) => {
  console.log('wordData: ', wordData);
  const imgUrl = `${STATIC_URL}${wordData.image}`;
  return imgUrl;
};

export const getWordResources = async (wordData) => {
  const audioUrl = `${STATIC_URL}${wordData.audio}`;
  const imgUrl = getImageUrl(wordData);

  const response = await fetch(`${TRANSLATE_URL}&text=${wordData.word}`);
  const {
    text: [wordTranslation],
  } = await response.json();

  return { audioUrl, imgUrl, wordTranslation };
};

export const insertWordResources = (wordData) => {
  const { imgUrl, audioUrl, wordTranslation } = wordData;

  const body = findElement('body');
  const imgElement = findElement('.train__img');
  const trainWordTranslation = findElement('.train-word');
  imgElement.setAttribute('src', imgUrl);
  trainWordTranslation.innerHTML = '';

  const wordTranslationElement = createElement(
    'span',
    'train-word__translation'
  );
  wordTranslationElement.textContent = wordTranslation.toLowerCase();
  trainWordTranslation.append(wordTranslationElement);

  removeElement('.audio');
  const audioContainer = createElement('div', 'audio');
  const audioElement = createAudioFile(audioUrl);
  audioContainer.append(audioElement);
  body.append(audioContainer);
};
