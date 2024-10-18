const Problem = "../models/Problems";
let locationURL, filterElement, parentDiv, obj, rootURL;
const reURL = RegExp(/localhost/);

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() {
    filterElement = document.getElementById("filters-overlay");
    parentDiv = document.getElementById("database-results");
    locationURL = document.URL;
    rootURL = reURL.test(locationURL) ? "http://localhost:3000" : "https://begoneia.onrender.com";
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchBtn").click();
        }
    })
    clearFilters();
    loadAllProblems();
}

function loadProblemEntries(dbProblems) {
    if(dbProblems.status === 200 && dbProblems.response.length > 0) {
        for(obj in dbProblems.response) {
            const stringData = JSON.stringify(dbProblems.response[obj]);
            const data = JSON.parse(stringData);
            if(data.scientific !== undefined && data.scientific !== "") {
                addProblemEntry(data.imgSrc, data.common[0], data.scientific, data.category, data._id);
            } else {
                addProblemEntry(data.imgSrc, data.common[0],null, data.category, data._id);
            }
        }
    }
    else if(dbProblems.status === 200 && dbProblems.response.length === 0) { dbNotice(`<h2>Sorry!</h2><p>We couldn't find any plant problems.</p>`); }
    else { dbNotice(`<h2>Sorry!</h2><p>We ran into an error with the database.</p>`); }
}

function loadAllProblems() {
    clearProblemEntries();
    const dbRequest = new XMLHttpRequest();
    if((locationURL.match(/\/care-database(.html)?$/)) != null ) {
        dbRequest.open("GET", `${rootURL}/problems/care`); }
    else if((locationURL.match(/\/pest-database(.html)?$/)) != null) {
        dbRequest.open("GET", `${rootURL}/problems/pest`);
    }
    else if((locationURL.match(/\/disease-database(.html)?$/)) != null) {
        dbRequest.open("GET", `${rootURL}/problems/disease`);
    } else { dbRequest.open("GET", `${rootURL}/problems`); }
    dbRequest.send();
    dbRequest.responseType = "json";
    dbRequest.onload = () => { loadProblemEntries(dbRequest); }
}

function loadProblemSearch() {
    clearProblemEntries();

    let categoryName;
    if((locationURL.match(/\/care-database(.html)?$/)) != null) { categoryName = 'care'; }
    else if((locationURL.match(/\/pest-database(.html)?$/)) != null) { categoryName = 'pest'; }
    else if((locationURL.match(/\/disease-database(.html)?$/)) != null) { categoryName = 'disease'; }
    else { categoryName = 'all'}

    let searchValue = document.getElementById("search").value;
    searchValue = searchValue !== "" ? searchValue.replace(new RegExp(/[^a-z\s]/, 'gmi'), '') : '';
    searchValue = searchValue !== "" ? searchValue.replace(new RegExp(/^\s+/, 'gmi'), '') : '';
    const filterBar = document.getElementById("filters");
    if(searchValue === "" && filterBar.innerHTML === "<li id=\"filter-none\">Filters ...</li>") { loadAllProblems(); }
    else {
        searchValue = searchValue !== "" ? searchValue.replace(/\s/, '%20') : '';
        const searchText = `category=${categoryName}%25name=${searchValue}`;
        let dbRequest = new XMLHttpRequest();
        dbRequest.open("GET", `${rootURL}/problems/search/${searchText}`);
        dbRequest.send();
        dbRequest.responseType = "json";
        dbRequest.onload = () => { loadProblemEntries(dbRequest); }
    }
}

function addProblemEntry(imgSrc, commonName, scientificName, category, id) {
    let img, name;
    let problemEntry = document.createElement("article");
    const pageURL = `${rootURL}/problem_id=${id}`;
    problemEntry.classList.add('db-entry');

    if(imgSrc != null && imgSrc !== "") { img = `<img src=${imgSrc} alt='Image of ${commonName}.'>`; }
    else {
        if (category === "care") {
            img = `<div class="db-placeholder"><i class="fa-solid fa-plant-wilt" aria-hidden="true"></i></div>`;
        }
        if (category === "disease") {
            img = `<div class="db-placeholder"><i class="fa-solid fa-virus" aria-hidden="true"></i></div>`;
        }
        if (category === "pest") {
            img = `<div class="db-placeholder"><i class="fa-solid fa-bugs" aria-hidden="true"></i></div>`;
        }
    }
    if(scientificName != null && scientificName !== "") { name = `<div><h2>${commonName}</h2><p>${scientificName}</p></div>`; }
    else { name = `<div><h2>${commonName}</h2></div>`;}

    problemEntry.innerHTML = `<a href="${pageURL}" class="stretch-link"></a>${img}${name}<i class="fa-solid fa-arrow-right"></i>`;

    parentDiv.append(problemEntry);
}

function clearProblemEntries() { parentDiv.innerHTML = ""; }

function clearFilters() {
     const filterBar = document.getElementById("filters");
     filterBar.innerHTML = `<li id="filter-none">Filters ...</li>`;
}

// function removeFilter(filterName) {
//     document.getElementById(filterName).remove();
//     if (document.getElementById("filters").innerHTML.length === 0) {
//         clearFilters();
//     }
// }

// function setFilters() {
//     let inner = ``;
//     const filterBar = document.getElementById("filters");
//
//     if (inner === "") { clearFilters(); }
//     else filterBar.innerHTML = inner;
//
// }

// function createFilters() {
//     filterElement.innerHTML = `<button type="button" class="close-button" onClick="toggleFilters()"><i class="fa-solid fa-circle-xmark"></i>`
//     const filtersList = document.createElement("ul");
//     const familyFilter = document.createElement("li");
//     let options = null;
// }

function toggleFilters(filterMenu) {
    if (filterElement.style.display === "block") {
        setFilters();
        filterElement.style.display = "none";
    }
    else { filterElement.style.display = "block"; }
}

function dbNotice(message) {
    let nothingFound = document.createElement("li");
    nothingFound.classList.add('db-notice');
    nothingFound.innerHTML = message;
    parentDiv.append(nothingFound);
}