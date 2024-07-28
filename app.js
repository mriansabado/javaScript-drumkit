function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function playSound(e) {
    const keyCode = e.keyCode || e.target.closest('.key').dataset.key;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`div[data-key="${keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

function playSoundOnClick(e) {
    const key = e.target.closest('.key');
    if (!key) return;
    
    const keyCode = key.dataset.key;
    playSound({ keyCode });
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('pointerdown', playSoundOnClick); // Use pointerdown for faster response on touch devices
});

// Preload all audio elements
const audioElements = document.querySelectorAll('audio');
audioElements.forEach(audio => {
    audio.load();
});

window.addEventListener('keydown', playSound);
