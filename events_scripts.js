// =======================MAIN=======================================
document.addEventListener("DOMContentLoaded", () => {
  const eventData = [
    { name: "Computational Fluid Dynamics", image: "competitions/fluid_dynamics.png" },
    { name: "ICARUS", image: "competitions/icarus.png" },
    { name: "ALBATROSS", image: "competitions/albatross.png" },
    { name: "Drone-Tech Workshop", image: "competitions/drone.png" },
    { name: "Aircraft-Design Workshop", image: "competitions/aircraft.png" }
  ];

  const track = document.getElementById("cards-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");

  // Insert cards
  track.innerHTML = eventData
    .map(
      (d) => `
      <div class="event-card">
        <div class="eventimage"><img src="${d.image}" alt="${d.name}"></div>
        <p class="workshopName">${d.name}</p>
      </div>
    `
    )
    .join("");

  const cards = Array.from(track.querySelectorAll(".event-card"));
  const total = cards.length;
  let index = 0; 
  let direction = 0;
  let lastVisibleIndices = new Set();

  // Create dots
  dotsContainer.innerHTML = "";
  eventData.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      direction = 0;
      render();
    });
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    [...dotsContainer.children].forEach((dot, i) =>
      dot.classList.toggle("active", i === index)
    );
  }

  function getConfig() {
    const isMobile = window.innerWidth < 768;
    return {
      isMobile,
      visibleCount: isMobile ? 3 : 5,
      gap: isMobile ? 45: 75,
      maxScale: isMobile ? 1.6 : 1.6
    };
  }

  function render() {
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const config = getConfig();
    const step = (cardWidth * 1.05) + config.gap;
    const half = Math.floor(config.visibleCount / 2);

    const positions = [];
    for (let i = -half; i <= half; i++) {
      positions.push(i);
    }

    const currentVisibleIndices = new Set(
      positions.map((offset) => (index + offset + total) % total)
    );

    cards.forEach((card) => {
      card.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      card.style.position = "absolute";
      card.style.left = "50%";
      card.style.top = "50%";
      card.style.transformOrigin = "center center";
      card.style.zIndex = "0";
    });

    if (direction !== 0) {
      const outgoingIndices = [...lastVisibleIndices].filter(
        (i) => !currentVisibleIndices.has(i)
      );
      const exitOffset = direction > 0 ? half + 1 : -half - 1;
      const exitShift = exitOffset * step;
      const exitScale = 1.0;

      outgoingIndices.forEach((outIdx) => {
        const card = cards[outIdx];
        card.style.opacity = "0";
        card.style.transform = `translate(calc(-50% + ${exitShift}px), -50%) scale(${exitScale})`;
        card.style.zIndex = "2";
      });
    }

   positions.forEach((offset) => {
  const cardIndex = (index + offset + total) % total;
  const card = cards[cardIndex];

  let scale = offset === 0 ? config.maxScale : 1.0;

  // Add extra spacing near the active card
  let extraGap = 0;
  if (Math.abs(offset) === 1) {
    extraGap = config.gap * 0.5; // tweak multiplier (0.3–0.7) until it looks good
    extraGap *= offset; // left vs right direction
  }

  let shiftX = (offset * step) + extraGap;

  card.style.opacity = "1";
  card.style.zIndex = String(5 - Math.abs(offset));
  card.style.transform = `translate(calc(-50% + ${shiftX}px), -50%) scale(${scale})`;
});


    const activeIndices =
      direction !== 0
        ? new Set([...currentVisibleIndices, ...lastVisibleIndices])
        : currentVisibleIndices;

    cards.forEach((card, cardIdx) => {
      if (!activeIndices.has(cardIdx)) {
        card.style.transition = "0s";
        card.style.opacity = "0";
      }
    });

    lastVisibleIndices = currentVisibleIndices;
    direction = 0;

    updateDots();
  }

  function next() {
    const newIndex = (index + 1 + total) % total;
    direction = -1;

    const config = getConfig();
    const half = Math.floor(config.visibleCount / 2);
    const step = (cards[0].offsetWidth * 1.05) + config.gap;

    const incomingOffset = half + 1;
    const incomingCardIndex = (newIndex + half + total) % total;
    const incomingCard = cards[incomingCardIndex];

    incomingCard.style.transition = "0s";
    let shiftX = incomingOffset * step;
    incomingCard.style.opacity = "0";
    incomingCard.style.transform = `translate(calc(-50% + ${shiftX}px), -50%) scale(1.0)`;

    index = newIndex;
    render();
  }

  function prev() {
    const newIndex = (index - 1 + total) % total;
    direction = 1;

    const config = getConfig();
    const half = Math.floor(config.visibleCount / 2);
    const step = (cards[0].offsetWidth * 1.05) + config.gap;

    const incomingOffset = -half - 1;
    const incomingCardIndex = (newIndex + (-half) + total) % total;
    const incomingCard = cards[incomingCardIndex];

    incomingCard.style.transition = "0s";
    let shiftX = incomingOffset * step;
    incomingCard.style.opacity = "0";
    incomingCard.style.transform = `translate(calc(-50% + ${shiftX}px), -50%) scale(1.0)`;

    index = newIndex;
    render();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // Initial render
  render();

  // Ensure everything recalculates properly after all assets load
  window.addEventListener("load", () => {
    render();
  });

  // Also re-render on resize
  window.addEventListener("resize", () => {
    direction = 0;
    render();
  });
});
//=======================================================================================








document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");


  const toggleSidebar = (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active"); 
    sidebar.classList.toggle("active");   
  };

  hamburger.addEventListener("click", toggleSidebar);

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      sidebar.classList.remove("active");
    }
  });

  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      sidebar.classList.remove("active");
    });
  });
});

