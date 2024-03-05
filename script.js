let currentIndex = -1;
let favorites = []; // Array to store favorite words
let showingFavorites = false; // Flag to track if we're showing favorites or all words
let words = []; // Store words globally for easy toggle between views

document.addEventListener('DOMContentLoaded', () => {
    loadWords();
    document.getElementById('backButton').onclick = previousWord;
    document.getElementById('nextButton').onclick = nextWord;
    document.getElementById('markFavoriteButton').onclick = addCurrentWordToFavorites;
    document.getElementById('favoritesButton').onclick = toggleFavoritesView;
});

function loadWords() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data.fields.words;
            updateWordAndTranslation();
        })
        .catch(error => console.error('Failed to load words:', error));
}

function nextWord() {
    if (showingFavorites && favorites.length > 0) {
        currentIndex = (currentIndex + 1) % favorites.length;
        updateWordAndTranslation(true);
    } else if (!showingFavorites && words.length > 0) {
        currentIndex = (currentIndex + 1) % words.length;
        updateWordAndTranslation();
    }
}

function previousWord() {
    if (showingFavorites && favorites.length > 0) {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : favorites.length - 1;
        updateWordAndTranslation(true);
    } else if (!showingFavorites && words.length > 0) {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : words.length - 1;
        updateWordAndTranslation();
    }
}

function toggleFavoritesView() {
    showingFavorites = !showingFavorites;
    currentIndex = 0; // Reset index to start from the first word of the list
    if (showingFavorites) {
        document.getElementById('favoritesButton').textContent = 'Back to All Words';
        updateWordAndTranslation(true);
    } else {
        document.getElementById('favoritesButton').textContent = 'Favorites';
        updateWordAndTranslation();
    }
}

function addCurrentWordToFavorites() {
    const currentWord = showingFavorites ? favorites[currentIndex] : words[currentIndex];
    if (!favorites.some(fav => fav.word === currentWord.word)) {
        favorites.push(currentWord);
        console.log('Added to favorites:', currentWord);
    }
}

function updateWordAndTranslation(useFavorites = false) {
    const list = useFavorites ? favorites : words;
    if (list.length > 0 && currentIndex < list.length) {
        const wordElement = document.getElementById('word');
        const translationElement = document.getElementById('translation');
        wordElement.textContent = list[currentIndex].word;
        translationElement.textContent = list[currentIndex].translation;
        translationElement.style.display = 'none'; // Hide translation initially
        wordElement.onclick = () => toggleTranslation(translationElement); // Show translation on click
    } else {
        document.getElementById('word').textContent = 'No words available';
        document.getElementById('translation').textContent = '';
    }
}

function toggleTranslation(translationElement) {
    const isHidden = translationElement.style.display === 'none';
    translationElement.style.display = isHidden ? 'block' : 'none';
}
