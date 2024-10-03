import {clearEntries, dbNotice, toggleFilters} from './dbViewController.js';
const parentDivName = "database-results";
const Problem = "../models/Problems";
let location, obj;
let filterElement;

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() {
    filterElement = document.getElementById("filters-overlay");
    location = document.URL;
    loadAllProblems();
}

function loadProblemEntries(dbProblems) {
    if(dbProblems.status === 200 && dbProblems.response.length > 0) {
        for(obj in dbProblems.response) {
            const stringData = JSON.stringify(dbProblems.response[obj]);
            const data = JSON.parse(stringData);
            if(data.scientific !== undefined && data.scientific !== "") {
                addProblemEntry(data.imgSrc, data.common[0], data.scientific);
            } else {
                addProblemEntry(data.imgSrc, data.common[0],null);
            }
        }
    }
    else if(dbProblems.status === 200 && dbProblems.response.length === 0) { dbNotice(`<h2>Sorry!</h2><p>We couldn't find any plant problems.</p>`); }
    else { dbNotice(`<h2>Sorry!</h2><p>We ran into an error with the database.</p>`); }
}

function loadAllProblems() {
    clearEntries(parentDivName);
    const dbProblems = new XMLHttpRequest();
    if((location.match(/\/care-database(.html)?$/)) != null || (location.match(/\/$/)) != null) {
        dbProblems.open("GET", `http://localhost:3000/problems/care`); }
    else if((location.match(/\/pest-database(.html)?$/)) != null || (location.match(/\/$/)) != null) {
        dbProblems.open("GET", `http://localhost:3000/problems/pest`);
    }
    else if((location.match(/\/disease-database(.html)?$/)) != null || (location.match(/\/$/)) != null) {
        dbProblems.open("GET", `http://localhost:3000/problems/disease`);
    } else { dbProblems.open("GET", `http://localhost:3000/problems`); }
    dbProblems.send();
    dbProblems.responseType = "json";
    dbProblems.onload = () => { loadProblemEntries(dbProblems); }
}

function addProblemEntry(imgSrc, commonName, scientificName) {
    let img, name;
    let databaseResults = document.getElementById(parentDivName);
    let problemEntry = document.createElement("li");
    problemEntry.classList.add('db-entry');

    if(imgSrc != null && imgSrc !== "") { img = `<img src=${imgSrc} alt='Image of ${commonName}.'>`; }
    else { img = `<i class="fa-solid fa-plant-wilt" aria-hidden="true"></i>`; }

    if(scientificName != null && scientificName !== "") { name = `<div><h2>${commonName}</h2><p>${scientificName}</p></div>`; }
    else { name = `<div><h2>${commonName}</h2></div>`;}

    problemEntry.innerHTML = `${img}${name}<i class="fa-solid fa-arrow-right"></i>`;

    databaseResults.append(problemEntry);
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

    if (inner === "") { clearFilters(); }
    else filterBar.innerHTML = inner;

}

function createFilters() {
    filterElement.innerHTML = `<button type="button" class="close-button" onClick="toggleFilters()"><i class="fa-solid fa-circle-xmark"></i>`
    const filtersList = document.createElement("ul");
    const familyFilter = document.createElement("li");
    let options = null;
}