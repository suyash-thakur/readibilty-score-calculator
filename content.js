const countSyllables = (word) => {
  const syllableRegex = /[^aeiouy]*[aeiouy]+/ig;
  const syllables = word.match(syllableRegex);
  return syllables ? syllables.length : 0;
}

const calculateReadingEase = (text) => {
  const sentences = text.split(/[.!?]/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const numSentences = sentences.length;
  const numWords = words.length;
  const numSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
 
  let readingEase = 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (numSyllables / numWords);
  readingEase = Math.round(readingEase * 100) / 100;
  return readingEase;
}

const getReadingEaseDescription = (readingEase) => {
  if (readingEase >= 90) return 'Very easy';
  if (readingEase >= 80) return 'Easy';
  if (readingEase >= 70) return 'Fairly easy';
  if (readingEase >= 60) return 'Standard';
  if (readingEase >= 50) return 'Fairly difficult';
  if (readingEase >= 30) return 'Difficult';
  return 'Very difficult';
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'button_clicked') {
    const innerText = document.body.innerText;
    const score = calculateReadingEase(innerText);
    const description = getReadingEaseDescription(score);
    sendResponse({ score, description });
  }
  return true;
});
