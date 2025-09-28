//==============SIDEBAR-hamburger===================



document.addEventListener("DOMContentLoaded", () => {
        const hamburger = document.getElementById("hamburger");
        const sidebar = document.getElementById("sidebar");

        const toggleSidebar = (e) => {
          e.stopPropagation();
          const isActive = hamburger.classList.toggle("active");
          sidebar.classList.toggle("active");
          hamburger.setAttribute("aria-expanded", isActive);
        };

        hamburger.addEventListener("click", toggleSidebar);
        hamburger.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleSidebar(e);
          }
        });

        document.addEventListener("click", (e) => {
          if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove("active");
            sidebar.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
          }
        });

        sidebar.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            sidebar.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
          });
        });
      });


//======================================================================


// =======================MAIN=======================================
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
      gap: isMobile ? 45 : 75,
      maxScale: 1.6
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

      let extraGap = 0;
      if (Math.abs(offset) === 1) {
        extraGap = config.gap * 0.5;
        extraGap *= offset;
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

  window.addEventListener("load", render);
  window.addEventListener("resize", () => {
    direction = 0;
    render();
  });
});

// =======================SWIPE SUPPORT=======================================
let startX = 0;
let startY = 0;
let isDragging = false;
let movedX = 0;
let movedY = 0;

track.addEventListener("touchstart", dragStart, { passive: true });
track.addEventListener("touchmove", dragMove, { passive: false });
track.addEventListener("touchend", dragEnd);

function dragStart(e) {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  movedX = 0;
  movedY = 0;
}

function dragMove(e) {
  if (!isDragging) return;

  movedX = e.touches[0].clientX - startX;
  movedY = e.touches[0].clientY - startY;

  // If horizontal movement is dominant, prevent default vertical scrolling
  if (Math.abs(movedX) > Math.abs(movedY)) {
    e.preventDefault();
  }
}

function dragEnd(e) {
  if (!isDragging) return;
  isDragging = false;

  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  const threshold = 50; // Minimum swipe distance

  // Only trigger carousel if horizontal swipe is dominant
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
    if (diffX > 0) prev();
    else next();
  }
}

//=======================================================================================
//=======================================================================================















// ===============================================

 const sponsors = [
      { name: "Google", logo: "images/gmail_logo.png" },
      { name: "Microsoft", logo: "images/gmail_logo.png" },
      { name: "Amazon", logo: "images/gmail_logo.png" },
      { name: "OpenAI", logo: "images/gmail_logo.png" }
    ];

    const sponsorsTrack = document.getElementById("sponsorsTrack");
    const sponsorWidth = window.innerWidth <= 600 ? 80 : 140; // Logo width + margins (60px + 2*10px or 100px + 2*20px)
    const containerWidth = document.querySelector(".sponsors-container").offsetWidth;
    const visibleLogos = Math.ceil(containerWidth / sponsorWidth) + 1; // Enough logos to fill container + 1
    const totalLogos = sponsors.length * Math.ceil(visibleLogos / sponsors.length + 1); // Duplicate enough times
    const trackWidth = totalLogos * sponsorWidth;

    // Set animation duration based on track width for consistent speed
    const pixelsPerSecond = 50; // Adjust for desired speed
    const animationDuration = trackWidth / pixelsPerSecond;

    // Set track width and animation
    sponsorsTrack.style.width = `${trackWidth}px`;
    sponsorsTrack.style.animationDuration = `${animationDuration}s`;

    // Create sponsor element
    function createSponsorDiv(sponsor) {
      const div = document.createElement("div");
      div.classList.add("sponsor");
      const img = document.createElement("img");
      img.src = sponsor.logo;
      img.alt = sponsor.name;
      img.title = sponsor.name;
      img.onerror = () => {
        img.src = "images/fallback.png";
        img.alt = "Sponsor logo unavailable";
      };
      div.appendChild(img);
      return div;
    }

    // Add sponsors multiple times for seamless scroll
    for (let i = 0; i < totalLogos; i++) {
      const sponsor = sponsors[i % sponsors.length];
      sponsorsTrack.appendChild(createSponsorDiv(sponsor));
    }

    // Dynamically adjust on resize
    window.addEventListener("resize", () => {
      const newContainerWidth = document.querySelector(".sponsors-container").offsetWidth;
      const newSponsorWidth = window.innerWidth <= 600 ? 80 : 140;
      const newVisibleLogos = Math.ceil(newContainerWidth / newSponsorWidth) + 1;
      const newTotalLogos = sponsors.length * Math.ceil(newVisibleLogos / sponsors.length + 1);
      const newTrackWidth = newTotalLogos * newSponsorWidth;
      const newAnimationDuration = newTrackWidth / pixelsPerSecond;

      sponsorsTrack.innerHTML = "";
      sponsorsTrack.style.width = `${newTrackWidth}px`;
      sponsorsTrack.style.animationDuration = `${newAnimationDuration}s`;
      for (let i = 0; i < newTotalLogos; i++) {
        const sponsor = sponsors[i % sponsors.length];
        sponsorsTrack.appendChild(createSponsorDiv(sponsor));
      }
    });

    // Define keyframes dynamically
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${trackWidth}px);
        }
      }
    `;
    document.head.appendChild(styleSheet);