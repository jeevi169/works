const sentences = [
    "Tree is very tall",
    "failure make a success",
    "success is not easy",
    "All that glitters is not gold.",
    "In our country is india."
];

let startTime;            // Store the start time
let isTyping = false;      // Track if typing is in progress
let timerInterval;         // Store the timer interval

const sentenceElement = document.getElementById('sentence');
const inputElement = document.getElementById('input');
const resultElement = document.getElementById('result');
const startButton = document.getElementById('start-btn');
const submitButton = document.getElementById('submit-btn');
const timerElement = document.getElementById('timer');

// Start game when Start button is clicked
startButton.addEventListener('click', startGame);

// Submit game result when Submit button is clicked
submitButton.addEventListener('click', () => endGame(inputElement.value));

// Start game function
function startGame() {
    resetGame(); // Reset everything before starting

    // Display a random sentence
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceElement.textContent = randomSentence;

    inputElement.removeAttribute('disabled'); // Enable input field
    inputElement.focus(); // Set focus on input field

    isTyping = true;
    startTime = new Date().getTime(); // Record the start time
    submitButton.removeAttribute('disabled'); // Enable Submit button

    // Start the timer
    let secondsElapsed = 0;
    timerInterval = setInterval(() => {
        secondsElapsed++;
        timerElement.textContent = `Time: ${secondsElapsed}s`;
    }, 1000);
}

// Reset game state
function resetGame() {
    clearInterval(timerInterval); // Clear any existing timer
    inputElement.value = ''; // Clear the input field
    resultElement.textContent = ''; // Clear previous result
    timerElement.textContent = 'Time: 0s'; // Reset timer display
    inputElement.setAttribute('disabled', true); // Disable input by default
    submitButton.setAttribute('disabled', true); // Disable Submit button
}

// End game and calculate WPM
function endGame(typedText) {
    if (!isTyping) return; // Do nothing if game is not active

    isTyping = false; // Stop typing state
    clearInterval(timerInterval); // Stop the timer

    const endTime = new Date().getTime(); // Capture end time
    const timeTaken = (endTime - startTime) / 1000; // Calculate time in seconds

    const wordsTyped = typedText.trim().split(/\s+/).length; // Count words typed
    const speed = Math.round((wordsTyped / timeTaken) * 60); // Calculate WPM

    let feedback = `Your typing speed is ${speed} WPM.`;

    // Check if the typed text matches the original sentence
    const originalText = sentenceElement.textContent;
    if (typedText.trim() === originalText) {
        feedback += " Great job! You typed the sentence correctly.";
    } else {
        feedback += " Oops! The sentence was not typed correctly.";
    }

    resultElement.textContent = feedback; // Display the result
    inputElement.setAttribute('disabled', true); // Disable input field
    submitButton.setAttribute('disabled', true); // Disable Submit button
}
