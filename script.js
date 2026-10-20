const BIRTHDAY_DATE = '2026-10-21T00:00:00';

const countdownEls = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds'),
};

function updateCountdown() {
  if (!countdownEls.days) return;

  const diff = new Date(BIRTHDAY_DATE).getTime() - Date.now();
  if (diff <= 0) {
    countdownEls.days.textContent = '00';
    countdownEls.hours.textContent = '00';
    countdownEls.minutes.textContent = '00';
    countdownEls.seconds.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEls.days.textContent = String(days).padStart(2, '0');
  countdownEls.hours.textContent = String(hours).padStart(2, '0');
  countdownEls.minutes.textContent = String(minutes).padStart(2, '0');
  countdownEls.seconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const hearts = document.querySelector('.floating-hearts');
if (hearts) {
  for (let i = 0; i < 22; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-particle';
    heart.textContent = i % 2 === 0 ? '❤' : '♡';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 12}s`;
    heart.style.fontSize = `${0.8 + Math.random() * 1.5}rem`;
    heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 180}px`);
    hearts.appendChild(heart);
  }
}

const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach((element) => observer.observe(element));
}

const wishButton = document.getElementById('wish-button');
if (wishButton) {
  wishButton.addEventListener('click', () => {
    wishButton.textContent = 'Wish Sent ✨';
    wishButton.disabled = true;
    wishButton.style.opacity = '0.8';
  });
}

const musicToggle = document.getElementById('music-toggle');
let audioCtx = null;
let musicTimer = null;

function playBirthdayTune() {
  if (!audioCtx) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioCtor();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const notes = [261.63, 329.63, 392.0, 329.63, 349.23, 440.0, 392.0, 329.63];
  let noteIndex = 0;

  musicTimer = setInterval(() => {
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = notes[noteIndex % notes.length];
    gain.gain.value = 0.03;

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
    noteIndex += 1;
  }, 280);
}

function stopBirthdayTune() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}

if (musicToggle) {
  musicToggle.addEventListener('click', () => {
    const isPlaying = musicToggle.dataset.playing === 'true';

    if (isPlaying) {
      musicToggle.dataset.playing = 'false';
      musicToggle.innerHTML = '<span>♫</span> Music Off';
      stopBirthdayTune();
    } else {
      musicToggle.dataset.playing = 'true';
      musicToggle.innerHTML = '<span>♫</span> Music On';
      playBirthdayTune();
    }
  });
}

const letterCard = document.querySelector('.letter-card');
const modal = document.getElementById('letter-modal');
const modalClose = document.getElementById('modal-close');

if (letterCard && modal) {
  letterCard.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
}

if (modalClose && modal) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

const giftButtons = document.querySelectorAll('.gift-box');
const giftMessage = document.getElementById('gift-message');

giftButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (giftMessage) {
      giftMessage.textContent = button.dataset.message;
      giftMessage.style.color = '#ff7aa8';
      giftMessage.style.fontWeight = '800';
    }
  });
});






















