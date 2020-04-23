import { STATIC_URL } from '../constants/url';
import { removeElement } from '../helper/domHelpers';

// example
// {
//   word: 'sale',
//   image: 'files/30_0600.jpg',
//   audio: 'files/30_0600.mp3',
//   audioMeaning: 'files/30_0600_meaning.mp3',
//   audioExample: 'files/30_0600_example.mp3',
//   textMeaning: 'If something is for <i>sale</i>, you can buy it.',
//   textExample: 'Everything for <b>sale</b> here is the same price.',
//   transcription: '[seil]',
// },

export const createAudioFile = (srcPath) => {
  const audioElement = document.createElement('audio');
  audioElement.id = 'audio-translation';
  audioElement.controls = 'controls';
  audioElement.src = srcPath;
  audioElement.type = 'audio/mpeg';
  audioElement.style.display = 'none';
  audioElement.autoplay = 'true';

  return audioElement;
};

// export const renderAudioFile = (word) => {
//   removeElement('.audio-translation-wrapper');

//   const audioWrapper = document.createElement('div');
//   audioWrapper.classList.add('audio-translation-wrapper');
//   audioWrapper.style.display = 'none';

//   const audioUrl = `${STATIC_URL}${word.audio}`;
//   const audioElement = createAudioFile(audioUrl);
//   audioWrapper.append(audioElement);
// };
