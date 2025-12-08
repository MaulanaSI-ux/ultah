/* CONFIG */
const PASSWORD = "sayangku"; // ubah kalau mau

/* DOM */
const gate = document.getElementById('gate');
const enterBtn = document.getElementById('enterBtn');
const app = document.getElementById('app');

const themeToggle = document.getElementById('themeToggle');
const slider = document.getElementById('slider');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const clearBtn = document.getElementById('clearBtn');

const openLetterBtn = document.getElementById('openLetterBtn');
const letterModal = document.getElementById('letterModal');
const envFront = document.getElementById('envFront');
const letterPaper = document.getElementById('letterPaper');
const closeLetter = document.getElementById('closeLetter');

const loveBtn = document.getElementById('loveBtn');
const confettiCanvas = document.getElementById('confettiCanvas');

let dark = false;
let musicPlaying = false;

/* DEFAULT PHOTOS */
let photos = [
  'img/bita.jpg',
  'img/IMG-20251206-WA0057.jpg',
  'img/IMG-20251206-WA0054.jpg',
  'img/byta.jpg',
  'img/tata.jpg',
  'img/lala.jpg',
  'img/'
];

/* AUTH / GATE */
enterBtn.addEventListener('click', ()=>{
  const v = document.getElementById('pw').value || '';
  if(v === PASSWORD){
    gate.style.display = 'none';
    app.style.display = 'block';
    startPage();
  } else {
    alert('Password salah cuy 😭');
  }
});

/* STARTUP */
function startPage(){
  renderSlider();
  startHearts();
  startConfettiEngine();
  try { bgMusic.play().catch(()=>{}); playBtn.textContent='⏸'; musicPlaying=true; } catch(e){}
}

/* THEME TOGGLE */
themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  dark = document.body.classList.contains('dark');
  themeToggle.textContent = dark ? '☀' : '🌙';
});

/* RENDER SLIDER */
function renderSlider(){
  slider.innerHTML = '';
  photos.forEach((src, idx)=>{
    const s = document.createElement('div');
    s.className = 'slide';
    s.innerHTML = `
      <img src="${src}" class="photo" data-idx="${idx}" draggable="false">
    `;
    slider.appendChild(s);
  });
  attachPhotoHandlers();
}

/* HOVER / TOUCH EFFECT */
function attachPhotoHandlers(){
  const imgs = slider.querySelectorAll('.photo');
  imgs.forEach(img=>{
    img.addEventListener('mouseenter', ()=> img.classList.add('touching'));
    img.addEventListener('mouseleave', ()=> img.classList.remove('touching'));
    img.addEventListener('touchstart', ()=> img.classList.add('touching'));
    img.addEventListener('touchend', ()=> img.classList.remove('touching'));

    img.addEventListener('click', ()=> {
      if(img.style.transform.includes('scale(1.4)')){
        img.style.transform = '';
      } else {
        img.style.transform = 'translateY(-10px) scale(1.4)';
      }
    });
  });
}

/* NAV SLIDE BY SCROLL */
document.addEventListener('DOMContentLoaded', () => {
  prevBtn && prevBtn.addEventListener('click', ()=> {
    slider.scrollBy({left: -240, behavior:'smooth'});
  });
  nextBtn && nextBtn.addEventListener('click', ()=> {
    slider.scrollBy({left: 240, behavior:'smooth'});
  });
});

/* UPLOAD IMAGES */
uploadBtn.addEventListener('click', ()=> fileInput.click());

fileInput.addEventListener('change', (e)=>{
  const files = Array.from(e.target.files || []);
  files.forEach(file=>{
    if(!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (ev)=>{
      photos.push(ev.target.result);
      savePhotos();
      renderSlider();
    };
    reader.readAsDataURL(file);
  });
  fileInput.value = '';
});



/* LETTER MODAL */
openLetterBtn.addEventListener('click', ()=>{
  letterModal.style.pointerEvents = 'auto';
  letterModal.style.opacity = 1;
  letterModal.querySelector('.envelope').classList.add('open');
  
  const saved = localStorage.getItem('birthday_letter') 
    || document.getElementById('letterText').textContent;

  document.getElementById('letterText').textContent = saved;
});

closeLetter.addEventListener('click', ()=>{
  letterModal.querySelector('.envelope').classList.remove('open');
  setTimeout(()=>{
    letterModal.style.pointerEvents='none';
    letterModal.style.opacity=0;
  }, 400);
});

document.getElementById('letterText').addEventListener('dblclick', ()=>{
  const cur = document.getElementById('letterText').textContent;
  const newText = prompt('Edit surat (double-click untuk edit):', cur);
  if(newText !== null){
    document.getElementById('letterText').textContent = newText;
    localStorage.setItem('birthday_letter', newText);
  }
});

/* LOVE EXPLOSION */
loveBtn.addEventListener('click', (e)=>{
  explodeHearts(e.clientX, e.clientY);
});

function explodeHearts(x,y){
  for(let i=0;i<18;i++){
    const el = document.createElement('div');
    el.textContent = ['💖','💗','💞','💕'][Math.floor(Math.random()*4)];
    el.style.position='fixed';
    el.style.left = (x - 10 + (Math.random()-0.5)*60) + 'px';
    el.style.top = (y - 10 + (Math.random()-0.5)*60) + 'px';
    el.style.fontSize = (12 + Math.random()*22) + 'px';
    el.style.zIndex = 100;
    el.style.opacity = 1;

    document.body.appendChild(el);

    const dx = (Math.random()-0.5)*200;
    const dy = -(100 + Math.random()*300);

    el.animate([
      { transform: 'translate(0,0) scale(1)', opacity:1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.8)`, opacity:0 }
    ], { duration: 1200 + Math.random()*800, easing: 'cubic-bezier(.2,.8,.2,1)' });

    setTimeout(()=> el.remove(), 2000);
  }
}

/* CONFETTI ENGINE (placeholder biar ga error) */
function startHearts(){}
function startConfettiEngine(){}

