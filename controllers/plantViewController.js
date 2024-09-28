const parentDivName = "database-results";
const Plant = "../models/plant";

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() { loadAll(); }

async function loadAll() {
    console.log("Started Loading");
    const plants = await Plant.find();
    console.log(plants);
    if (!plants) { noEntries(); }
    for (let plant in plants) {
        let botanicalName = String.join(plant.genus + " " + plant.species);
        addPlantEntry(plant.imgSrc, plant.common[0], botanicalName);
    }
}

function addPlantEntry(imgSrc, commonName, botanicalName) {
    let img, name;
    let databaseResults = document.getElementById(parentDivName);
    let plantEntry = document.createElement("div");
    plantEntry.classList.add('db-entry');

    if(imgSrc != null) { img = `<img src=${imgSrc}>`; }
    else { img = `<i class="fa-solid fa-seedling"></i>`; }

    if(commonName != null) { name = `<div><h2>${commonName}</h2><p>${botanicalName}</p></div>`; }
    else { name = `<div><h2>${botanicalName}</h2></div>`;}

    plantEntry.innerHTML = `${img}${name}<i class="fa-solid fa-arrow-right"></i>`;

    databaseResults.append(plantEntry);
}

function noEntries() {
    let databaseResults = document.getElementById(parentDivName);
    let nothingFound = document.createElement("div");
    nothingFound.classList.add('db-notice');
    nothingFound.innerHTML = `<h2>Sorry!</h2><p>We couldn't find any plants.</p>`;
    databaseResults.append(nothingFound);
}