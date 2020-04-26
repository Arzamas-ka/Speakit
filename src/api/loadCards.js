import wordsCollection from '../dataSets/wordsCollection';

const loadWordsForLevel = async (level) => {
  const words = wordsCollection[`words${level}`];
  const resultWords = [];

  for (let i = 0; i < 10; i++) {
    const wordIndx = Math.floor(Math.random() * 600);
    const word = { ...words[wordIndx] };
    word.guessed = false;
    resultWords.push(word);
  }

  return resultWords;
};

export default loadWordsForLevel;
