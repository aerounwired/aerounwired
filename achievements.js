let achievedata = [
  {name: "NITK", about: "AIR-5th in Wright Flight competition conducted by NITK", year: "2025", image: "gallery/NITK.jpg"},
  {name: "ADDC", about: "Unique Technology Award 2nd position Overall - AIR 26th", year: "2025", image: "gallery/ADDC_25.jpg"},
  {name: "DDC", about: "CFD rank-8th position Overall AIR-15th", year: "2025", image: "gallery/DDC_25.jpg"},
  {name: "ADDC", about: "AIR-1 in best design report", year: "2023", image: "gallery/ADDC_23.jpg"},
  {name: "ADC", about: "Earned Top Honors at Boeing-IIT National Aeromodelling Competition", year: "2019", image: "gallery/ADC_2019.jpg"},
  {name: "AERO DESIGN", about: "Awarded 2nd position for Best Presentation Overall AIR-4th in Aero Design challenge", year: "2017", image: "gallery/Aero_design.jpg"},
  {name: "ADDC", about: "AIR-1 in best design report", year: "2023", image: "gallery/ADDC_23.jpg"}
];

let achievehtml = achievedata.map((data, index) => {
  if (index % 2 === 0) {
    return `
      <div class="container left-container">
        <div class="text-box">
          <div class="size">
            <h2>${data.name}</h2>
            <small>${data.year}</small>
          </div>
          <p>${data.about}</p>
        </div>
        <div class="box box-left">
          <img src="${data.image}" alt="${data.about}" />
        </div>
        <span class="left-container-arrow"></span>
      </div>`;
  } else {
    return `
      <div class="container right-container">
        <div class="text-box text-box-right">
          <div class="size">
            <h2>${data.name}</h2>
            <small>${data.year}</small>
          </div>
          <p>${data.about}</p>
        </div>
        <div class="box right-box">
          <img src="${data.image}" alt="${data.about}" />
        </div>
        <span class="right-container-arrow"></span>
      </div>`;
  }
}).join("");

document.querySelector(".timeline").innerHTML = achievehtml;

// ... (rest of your JS remains the same)









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

