// Tahun otomatis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Tema: simpan & terapkan preferensi
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
});

// Skip link: fokus ke konten (aksesibilitas)
const konten = document.getElementById('konten');
document.querySelector('a[href="#konten"]').addEventListener('click', () => {
  setTimeout(() => konten.focus(), 0);
});

// Validasi form kontak sederhana (client-side)
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message || '';
}

function isEmailValid(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
  let valid = true;
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const subjek = document.getElementById('subjek').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  // Reset errors
  setError('err-nama', '');
  setError('err-email', '');
  setError('err-subjek', '');
  setError('err-pesan', '');

  if (!nama) { setError('err-nama', 'Nama wajib diisi.'); valid = false; }
  if (!email) { setError('err-email', 'Email wajib diisi.'); valid = false; }
  else if (!isEmailValid(email)) { setError('err-email', 'Format email tidak valid.'); valid = false; }

  if (!subjek) { setError('err-subjek', 'Subjek wajib diisi.'); valid = false; }
  if (!pesan || pesan.length < 10) { setError('err-pesan', 'Pesan minimal 10 karakter.'); valid = false; }

  if (!valid) {
    e.preventDefault();
    return;
  }

  // Optional: disable tombol saat submit
  submitBtn.disabled = true;
  submitBtn.textContent = 'Mengirim...';
});

// Progressive enhancement: re-enable button if page restored from bfcache
window.addEventListener('pageshow', () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Kirim';
});
// Efek fade-in saat scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Hamburger toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Ripple effect untuk tombol
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});
