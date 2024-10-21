const Plant = "../models/plant";
let mainContent, plantHero, rootURL, plantID;
const reURL = RegExp(/localhost/);
const reID = RegExp(/(?<=id=)\S+$/);

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else { ready(); }

function ready() {
    rootURL = reURL.test(document.URL) ? "http://localhost:3000" : "https://begoneia.onrender.com";
    plantID = document.URL.match(reID);
    mainContent = document.getElementById("main-content");
    plantHero = document.getElementById("view-hero");
    const dbRequest = new XMLHttpRequest();
    dbRequest.open("GET", `${rootURL}/plants/id/${plantID[0]}`);
    dbRequest.send();
    dbRequest.responseType = "json";
    dbRequest.onload = () => {
        if (dbRequest.status === 200) { loadPlantData(dbRequest.response); }
        else { loadNoPlant(); }
    }
}

function loadPlantData(plantData) {
    console.log(plantData);
    plantHero.style.backgroundImage = plantData.imgSrc !== "" ? `url('${plantData.imgSrc}')`: "url('../img/background/gradient-green.jpg')";
    populateStats(plantData.water, plantData.light, plantData.humidity, plantData.tempLow, plantData.tempHigh);
    populateName(plantData.common, plantData.genus, plantData.species, mainContent, plantHero);
    populateInfo(plantData.text, mainContent);
}

function loadNoPlant() {}




