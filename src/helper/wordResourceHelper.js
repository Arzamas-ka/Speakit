import { STATIC_URL } from '../constants/url';
import { createAudioFile } from '../render/renderAudioFile';
import { findElement, removeElement, createElement } from './domHelpers';

export const getWordResources = (wordData) => {
  const audioUrl = `${STATIC_URL}${wordData.audio}`;
  const imgUrl = `${STATIC_URL}${wordData.image}`;

  return { audioUrl, imgUrl };
};

export const insertWordResources = (wordData) => {
  const { imgUrl, audioUrl } = wordData;

  const body = findElement('body');
  const imgElement = findElement('.train__img');

  console.log('imgElement: ', imgElement);

  imgElement.setAttribute('src', imgUrl);

  removeElement('.audio');
  const audioContainer = createElement('div', 'audio');
  const audioElement = createAudioFile(audioUrl);
  audioContainer.append(audioElement);
  body.append(audioContainer);
};
