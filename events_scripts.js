
document.addEventListener("DOMContentLoaded", () => {
  const eventData = [
    { name: "Computational Fluid Dynamics", image: "fluid_dynamics.png" },
    { name: "ICARUS", image: "icarus.png" },
    { name: "ALBATROSS", image: "albatross.png" },
    { name: "Drone-Tech Workshop", image: "drone.png" },
    { name: "Aircraft-Design Workshop", image: "aircraft.png" }
  ];

  const track = document.getElementById("cards-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");

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


  dotsContainer.innerHTML = "";
  eventData.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      render();
    });
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    [...dotsContainer.children].forEach((dot, i) =>
      dot.classList.toggle("active", i === index)
    );
  }


function render() {
  const cardWidth = cards[0].offsetWidth;
  const gap = 40; 

  cards.forEach((card) => {
    card.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    card.style.position = "absolute";
    card.style.left = "50%";
    card.style.top = "50%";
    card.style.transformOrigin = "center center";
    card.style.opacity = "0";
    card.style.zIndex = "0";
  });

  const positions = [-2, -1, 0, 1, 2];
  positions.forEach((offset) => {
    const cardIndex = (index + offset + total) % total;
    const card = cards[cardIndex];

    
    
    let shiftX = offset * (cardWidth * 0.9 + gap);

    let scale = 0.7;
    let opacity = 0.6;

    if (offset === 0) {
      scale = 1.1; 
      opacity = 1;
    } else if (Math.abs(offset) === 1) {
      scale = 0.9;
      opacity = 0.9;
    } else {
      scale = 0.8;
      opacity = 0.75;
    }

    card.style.opacity = opacity.toString();
    card.style.zIndex = String(5 - Math.abs(offset));
    card.style.transform = `translate(calc(-50% + ${shiftX}px), -50%) scale(${scale})`;
  });

  updateDots();
}
window.addEventListener("resize", () => {
  render();
});



  function next() {
    index = (index + 1) % total;
    render();
  }

  function prev() {
    index = (index - 1 + total) % total;
    render();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

 
  render();
});









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

