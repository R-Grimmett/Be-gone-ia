// General DB access functions
export function clearEntries(parentDivName) {
    const databaseResults = document.getElementById(parentDivName);
    databaseResults.innerHTML = "";
}

export function dbNotice(message) {
    let databaseResults = document.getElementById(parentDivName);
    let nothingFound = document.createElement("li");
    nothingFound.classList.add('db-notice');
    nothingFound.innerHTML = message;
    databaseResults.append(nothingFound);
}

export function toggleFilters(filterMenu) {
    const filterElement = document.getElementById(filterMenu);
    if (filterElement.style.display === "block") {
        setFilters();
        filterElement.style.display = "none";
    }
    else { filterElement.style.display = "block"; }
}