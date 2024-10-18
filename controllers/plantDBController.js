const parentDivName = "database-results";
const Plant = "../models/plant";
let filterMenu, rootURL;
const reURL = RegExp(/localhost/);
const reFilter = RegExp(/^[\w\s\d]+(?!:<)/, 'm');
const waterArr = ["Allow Time to Dry Inbetween", "Keep Moist"];
const lightArr = ["Full Shade", "Light Shade", "Filtered Sun", "Full Sun"];
const tagsArr = ["Bulb", "Foliage", "Flowering", "Hanging", "Orchid", "Palm", "Succulent"]

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() {
    rootURL = reURL.test(document.URL) ? "http://localhost:3000" : "https://begoneia.onrender.com";
    filterMenu = document.getElementById("filters-overlay");
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchBtn").click();
        }
    })
    loadAll();
    createFilters();
    clearFilters();
}

function loadAll() {
    clearEntries();
    const dbPlants = new XMLHttpRequest();
    dbPlants.open("GET", `${rootURL}/plants`);
    dbPlants.send();
    dbPlants.responseType = "json";
    dbPlants.onload = () => { loadEntries(dbPlants); }
}

function loadSearch() {
    clearEntries();
    let searchValue = document.getElementById("search").value;
    // Search Value sanetisation.
    searchValue = searchValue !== "" ? searchValue.replace(new RegExp(/[^a-z\s]/, 'gmi'), '') : '';
    searchValue = searchValue !== "" ? searchValue.replace(new RegExp(/^\s+/, 'gmi'), '') : '';

    //Check for filters
    const filterBar = document.getElementById("filters");
    if(searchValue === "" && filterBar.innerHTML === "<li id=\"filter-none\">Filters ...</li>") { loadAll(); }
    else {
        const plantName = searchValue !== "" ? searchValue.replace(/\s/g, "%20") : '';

        //Grab each filter
        let familyVal = document.getElementById("familyFilter") !== null ? document.getElementById("familyFilter").innerHTML.match(reFilter)[0] : "";
        if(familyVal !== "") {
            familyVal = familyVal.replace(new RegExp(/^\s+/, 'gmi'), '');
            familyVal = familyVal.replace(new RegExp(/\s+$/, 'gmi'), '');
        }

        let waterVal = document.getElementById("waterFilter") !== null ? document.getElementById("waterFilter").innerHTML.match(reFilter)[0] : "";
        if(waterVal !== "") {
            waterVal = waterVal.replace(new RegExp(/^\s+/, 'gmi'), '');
            waterVal = waterVal.replace(new RegExp(/\s+$/, 'gmi'), '');
            waterVal = waterVal.replace(new RegExp(/\s/, 'gmi'), '%20');
        }

        let lightVal = document.getElementById("lightFilter") !== null ? document.getElementById("lightFilter").innerHTML.match(reFilter)[0] : "";
        if(lightVal !== "") {
            lightVal = lightVal.replace(new RegExp(/^\s+/, 'gmi'), '');
            lightVal = lightVal.replace(new RegExp(/\s+$/, 'gmi'), '');
            lightVal = lightVal.replace(new RegExp(/\s/, 'gmi'), '%20');
        }

        let humidVal = document.getElementById("humidFilter") !== null ? document.getElementById("humidFilter").innerHTML.match(reFilter)[0] : "";
        if(humidVal !== "") {
            humidVal = humidVal.replace(new RegExp(/^\s+/, 'gmi'), '');
            humidVal = humidVal.replace(new RegExp(/\s+$/, 'gmi'), '');
        }

        let lowVal = document.getElementById("lowFilter") !== null ? document.getElementById("lowFilter").innerHTML.match(reFilter)[0] : "";
        if(lowVal !== "") {
            lowVal = lowVal.replace(new RegExp(/^\s+/, 'gmi'), '');
            lowVal = lowVal.replace(new RegExp(/\s+$/, 'gmi'), '');
        }

        let highVal = document.getElementById("highFilter") !== null ? document.getElementById("highFilter").innerHTML.match(reFilter)[0] : "";
        if(highVal !== "") {
            highVal = highVal.replace(new RegExp(/^\s+/, 'gmi'), '');
            highVal = highVal.replace(new RegExp(/\s+$/, 'gmi'), '');
        }

        let tagsVal = document.getElementById("tagsFilter") !== null ? document.getElementById("tagsFilter").innerHTML.match(reFilter)[0] : "";
        if(tagsVal !== "") {
            tagsVal = tagsVal.replace(new RegExp(/^\s+/, 'gmi'), '');
            tagsVal = tagsVal.replace(new RegExp(/\s+$/, 'gmi'), '');
        }

        const searchText = `common=${plantName}%25botanical=${plantName}%25family=${familyVal}%25water=${waterVal}%25light=${lightVal}%25humidity=${humidVal}%25low=${lowVal}%25high=${highVal}%25tag=${tagsVal}`;
        let dbPlants = new XMLHttpRequest();
        dbPlants.open("GET", `${rootURL}/plants/search/${searchText}`);
        dbPlants.send();
        dbPlants.responseType = "json";
        dbPlants.onload = () => { loadEntries(dbPlants); }
    }
}

function loadEntries(dbPlants) {
    if(dbPlants.status === 200 && dbPlants.response.length > 0) {
        for(obj in dbPlants.response) {
            const stringData = JSON.stringify(dbPlants.response[obj]);
            const data = JSON.parse(stringData);
            if(data.common[0] !== undefined && data.common[0] !== "") {
                addPlantEntry(data.imgSrc, data.common[0],`${data.genus} ${data.species}`, data._id);
            } else {
                addPlantEntry(data.imgSrc, null,`${data.genus} ${data.species}`, data._id);
            }
        }
    }
    else if(dbPlants.status === 200 && dbPlants.response.length === 0) { dbNotice(`<h2>Sorry!</h2><p>We couldn't find any plants.</p>`); }
    else { dbNotice(`<h2>Sorry!</h2><p>We ran into an error with the database.</p>`); }
}

function addPlantEntry(imgSrc, commonName, botanicalName, id) {
    let img, name, pageURL;
    let databaseResults = document.getElementById(parentDivName);
    let plantEntry = document.createElement("article");
    plantEntry.classList.add('db-entry');

    if(imgSrc != null && imgSrc !== "") { img = `<img src=${imgSrc} alt='Image of ${botanicalName}.'>`; }
    else { img = `<i class="fa-solid fa-seedling"></i>`; }

    if(commonName != null && commonName !== "") { name = `<div><h2>${commonName}</h2><p>${botanicalName}</p></div>`; }
    else { name = `<div><h2>${botanicalName}</h2></div>`;}

    pageURL = `${rootURL}/plant_id=${id}`

    plantEntry.innerHTML = `<a href="${pageURL}" class="stretch-link"></a>${img}${name}<i class="fa-solid fa-arrow-right"></i>`;

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
    switch (filterName) {
        case "tagsFilter":
            document.getElementById("tag").value = null;
            break;
        case "waterFilter":
            document.getElementById("water").value = null;
            break;
        case "humidFilter":
            document.getElementById("humid").value = null;
            break;
        case "lightFilter":
            document.getElementById("light").value = null;
            break;
        case "familyFilter":
            document.getElementById("family").value = null;
            break;
        default:
            break;
    }
    if (document.getElementById("filters").innerHTML.length === 0) {
        clearFilters();
    }
}

function setFilters() {
    let inner = ``;
    const filterBar = document.getElementById("filters");
    if(document.getElementById("tag").value !== 'null' && document.getElementById("tag").value !== "") {
        inner += `<li id="tagsFilter"><button onclick="removeFilter('tagsFilter')">
            ${document.getElementById("tag").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("water").value !== 'null' && document.getElementById("water").value !== "") {
        inner += `<li id="waterFilter"><button onclick="removeFilter('waterFilter')">
            ${document.getElementById("water").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("humid").value !== 'null' && document.getElementById("humid").value !== "") {
        inner += `<li id="humidFilter"><button onclick="removeFilter('humidFilter')">
            ${document.getElementById("humid").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("light").value !== 'null' && document.getElementById("light").value !== "") {
        inner += `<li id="lightFilter"><button onclick="removeFilter('lightFilter')">
            ${document.getElementById("light").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("family").value !== 'null' && document.getElementById("family").value !== "") {
        inner += `<li id="familyFilter"><button onclick="removeFilter('familyFilter')">
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
    dbRequest.open("GET", `${rootURL}/db/family`);
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

        familyFilter.innerHTML = `<label for="family"><i class="fa-solid fa-seedling"></i> Botanical Plant Family:</label>
            <div class="select"><select name="family" id="family">
            <option value="null"></option>${options}</select></div>`;

        const waterFilter = document.createElement("li");
        let waterOp = '';
        for (let i = 0; i < waterArr.length; i++) { waterOp += `<option value="${waterArr[i]}">${waterArr[i]}</option>`; }
        waterFilter.innerHTML = `<label for="water"><i class="fa-solid fa-droplet"></i> Water:</label>
            <div class="select"><select name="water" id="water">
            <option value="null"></option>${waterOp}</select></div>`;

        const humidFilter = document.createElement("li");
        humidFilter.innerHTML = `<label for="humid"><i class="fa-solid fa-cloud-rain"></i> Humidity:</label>
        <div class="select"><select name="humid" id="humid">
        <option value="null"></option><option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option></select></div>`;

        const lightFilter = document.createElement("li");
        let lightOp = '';
        for (let i = 0; i < lightArr.length; i++) { lightOp += `<option value="${lightArr[i]}">${lightArr[i]}</option>`; }
        lightFilter.innerHTML = `<label for="light"><i class="fa-solid fa-sun"></i> Light:</label>
            <div class="select"><select name="light" id="light">
            <option value="null"></option>${lightOp}</select></div>`;

        const tagsFilter = document.createElement("li");
        let tagOp = '';
        for (let i = 0; i < tagsArr.length; i++) { tagOp += `<option value="${tagsArr[i]}">${tagsArr[i]}</option>`; }
        tagsFilter.innerHTML = `<label for="tag"><i class="fa-solid fa-tag"></i> Tag:</label>
            <div class="select"><select name="tag" id="tag">
            <option value="null"></option>${tagOp}</select></div>`;

        filtersList.append(tagsFilter);
        filtersList.append(waterFilter);
        filtersList.append(humidFilter);
        filtersList.append(lightFilter);
        filtersList.append(familyFilter);

        filterMenu.append(filtersList);
    }
}