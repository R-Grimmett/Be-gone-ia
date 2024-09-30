const parentDivName = "database-results";
const Plant = "../models/plant";

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() { loadAll(); }

function loadEntries(dbPlants) {
    if(dbPlants.status === 200 && dbPlants.response.length > 0) {
        for(obj in dbPlants.response) {
            const stringData = JSON.stringify(dbPlants.response[obj]);
            const data = JSON.parse(stringData);
            if(data.common[0] !== undefined && data.common[0] !== "") {
                addPlantEntry(data.imgSrc, data.common[0],`${data.genus} ${data.species}`);
            } else {
                addPlantEntry(data.imgSrc, null,`${data.genus} ${data.species}`);
            }
        }
    }
    else if(dbPlants.status === 200 && dbPlants.response.length === 0) { dbNotice(`<h2>Sorry!</h2><p>We couldn't find any plants.</p>`); }
    else { dbNotice(`<h2>Sorry!</h2><p>We ran into an error with the database.</p>`); }
}

function loadAll() {
    clearEntries();
    const dbPlants = new XMLHttpRequest();
    dbPlants.open("GET", `http://localhost:3000/plants`);
    dbPlants.send();
    dbPlants.responseType = "json";
    dbPlants.onload = () => { loadEntries(dbPlants); }
}

function loadSearch() {
    clearEntries();
    const searchText = document.getElementById("search").value;
    if(searchText === "") { loadAll(); }
    else {
        let dbPlants = new XMLHttpRequest();
        dbPlants.open("GET", `http://localhost:3000/plants/search/${searchText}`);
        dbPlants.send();
        dbPlants.responseType = "json";
        dbPlants.onload = () => { loadEntries(dbPlants); }
    }
}

function addPlantEntry(imgSrc, commonName, botanicalName) {
    let img, name;
    let databaseResults = document.getElementById(parentDivName);
    let plantEntry = document.createElement("li");
    plantEntry.classList.add('db-entry');

    if(imgSrc != null && imgSrc !== "") { img = `<img src=${imgSrc} alt='Image of ${botanicalName}.'>`; }
    else { img = `<i class="fa-solid fa-seedling"></i>`; }

    if(commonName != null && commonName !== "") { name = `<div><h2>${commonName}</h2><p>${botanicalName}</p></div>`; }
    else { name = `<div><h2>${botanicalName}</h2></div>`;}

    plantEntry.innerHTML = `${img}${name}<i class="fa-solid fa-arrow-right"></i>`;

    databaseResults.append(plantEntry);
}

function clearEntries() {
    const databaseResults = document.getElementById(parentDivName);
    databaseResults.innerHTML = "";
}

function dbNotice(message) {
    let databaseResults = document.getElementById(parentDivName);
    let nothingFound = document.createElement("li");
    nothingFound.classList.add('db-notice');
    nothingFound.innerHTML = message;
    databaseResults.append(nothingFound);
}

function showFilters() {}