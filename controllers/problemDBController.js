const Problem = "../models/Problems";
let locationURL, filterElement, parentDiv, obj, rootURL, filterInit;
const reURL = RegExp(/localhost/);
const reFilter = RegExp(/(?<=:)[\w\s\d]+(?!:<)/);

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() {
    filterInit = false;
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
    });
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
        if(!filterInit) { createFilters(dbProblems); }
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

        let leafValue = cleanFilter("leafFilter");
        let flowerValue = cleanFilter("flowerFilter");
        let stemValue = cleanFilter("stemFilter");
        let rootValue = cleanFilter("rootFilter");
        let growthValue = cleanFilter("growthFilter");
        let wholeValue = cleanFilter("wholeFilter");

        const searchText = `category=${categoryName}%25name=${searchValue}%25leaf=${leafValue}%25flower=${flowerValue}`
            + `%25stem=${stemValue}%25root=${rootValue}%25growth=${growthValue}%25whole=${wholeValue}`;
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

function removeFilter(filterName) {
    document.getElementById(filterName).remove();
    switch (filterName) {
        case "leafFilter":
            document.getElementById("leaf").value = null;
            break;
        case "flowerFilter":
            document.getElementById("flower").value = null;
            break;
        case "stemFilter":
            document.getElementById("stem").value = null;
            break;
        case "rootFilter":
            document.getElementById("root").value = null;
            break;
        case "growthFilter":
            document.getElementById("growth").value = null;
            break;
        case "wholeFilter":
            document.getElementById("whole").value = null;
            break;
        default:
            console.log(`Unexpected filter name: ${filterName}`);
            break;
    }
    if (document.getElementById("filters").innerHTML.length === 0) {
        clearFilters();
    }
}

function setFilters() {
    let inner = ``;
    const filterBar = document.getElementById("filters");

    if(document.getElementById("leaf").value !== 'null' && document.getElementById("leaf").value !== '') {
        inner += `<li id="leafFilter"><button onclick="removeFilter('leafFilter')">
        Leaf: ${document.getElementById("leaf").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("flower").value !== 'null' && document.getElementById("flower").value !== '') {
        inner += `<li id="flowerFilter"><button onclick="removeFilter('flowerFilter')">
        Flower: ${document.getElementById("flower").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("stem").value !== 'null' && document.getElementById("stem").value !== '') {
        inner += `<li id="stemFilter"><button onclick="removeFilter('stemFilter')">
        Stem: ${document.getElementById("stem").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("root").value !== 'null' && document.getElementById("root").value !== '') {
        inner += `<li id="rootFilter"><button onclick="removeFilter('rootFilter')">
        Root: ${document.getElementById("root").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("growth").value !== 'null' && document.getElementById("growth").value !== '') {
        inner += `<li id="growthFilter"><button onclick="removeFilter('growthFilter')">
        Growth: ${document.getElementById("growth").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }
    if(document.getElementById("whole").value !== 'null' && document.getElementById("whole").value !== '') {
        inner += `<li id="wholeFilter"><button onclick="removeFilter('wholeFilter')">
        Whole: ${document.getElementById("whole").value} <i class="fa-solid fa-xmark"></i></button></li>`;
    }

    if (inner === "") { clearFilters(); }
    else filterBar.innerHTML = inner;

}

function createFilters(dbProblems) {
    let leafArr = [];
    let flowerArr = [];
    let stemArr = [];
    let rootArr = [];
    let growthArr = [];
    let wholeArr = [];

    filterElement.innerHTML = `<button type="button" class="close-button" onClick="toggleFilters()"><i class="fa-solid fa-circle-xmark"></i>`
    const filtersList = document.createElement("ul");

    for(obj in dbProblems.response) {
        const stringData = JSON.stringify(dbProblems.response[obj]);
        const data = JSON.parse(stringData);
        for(let i = 0; i < data.leafTags.length; i++) { if(data.leafTags[i] !== "" && !leafArr.includes(data.leafTags[i])) { leafArr.push(data.leafTags[i]); }}
        for(let i = 0; i < data.flowerTags.length; i++) { if(data.flowerTags[i] !== "" && !flowerArr.includes(data.flowerTags[i])) { flowerArr.push(data.flowerTags[i]); }}
        for(let i = 0; i < data.stemTags.length; i++) { if(data.stemTags[i] !== "" && !stemArr.includes(data.stemTags[i])) { stemArr.push(data.stemTags[i]); }}
        for(let i = 0; i < data.rootTags.length; i++) { if(data.rootTags[i] !== "" && !rootArr.includes(data.rootTags[i])) { rootArr.push(data.rootTags[i]); }}
        for(let i = 0; i < data.wholeTags.length; i++) { if(data.wholeTags[i] !== "" && !wholeArr.includes(data.wholeTags[i])) { wholeArr.push(data.wholeTags[i]); }}
        for(let i = 0; i < data.growthTags.length; i++) { if(data.growthTags[i] !== "" && !growthArr.includes(data.growthTags[i])) { growthArr.push(data.growthTags[i]); }}
    }

    const leafFilter = document.createElement("li");
    let leafOp = ``;
    for (let j = 0; j < leafArr.length; j++) {
        let description = fetchShort("leaf", leafArr[j]);
        if(description !== null && description !== "") {leafOp += `<option value=${leafArr[j]}>${description}</option>`;}
    }
    leafFilter.innerHTML = `<label for="leaf">Leaf Symptom:</label>
            <div class="select"><select name="leaf" id="leaf">
            <option value="null"></option>${leafOp}</select></div>`;

    const flowerFilter = document.createElement("li");
    let flowerOp = ``;
    for (let j = 0; j < flowerArr.length; j++) {
        let description = fetchShort("flower", flowerArr[j]);
        if (description !== null && description !== "") { flowerOp += `<option value=${flowerArr[j]}>${description}</option>`; }
    }
    flowerFilter.innerHTML = `<label for="flower">Flower Symptom:</label>
            <div class="select"><select name="flower" id="flower">
            <option value="null"></option>${flowerOp}</select></div>`;

    const stemFilter = document.createElement("li");
    let stemOp = ``;
    for (let j = 0; j < stemArr.length; j++) {
        let description = fetchShort("stem", stemArr[j]);
        if (description !== null && description !== "") { stemOp += `<option value=${stemArr[j]}>${description}</option>`; }
    }
    stemFilter.innerHTML = `<label for="stem">Stem Symptom:</label>
            <div class="select"><select name="stem" id="stem">
            <option value="null"></option>${stemOp}</select></div>`;

    const rootFilter = document.createElement("li");
    let rootOp = ``;
    for (let j = 0; j < rootArr.length; j++) {
        let description = fetchShort("root", rootArr[j]);
        if(description !== null && description !== "") { rootOp += `<option value=${rootArr[j]}>${description}</option>`;}
    }
    rootFilter.innerHTML = `<label for="root">Root Symptom:</label>
            <div class="select"><select name="root" id="root">
            <option value="null"></option>${rootOp}</select></div>`;

    const wholeFilter = document.createElement("li");
    let wholeOp = ``;
    for (let j = 0; j < wholeArr.length; j++) {
        let description = fetchShort("whole", wholeArr[j]);
        if(description !== null && description !== "") { wholeOp += `<option value=${wholeArr[j]}>${description}</option>`;}
    }
    wholeFilter.innerHTML = `<label for="whole">Whole Symptom:</label>
            <div class="select"><select name="whole" id="whole">
            <option value="null"></option>${wholeOp}</select></div>`;

    const growthFilter = document.createElement("li");
    let growthOp = ``;
    for (let j = 0; j < growthArr.length; j++) {
        let description = fetchShort("growth", growthArr[j]);
        if (description !== null && description !== "") { growthOp += `<option value=${growthArr[j]}>${description}</option>`;}
    }
    growthFilter.innerHTML = `<label for="growth">Growth Symptom:</label>
            <div class="select"><select name="growth" id="growth">
            <option value="null"></option>${growthOp}</select></div>`;

    filtersList.append(leafFilter);
    filtersList.append(flowerFilter);
    filtersList.append(stemFilter);
    filtersList.append(rootFilter);
    filtersList.append(growthFilter);
    filtersList.append(wholeFilter);

    filterElement.append(filtersList);
    clearFilters();
    filterInit = true;
}

function toggleFilters() {
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

function cleanFilter(filterName) {
    let cleaned = document.getElementById(filterName) !== null ?document.getElementById(filterName).innerHTML.match(reFilter)[0] : "";
    if (cleaned !== "") {
        cleaned = cleaned.replace(new RegExp(/^\s+/, 'gmi'), '');
        cleaned = cleaned.replace(new RegExp(/\s$/, 'gmi'), '');
    }
    return cleaned;
}