// script.js

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Theme toggle
const themeToggleBtn = document.getElementById('themeToggle');

function toggleTheme() {
  const body = document.body;

  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    themeToggleBtn.textContent = '🌙';
  } else {
    body.classList.add('light-mode');
    themeToggleBtn.textContent = '☀️';
  }
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
