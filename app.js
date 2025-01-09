// First, get all the elements we need
const keys = Array.from(document.querySelectorAll('.key'));
const audioElements = document.querySelectorAll('audio');

// Then initialize our counter
let loadedAudios = 0;
const totalAudios = audioElements.length;

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function playSound(e) {
    const keyCode = e.keyCode || e.target.closest('.key').dataset.key;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`div[data-key="${keyCode}"]`);
    if (!audio) return;

    const keyPressed = String.fromCharCode(keyCode);
    console.log(`Key pressed: ${keyPressed}`);
    
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

function playSoundOnClick(e) {
    const key = e.target.closest('.key');
    if (!key) return;
    
    const keyCode = key.dataset.key;
    playSound({ keyCode });
    
    // Add visual feedback for mobile
    key.style.opacity = '0.7';
    setTimeout(() => {
        key.style.opacity = '1';
    }, 100);
}

// Add event listeners
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('pointerdown', playSoundOnClick);
});

window.addEventListener('keydown', playSound);

// Audio loading and error handling
audioElements.forEach(audio => {
    audio.load();
    
    audio.addEventListener('error', () => {
        console.error(`Error loading audio file: ${audio.src}`);
    });
    
    audio.addEventListener('canplaythrough', () => {
        loadedAudios++;
        if (loadedAudios === totalAudios) {
            document.body.classList.add('ready');
            console.log('All audio files loaded!');
        }
    });
});
