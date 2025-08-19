const eventData = [{
    name: 'Computational Fluid dynamics',
    image: 'fluid_dynamics.png'
},{name: 'ICARUS',
    image: 'icarus.png'
},{
    name: 'ALBATROSS',
    image: 'albatross.png'
},{
    name: 'Drone-Tech Workshop',
    image: 'drone.png'
},{
    name: 'Aircraft-Design Workshop',
    image: 'aircraft.png'
}]
let html = "";
eventData.forEach((cardData,i)=>
{
  html = html + `
  <div class="event-card" id="card${i}">
  <div class="eventimage">
    <img src="${cardData.image}">
  </div>
  <p class="workshopName">
   ${cardData.name}
  </p>
 </div>`
 
})


document.getElementById("cards-track").innerHTML = html;
