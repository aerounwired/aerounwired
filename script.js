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

  // Ensure everything recalculates properly after all assets load
  window.addEventListener("load", () => {
    render();
  });

  // Also re-render on resize
  window.addEventListener("resize", () => {
    direction = 0;
    render();
  });

  // =======================SWIPE SUPPORT=======================================
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let movedX = 0;
  let movedY = 0;

  // Ensure track exists before binding events
  if (!track) {
    console.error("Carousel track element not found. Ensure #cards-track exists in the DOM.");
    return;
  }

  function bindTouchEvents() {
    // Remove existing listeners to prevent duplicates
    track.removeEventListener("touchstart", dragStart);
    track.removeEventListener("touchmove", dragMove);
    track.removeEventListener("touchend", dragEnd);
    track.removeEventListener("mousedown", dragStart);
    track.removeEventListener("mousemove", dragMove);
    track.removeEventListener("mouseup", dragEnd);
    track.removeEventListener("mouseleave", dragEnd);

    // Add touch and mouse event listeners
    track.addEventListener("touchstart", dragStart, { passive: true });
    track.addEventListener("touchmove", dragMove, { passive: false });
    track.addEventListener("touchend", dragEnd, { passive: true });
    track.addEventListener("mousedown", dragStart, { passive: true });
    track.addEventListener("mousemove", dragMove, { passive: false });
    track.addEventListener("mouseup", dragEnd, { passive: true });
    track.addEventListener("mouseleave", dragEnd, { passive: true });
  }

  function dragStart(e) {
    if (!track.contains(e.target)) return; // Ignore events outside track
    isDragging = true;
    startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    startY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    movedX = 0;
    movedY = 0;
    console.debug("Drag start:", startX, startY); // Debug log
  }

  function dragMove(e) {
    if (!isDragging) return;

    movedX = (e.type === "touchmove" ? e.touches[0].clientX : e.clientX) - startX;
    movedY = (e.type === "touchmove" ? e.touches[0].clientY : e.clientY) - startY;

    // If horizontal movement is dominant, prevent default scrolling
    if (Math.abs(movedX) > Math.abs(movedY) && Math.abs(movedX) > 10) {
      e.preventDefault();
      console.debug("Horizontal swipe detected:", movedX, movedY); // Debug log
    }
  }

  function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const endY = e.type === "touchend" ? e.changedTouches[0].clientY : e.clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    const threshold = 50; // Minimum swipe distance

    console.debug("Drag end:", diffX, diffY); // Debug log

    // Trigger carousel navigation only if horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        console.debug("Swipe right -> prev");
        prev();
      } else {
        console.debug("Swipe left -> next");
        next();
      }
    }
  }

  // Bind events initially
  bindTouchEvents();

  // Rebind events on resize to handle layout changes
  window.addEventListener("resize", bindTouchEvents);
});


















//=======================================================================================















// ===============================================





const sponsors = [
  { name: "Google", logo: "images/ansys.png" },
  { name: "Microsoft", logo: "images/quadkart.png" },
  { name: "Amazon", logo: "images/image 2.png" },
  { name: "OpenAI", logo: "images/image 5.png" },
  { name: "OpenAI", logo: "images/image 7.png" },
  { name: "OpenAI", logo: "images/image 8.png" }
];

const track = document.getElementById("sponsorsTrack");
let speed = window.innerWidth <= 600 ? 0.5 : 1; 

let sponsorElements = [];

// Create sponsor div
function createSponsorDiv(sponsor) {
  const div = document.createElement("div");
  div.classList.add("sponsor");
  const img = document.createElement("img");
  img.src = sponsor.logo;
  img.alt = sponsor.name;
  img.onerror = () => {
    img.src = "images/fallback.png";
    img.alt = "Sponsor logo unavailable";
  };
  div.appendChild(img);
  return div;
}

// Populate the track with multiple repeats
function initTrack() {
  track.innerHTML = "";
  sponsorElements = [];
  
  // Repeat sponsors 10 times for smooth loop
  for (let i = 0; i < 10; i++) {
    for (let sponsor of sponsors) {
      const div = createSponsorDiv(sponsor);
      track.appendChild(div);
      sponsorElements.push(div);
    }
  }
}

initTrack();

let trackOffset = 0;

function animate() {
  trackOffset -= speed; // move left
  track.style.transform = `translateX(${trackOffset}px)`;

  // Check if first element is completely out of view
  const first = sponsorElements[0];
  const firstWidth = first.offsetWidth + parseInt(getComputedStyle(first).marginLeft) + parseInt(getComputedStyle(first).marginRight);

  if (-trackOffset >= firstWidth) {
    // Dequeue first and enqueue at the end
    trackOffset += firstWidth; // adjust offset
    track.appendChild(first);
    sponsorElements.push(sponsorElements.shift());
  }

  requestAnimationFrame(animate);
}

// Start animation
animate();

// Optional: Re-init on resize
window.addEventListener("resize", () => {
  initTrack();
  trackOffset = 0;
});
