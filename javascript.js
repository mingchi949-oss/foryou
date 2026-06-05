const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');
const statusGif = document.getElementById('status-gif');

// The list of guilt-tripping phrases from the video
const noPhrases = [
    "ARE YOU SURE?",
    "REALLY??",
    "SURE ABOUT THAT?",
    "I am VERY sad...",
    "Ok fine, I am telling you to STOP...",
    "If you say no, I will really be sad...",
    "Pookie please...",
    "I will be very very very sad..."
];

// Corresponding GIFs for the guilt-tripping
const noGifs = [
    "giphy (1).webp", // Shocked
    "200 (2).webp", // Crying
    "200 (3).webp", // Sad face
    "200 (4).webp", // Emotional
 // Maximum sadness
];

let phraseIndex = 0;

function handleNoInteraction(event) {
    // Check if it's a touch device (for mobile-like click behavior)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Only move the button if it's a click/tap, or a mouseenter on a non-touch device.
    // This ensures that on mobile, only a tap (click) triggers movement,
    // and avoids potential issues with emulated mouseenter events.
    if (event.type === 'click' || (event.type === 'mouseenter' && !isTouchDevice)) {
        // 1. Move the No button to a random position
        const padding = 20;
        const yesRect = yesBtn.getBoundingClientRect(); // Get current Yes button area
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        let randomX, randomY;
        let attempts = 0;

        // Try to find a position that doesn't overlap with the Yes button
        do {
            randomX = Math.max(padding, Math.floor(Math.random() * maxX));
            randomY = Math.max(padding, Math.floor(Math.random() * maxY));
            attempts++;
        } while (
            attempts < 50 &&
            randomX < yesRect.right + padding &&
            randomX + noBtn.offsetWidth > yesRect.left - padding &&
            randomY < yesRect.bottom + padding &&
            randomY + noBtn.offsetHeight > yesRect.top - padding
        );

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '5'; // Keep No button below Yes button
    }

    // 2. Change the text and image
    if (phraseIndex < noPhrases.length) {
        noBtn.innerText = noPhrases[phraseIndex];
        statusGif.src = noGifs[Math.min(phraseIndex, noGifs.length - 1)];
        phraseIndex++;
    } else {
        // Keep the last phrase and image visible if they keep trying to say No
        noBtn.innerText = noPhrases[noPhrases.length - 1];
        statusGif.src = noGifs[noGifs.length - 1];
    }
}

// Trigger logic on both click and mouse hover for maximum trap efficiency
// Always move the button so it never "joins" the Yes button area
noBtn.addEventListener('mouseenter', (event) => handleNoInteraction(event));
noBtn.addEventListener('click', (event) => handleNoInteraction(event));

// When they finally click YES
yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
});