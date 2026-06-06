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
let yesButtonScale = 1.0;

function handleNoInteraction() {
    // Move the No button randomly to make it hard to click
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth) - (window.innerWidth / 2 - noBtn.offsetLeft);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight) - (window.innerHeight / 2 - noBtn.offsetTop);
    
    noBtn.style.transform = `translate(${x / 2}px, ${y / 2}px)`;

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

    // Zoom in the Yes button
    yesButtonScale += 0.2;
    yesBtn.style.transform = `scale(${yesButtonScale})`;
}

// Trigger logic on both click and mouse hover for maximum trap efficiency
// Always move the button so it never "joins" the Yes button area
noBtn.addEventListener('mouseenter', handleNoInteraction);
noBtn.addEventListener('click', handleNoInteraction);

// When they finally click YES
yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
});