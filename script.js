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
const birthdayAudio = new Audio('song.mp3');
birthdayAudio.loop = true;
birthdayAudio.volume = 0.35;
birthdayAudio.preload = 'auto';

function updateMusicButton(isPlaying) {
  if (!musicToggle) return;
  musicToggle.dataset.playing = String(isPlaying);
  musicToggle.innerHTML = isPlaying
    ? '<span>♫</span> Music On'
    : '<span>♫</span> Music Off';
}

async function playMusic() {
  try {
    birthdayAudio.muted = false;
    await birthdayAudio.play();
    updateMusicButton(true);
    return true;
  } catch (error) {
    updateMusicButton(false);
    console.warn('Audio play prevented until user interaction:', error);
    return false;
  }
}

function pauseMusic() {
  birthdayAudio.pause();
  birthdayAudio.currentTime = 0;
  updateMusicButton(false);
}

if (musicToggle) {
  updateMusicButton(true);

  const startOnInteraction = async () => {
    const started = await playMusic();
    if (!started) {
      document.addEventListener('pointerdown', startOnInteraction, { once: true });
      document.addEventListener('keydown', startOnInteraction, { once: true });
    }
    document.removeEventListener('pointerdown', startOnInteraction);
    document.removeEventListener('keydown', startOnInteraction);
  };

  document.addEventListener('pointerdown', startOnInteraction, { once: true });
  document.addEventListener('keydown', startOnInteraction, { once: true });

  musicToggle.addEventListener('click', async (event) => {
    event.stopPropagation();
    const isPlaying = musicToggle.dataset.playing === 'true';

    if (isPlaying) {
      pauseMusic();
    } else {
      await playMusic();
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
