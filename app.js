function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode || e.target.dataset.key}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode || e.target.dataset.key}"]`);
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
    key.addEventListener('click', playSoundOnClick);
});

window.addEventListener('keydown', playSound);
