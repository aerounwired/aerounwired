
const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.nav-center');

// when hamburger clicked
hamburger.addEventListener('click', () => {
  navCenter.classList.toggle('active');
  hamburger.classList.toggle('open'); 
});

// Close sidebar when a link is clicked
document.querySelectorAll('.nav-center a').forEach(link => {
  link.addEventListener('click', () => {
    navCenter.classList.remove('active');
    hamburger.classList.remove('open');
  });
});

// Close sidebar if clicked outside 
document.addEventListener('click', (e) => {
  if (!navCenter.contains(e.target) && !hamburger.contains(e.target)) {
    navCenter.classList.remove('active');
    hamburger.classList.remove('open');
  }
});



