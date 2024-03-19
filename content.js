console.log('Content script is running');
const countSyllables = (word) => {
  const syllableRegex = /[^aeiouy]*[aeiouy]+/ig;
  const syllables = word.match(syllableRegex);
  return syllables ? syllables.length : 0;
}

const sentencesWithLessReadability = (text) => {
  const sentences = text.split(/[.!?]/);
  const sentencesWithLessReadability = sentences.filter(sentence => {
    const words = sentence.split(/\s+/);
    const numWords = words.length;
    const numSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
    const readability = 0.39 * (numWords / 1) + 11.8 * (numSyllables / numWords) - 15.59;
    return readability > 8;
  });
  return sentencesWithLessReadability;
}

//  Flesch-Kincaid Grade Level
const calculateReadability = (text) => {
  const sentences = text.split(/[.!?]/);
  const words = text.split(/\s+/);
  const numSentences = sentences.length;
  const numWords = words.length;
  const numSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
 
  const readability = 0.39 * (numWords / numSentences) + 11.8 * (numSyllables / numWords) - 15.59;
  const sentence = sentencesWithLessReadability(text);
  console.log('readability:', sentence);
  return readability;
}

const getGradeLevel = (readability) => {
  if (readability < 0) return 'College graduate';
  if (readability < 30) return 'College';
  if (readability < 50) return 'High school';
  if (readability < 60) return '8th grade';
  if (readability < 70) return '7th grade';
  if (readability < 80) return '6th grade';
  if (readability < 90) return '5th grade';
  if (readability < 100) return '4th grade';
  if (readability < 110) return '3rd grade';
  if (readability < 120) return '2nd grade';
  if (readability < 130) return '1st grade';
  return 'Kindergarten';
}

const getDescriptions = (readability) => {
  if (readability < 0) return 'Very Confusing';
  if (readability < 30) return 'Very Difficult';
  if (readability < 50) return 'Difficult';
  if (readability < 60) return 'Fairly Difficult';
  if (readability < 70) return 'Standard';
  if (readability < 80) return 'Fairly Easy';
  if (readability < 90) return 'Easy';
  if (readability < 100) return 'Very Easy';
  if (readability < 110) return 'Very Easy';
  if (readability < 120) return 'Very Easy';
  if (readability < 130) return 'Very Easy';
  return 'Very Easy';

}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'button_clicked') {
    const innerText = document.body.innerText;
    console.log('Button was clicked in content script');
    console.log('innerText:', innerText);
    const score = calculateReadability(innerText);
    const gradeLevel = getGradeLevel(score);
    const description = getDescriptions(score);
    sendResponse({score, gradeLevel, description});
  }
  return true; // keeps the message channel open until sendResponse is called
});




