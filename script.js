let currentIndex = -1;

function loadWords() {
  fetch('words.json') // Make sure the path is correct
    .then(response => response.json())
    .then(data => {
      const words = data.fields.words; // Adjust this line if the structure of JSON changes
      document.getElementById('nextButton').onclick = () => nextWord(words);
      nextWord(words); // Load the first word initially
    })
    .catch(error => console.error('Failed to load words:', error));
}

function nextWord(words) {
  currentIndex = (currentIndex + 1) % words.length;
  const wordElement = document.getElementById('word');
  const translationElement = document.getElementById('translation');
  wordElement.textContent = words[currentIndex].word;
  translationElement.textContent = words[currentIndex].translation;
  translationElement.style.display = 'none'; // Hide translation initially
  wordElement.onclick = () => toggleTranslation(translationElement); // Show translation on click
}

function toggleTranslation(translationElement) {
  const isHidden = translationElement.style.display === 'none';
  translationElement.style.display = isHidden ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', loadWords);
