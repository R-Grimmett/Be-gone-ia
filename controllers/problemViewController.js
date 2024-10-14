const Problem = "../models/Problems.js";
let mainContent, problemHero, rootURL, problemID;
const reURL = RegExp(/localhost/);
const reID = RegExp(/(?<=id=)\S+$/);

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() {
    mainContent = document.getElementById("main-content");
    problemHero = document.getElementById("view-hero");
    rootURL = reURL.test(document.URL) ? "http://localhost:3000" : "https://begoneia.onrender.com";
    problemID = document.URL.match(reID);

    const dbRequest = new XMLHttpRequest();
    dbRequest.open("GET", `${rootURL}/problems/id/${problemID}`);
    dbRequest.send();
    dbRequest.responseType = "json";
    dbRequest.onload = () => {
        if (dbRequest.status === 200) { loadProblemData(dbRequest.response); }
        else { loadNoProblem(dbRequest.status); }
    }
}

function loadProblemData(problemData) {
    console.log(problemData);
    problemHero.style.backgroundImage = problemData.imgSrc !== "" ? `url(${problemData.imgSrc})` : "url('../img/background/gradient-green.jpg')";
    populateName(problemData.common, problemData.scientific);
    populateSymptoms(problemData.leafTags, problemData.flowerTags, problemData.stemTags, problemData.rootTags, problemData.growthTags, problemData.wholeTags);
    populateInfo(problemData.treatment, problemData.information);
}

function loadNoProblem(statusCode) {}

function populateName(commonName, scientificName) {
    const heroCommon = document.createElement('h1');
    heroCommon.innerHTML = `${commonName[0]}`;
    problemHero.appendChild(heroCommon);

    const heroScientific = document.createElement('p');
    if(scientificName !== "" && scientificName !== null && scientificName !== undefined) {
        heroScientific.innerHTML = `${scientificName}`;
        problemHero.appendChild(heroScientific);
    }

    const commonDiv = document.createElement("div");
    const commonList = document.createElement('ul');
    if(commonName.length > 1) {
        commonDiv.innerHTML = `<h4>Also called:</h4>`;
        commonDiv.id = 'allCommon';
        for (let i = 1; i < commonName.length; i++) {
            const entry = document.createElement("li");
            entry.innerHTML = commonName[i];
            commonList.appendChild(entry);
        }
        commonDiv.appendChild(commonList);
        mainContent.appendChild(commonDiv);
    }
}

//TODO add in the descriptions
function populateSymptoms(leafTags, flowerTags, stemTags, rootTags, growthTags, wholeTags) {
    console.log(leafTags);
    console.log(flowerTags);
    console.log(stemTags);
    console.log(rootTags);
    console.log(growthTags);
    console.log(wholeTags);
}

function populateInfo(treatmentData, infoData) {
    if(treatmentData !== "" && treatmentData !== null && treatmentData !== undefined) {
        const treatDiv = document.createElement('div');
        treatDiv.id = 'problem-treatment';
        treatDiv.innerHTML = `<h3>Treatment Options:</h3>${treatmentData}`;
        mainContent.appendChild(treatDiv);
    }


    if(infoData !== "" && infoData !== null && infoData !== undefined) {
        const infoDiv = document.createElement('div');
        infoDiv.id = `view-info`;
        infoDiv.innerHTML = `<h3>Information:</h3>${infoData}`;
        mainContent.appendChild(infoDiv);
    }
}