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







// ========== TEAM CARDS ==========
// ========== TEAM CARDS ==========
// Fetch and render team dynamically
fetch('team_details.json')
  .then(res => res.json())
  .then(data => renderTeamCards(data))
  .catch(err => console.error('Error loading team:', err));

function renderTeamCards(data) {
  const grid = document.querySelector('.team-grid');
  grid.innerHTML = '';

  // Filter only batch B23
  const filtered = data.filter(member => member.batch === "B23");

  filtered.forEach(member => {
    const card = document.createElement('div');
    card.className = 'team-card';

    const photoDiv = document.createElement('div');
    photoDiv.className = 'card-photo';
    const img = document.createElement('img');
    img.src = member.photo;
    img.alt = member.name;
    photoDiv.appendChild(img);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'card-info';
    const nameP = document.createElement('p');
    nameP.className = 'card-name';
    nameP.textContent = member.name;
    const posP = document.createElement('p');
    posP.className = 'card-position';
    posP.textContent = member.position;
    infoDiv.appendChild(nameP);
    infoDiv.appendChild(posP);

    card.appendChild(photoDiv);
    card.appendChild(infoDiv);

    grid.appendChild(card);
  });
}


//============================================================
























fetch('team_details.json')
  .then(res => res.json())
  .then(data => {
    const b24Members = data.filter(m => m.batch === "B24").slice(0, 27);
    const container = document.getElementById('honeycomb');

    // Set max hex per row for desktop, tablet, mobile
    const breakpoints = [
      { maxWidth: 600, n: 3 },   // mobile
      { maxWidth: 900, n: 5 },   // tablet
      { maxWidth: Infinity, n: 7 } // desktop
    ];

    b24Members.forEach((member, index) => {
      const li = document.createElement('li');
      li.className = 'item';

      const a = document.createElement('a');
      a.href = '#';
      a.title = member.name;

      const img = document.createElement('img');
      img.src = member.photo;
      img.alt = member.name;

      a.appendChild(img);
      li.appendChild(a);
      container.appendChild(li);

      // Set background dynamically
      a.style.backgroundImage = `url('${member.photo}')`;

      // Add row number
      function getRowNumber() {
        const width = window.innerWidth;
        const bp = breakpoints.find(b => width <= b.maxWidth);
        return Math.floor(index / bp.n) + 1;
      }
      li.setAttribute('data-row', getRowNumber());
    });
  })
  .catch(err => console.error(err));
