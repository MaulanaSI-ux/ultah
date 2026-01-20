/* ================= CONFIG ================= */
const PASSWORD = "bitaa";


/* ================= DOM ================= */
const gate = document.getElementById('gate');
const enterBtn = document.getElementById('enterBtn');
const app = document.getElementById('app');

const themeToggle = document.getElementById('themeToggle');
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const openLetterBtn = document.getElementById('openLetterBtn');
const letterModal = document.getElementById('letterModal');
const closeLetter = document.getElementById('closeLetter');
const letterText = document.getElementById('letterText');

const loveBtn = document.getElementById('loveBtn');
const confettiCanvas = document.getElementById('confettiCanvas');

/* ================= STATE ================= */
let dark = false;

/* ================= PHOTOS ================= */
let photos = [
  'img/bita.jpg',
  'img/IMG-20251206-WA0057.jpg',
  'img/IMG-20251206-WA0054.jpg',
  'img/byta.jpg',
  'img/tata.jpg',
  'img/lala.jpg'
];

/* ================= PASSWORD GATE ================= */
if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    const v = document.getElementById('pw').value || '';
    if (v === PASSWORD) {
      gate.style.display = 'none';
      app.style.display = 'block';
      startPage();
    } else {
      alert('Password salah cuy 😭');
    }
  });
}

/* ================= START PAGE ================= */
function startPage() {
  renderSlider();
}

/* ================= THEME ================= */
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    dark = document.body.classList.contains('dark');
    themeToggle.textContent = dark ? '☀' : '🌙';
  });
}

/* ================= SLIDER ================= */
function renderSlider() {
  if (!slider) return;
  slider.innerHTML = '';

  photos.forEach((src) => {
    const s = document.createElement('div');
    s.className = 'slide';
    s.innerHTML = `<img src="${src}" class="photo" draggable="false">`;
    slider.appendChild(s);
  });

  attachPhotoHandlers();
}

function attachPhotoHandlers() {
  const imgs = slider.querySelectorAll('.photo');

  imgs.forEach(img => {
    img.addEventListener('mouseenter', () => img.classList.add('touching'));
    img.addEventListener('mouseleave', () => img.classList.remove('touching'));

    img.addEventListener('click', () => {
      img.classList.toggle('zoom');
    });
  });
}

/* ================= SLIDER NAV ================= */
if (prevBtn && slider) {
  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -240, behavior: 'smooth' });
  });
}

if (nextBtn && slider) {
  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 240, behavior: 'smooth' });
  });
}

/* ================= LETTER ================= */
if (openLetterBtn && letterModal) {
  openLetterBtn.addEventListener('click', () => {
    letterModal.style.opacity = 1;
    letterModal.style.pointerEvents = 'auto';
    letterModal.querySelector('.envelope').classList.add('open');

    const saved = localStorage.getItem('birthday_letter');
    if (saved) letterText.textContent = saved;
  });
}

if (closeLetter) {
  closeLetter.addEventListener('click', () => {
    letterModal.querySelector('.envelope').classList.remove('open');
    setTimeout(() => {
      letterModal.style.opacity = 0;
      letterModal.style.pointerEvents = 'none';
    }, 400);
  });
}

if (letterText) {
  letterText.addEventListener('dblclick', () => {
    const newText = prompt('Edit surat:', letterText.textContent);
    if (newText !== null) {
      letterText.textContent = newText;
      localStorage.setItem('birthday_letter', newText);
    }
  });
}

/* ================= LOVE EFFECT ================= */
if (loveBtn) {
  loveBtn.addEventListener('click', (e) => {
    explodeHearts(e.clientX, e.clientY);
  });
}

function explodeHearts(x, y) {
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('div');
    el.textContent = ['💖', '💗', '💕', '💞'][Math.floor(Math.random() * 4)];
    el.style.position = 'fixed';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = (14 + Math.random() * 20) + 'px';
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);

    const dx = (Math.random() - 0.5) * 200;
    const dy = -(100 + Math.random() * 200);

    el.animate([
      { transform: 'translate(0,0)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
    ], { duration: 1200 });

    setTimeout(() => el.remove(), 1500);
  }
}
