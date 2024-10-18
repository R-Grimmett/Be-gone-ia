let parentDiv, rootURL;
const Reference = "../model/References.js";
const reURL = RegExp(/localhost/);

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else { ready(); }

function ready() {
    rootURL = reURL.test(document.URL) ? "http://localhost:3000" : "https://begoneia.onrender.com";
    parentDiv = document.getElementById("reference");
    const dbRequest = new XMLHttpRequest();
    dbRequest.open("GET", `${rootURL}/db/reference`);
    dbRequest.send();
    dbRequest.responseType = "json";
    dbRequest.onload = () => {
        if(dbRequest.status === 200 && dbRequest.response.length > 0) {
            loadAllReferences(dbRequest.response);
        } else {
            console.log("No references found");
        }
    };
}

function loadAllReferences(data) {
    let referenceList = document.createElement("ul");
    for(obj in data) {
        const objString = JSON.stringify(data[obj]);
        const objJSON = JSON.parse(objString);
        appendReference(objJSON.url, objJSON.referenceString, referenceList);
    }
    parentDiv.appendChild(referenceList);
}

function appendReference(urlString, referenceString, parentElement) {
    let referenceEntry = document.createElement("li");
    referenceEntry.innerHTML = `<a href="${urlString !== null ? urlString : "#"}">${referenceString}</a>`;
    parentElement.appendChild(referenceEntry);
}