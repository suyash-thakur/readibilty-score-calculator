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
 
  const readingEase = 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (numSyllables / numWords);
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
    console.log('Button was clicked in content script');
    console.log('innerText:', innerText);
    const score = calculateReadingEase(innerText);
    const description = getReadingEaseDescription(score);
    sendResponse({ score, description });
  }
  return true;
});
