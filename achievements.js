let achievedata = [
  {name: "NITK", about: "<b><b>AIR-5th </b></b>in Wright Flight competition conducted by NITK", year: "2025", image: "gallery/NITK.jpg"},
  {name: "ADDC", about: "Unique Technology Award <b><b>2nd position</b></b> Overall - <b><b>AIR 26th</b></b>", year: "2025", image: "gallery/ADDC_25.jpg"},
  {name: "DDC", about: "CFD <b>Rank-8th</b> position Overall <b><b>AIR-15th</b></b>", year: "2025", image: "gallery/DDC_25.jpg"},
  {name: "ADDC", about: "<b><b>AIR-1</b></b> in Best Design Report", year: "2023", image: "gallery/ADDC_23.jpg"},
  {name: "ADC", about: "Earned <b><b>Top Honors</b></b> at Boeing-IIT National Aeromodelling Competition", year: "2019", image: "gallery/ADC_2019.jpg"},
  {name: "ADC", about: "Awarded <b><b>2nd position</b></b> for Best Presentation Overall <b><b>AIR-4th </b></b>in Aero Design challenge", year: "2017", image: "gallery/Aero_design.jpg"},
  {name: "ADC", about: "Awarded <b><b>AIR-1st</b></b> in Best Presentation, <b><b>1st</b></b> in Best Flight, <b><b>3rd</b></b> in Best Design Report Overall <b><b>AIR-1</b></b>", year: "2016", image: "gallery/ADC_2016.jpg"}
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

