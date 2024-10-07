const parentDivName = "database-results";
const Plant = "../models/plant";
let filterMenu;

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() {
    filterMenu = document.getElementById("filters-overlay");
    loadAll();
    createFilters();
    clearFilters();
}

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
    const searchValue = document.getElementById("search").value;
    const filterBar = document.getElementById("filters");
    if(searchValue === "" && filterBar.innerHTML === "<li id=\"filter-none\">Filters ...</li>") { loadAll(); }
    else {
        const plantName = searchValue !== "" ? searchValue.replace(/\s/g, "%20") : '';
        const searchText = `common=${plantName}%25botanical=${plantName}`;
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

    plantEntry.innerHTML = `${img}<div class="db-text">${name}<i class="fa-solid fa-arrow-right"></i></div>`;

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

function toggleFilters() {
    if (filterMenu.style.display === "block") {
        setFilters();
        filterMenu.style.display = "none";
    }
    else { filterMenu.style.display = "block"; }
}

function clearFilters() {
    const filterBar = document.getElementById("filters");
    filterBar.innerHTML = `<li id="filter-none">Filters ...</li>`;
}

function removeFilter(filterName) {
    document.getElementById(filterName).remove();
    if (document.getElementById("filters").innerHTML.length === 0) {
        clearFilters();
    }
}

function setFilters() {
    let inner = ``;
    const filterBar = document.getElementById("filters");
    if(document.getElementById("family").value !== 'null' && document.getElementById("family").value !== "") {
        inner += `<li id="familyFilter"><button onclick="removeFilter('familyFilter')" value="${document.getElementById("family")}">
            ${document.getElementById("family").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }

    if (inner === "") { clearFilters(); }
    else filterBar.innerHTML = inner;

}

function createFilters() {
    filterMenu.innerHTML = `<button type="button" class="close-button" onClick="toggleFilters()"><i class="fa-solid fa-circle-xmark"></i>`
    const filtersList = document.createElement("ul");
    const familyFilter = document.createElement("li");
    let options = null;

    const dbRequest = new XMLHttpRequest();
    dbRequest.open("GET", `http://localhost:3000/db/family`);
    dbRequest.send();
    dbRequest.responseType = "json";
    dbRequest.onload = () => {
        if (dbRequest.status === 200 && dbRequest.response.length > 0) {
            for (obj in dbRequest.response) {
                const stringData = JSON.stringify(dbRequest.response[obj]);
                const data = JSON.parse(stringData);
                options += `<option value="${data.name}">${data.name}</option>`;
            }
        }

    familyFilter.innerHTML = `<label for="family">Botanical Plant Family:</label>
            <div class="select"><select name="family" id="family">
            <option value="null"></option>${options}</select></div>`;

    filtersList.append(familyFilter);
    filterMenu.append(filtersList);
    }
}