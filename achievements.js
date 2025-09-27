let achievedata = [
  {name:"ADDC", about:"Unique Technology Award 2nd position Overall - AIR 26th", year:"2025"},
  {name:"DDC",  about:"Unique Technology Award 2nd position Overall - AIR 26th", year:"2025"},
  {name:"ADDC", about:"Unique Technology Award 2nd position Overall - AIR 26th", year:"2025"},
  {name:"DDC",  about:"Unique Technology Award 2nd position Overall - AIR 26th", year:"2025"},
  {name:"ADDC", about:"Unique Technology Award 2nd position Overall - AIR 26th", year:"2025"}
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
        <div class="box box-left"></div>
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
        <div class="box right-box"></div>
        <span class="right-container-arrow"></span>
      </div>`;
  }
}).join(""); // join avoids stray commas

document.querySelector(".timeline").innerHTML = achievehtml;












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

