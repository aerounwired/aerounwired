// ====================== EVENT CARDS AND CAROUSEL ======================
document.addEventListener("DOMContentLoaded", () => {

  // ===== Event data =====
  const eventData = [
    { name: 'Computational Fluid Dynamics', image: 'fluid_dynamics.png' },
    { name: 'ICARUS', image: 'icarus.png' },
    { name: 'ALBATROSS', image: 'albatross.png' },
    { name: 'Drone-Tech Workshop', image: 'drone.png' },
    { name: 'Aircraft-Design Workshop', image: 'aircraft.png' }
  ];

  // ===== Generate HTML for cards =====
  let html = "";
  eventData.forEach((cardData, i) => {
    html += `
      <div class="event-card" id="card${i}">
        <div class="eventimage">
          <img src="${cardData.image}">
        </div>
        <p class="workshopName">${cardData.name}</p>
      </div>`;
  });

  document.getElementById("cards-track").innerHTML = html;

  // ===== Carousel logic =====
  const track = document.getElementById("cards-track");
  const cards = document.querySelectorAll(".event-card");
  const cardWidth = cards[0].offsetWidth + 160; // 160 = gap between cards (matches your CSS)
  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    // Center the active card
    cards.forEach(card => card.classList.remove("active"));
    const activeIndex = currentIndex + Math.floor(track.parentElement.offsetWidth / cardWidth / 2);
    if (cards[activeIndex]) cards[activeIndex].classList.add("active");
  }

  // ===== Next / Previous functions =====
  window.next = function () {
    if (currentIndex < cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth)) {
      currentIndex++;
      updateCarousel();
    }
  };

  window.prev = function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  };

  // ===== Initialize carousel =====
  updateCarousel();
  window.addEventListener('resize', updateCarousel);

  // ===== Hamburger toggle (from your previous code) =====
  const hamburger = document.querySelector('.hamburger');
  const navCenter = document.querySelector('.nav-center');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navCenter.classList.toggle('active');
      hamburger.classList.toggle('open'); 
    });
  }

});
