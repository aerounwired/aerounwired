const viewport = document.getElementById('cards-viewport');
const track = document.getElementById('cards-track');
const cards = track.querySelectorAll('.event-card');

let activeIndex = 1;

function centerActive() {
  cards.forEach(c => c.classList.remove('active'));
  const active = cards[activeIndex];
  active.classList.add('active');

  requestAnimationFrame(() => {
    const activeCenter = active.offsetLeft + active.offsetWidth / 2;
    const target = activeCenter - viewport.clientWidth / 2;

    const max = track.scrollWidth - viewport.clientWidth;
    const clamped = Math.max(0, Math.min(target, max));

    track.style.transform = `translateX(-${clamped}px)`;
  });
}

function prev() {
  if (activeIndex > 0) {
    activeIndex--;
    centerActive();
  }
}

function next() {
  if (activeIndex < cards.length - 1) {
    activeIndex++;
    centerActive();
  }
}

window.addEventListener('resize', centerActive);
centerActive();
