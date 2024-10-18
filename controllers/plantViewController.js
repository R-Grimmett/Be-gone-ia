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
    populateName(plantData.common, plantData.genus, plantData.species);
    populateInfo(plantData.text);
}

function loadNoPlant() {}

function populateStats(water, light, humidity, tempLow, tempHigh) {
    const statWater = document.getElementById("plant-water");
    statWater.innerHTML = (water !== null && water !== "" && water !== undefined) ? water : "No Data";

    const statLight = document.getElementById("plant-light");
    statLight.innerHTML = (light !== null && light !== "" && light !== undefined) ? light : "No Data";

    const statHumid = document.getElementById("plant-humid");
    statHumid.innerHTML = (humidity !== null && humidity !== "" && humidity !== undefined) ? humidity : "No Data";

    const statTemp = document.getElementById("plant-temp");
    if(tempLow !== null && tempLow !== undefined && tempHigh !== null && tempHigh !== undefined) {
        statTemp.innerHTML = `${tempLow} - ${tempHigh}&degC`;
    } else { statTemp.innerHTML = `No Data`; }
}

function populateName(commonArray, genus, species) {
    const plantCommon = document.createElement("div");
    plantCommon.id = 'allCommon';
    const preface = document.createElement("div");
    const commonList = document.createElement("ul");
    const heroCommon = document.createElement("h1");
    const heroBotanical = document.createElement('p');
    if(commonArray.length === 1){
        if(commonArray[0] === '') {
            heroCommon.innerHTML = `${genus} ${species}`;
            preface.innerHTML = "<p><i>This plant doesn't have any common names listed in our database.</i></p>"; }
        else{
            heroCommon.innerHTML = `${commonArray[0]}`;
            heroBotanical.innerHTML = `${genus} ${species}`;
            preface.innerHTML = `<p><i>This plant doesn't have any other common names listed in our database.</i></p>`; }
    } else if(commonArray.length > 1){
        heroCommon.innerHTML = `${commonArray[0]}`;
        heroBotanical.innerHTML = `${genus} ${species}`;
        preface.innerHTML = "<h4>Also called:</h4>";
        for(let i = 1; i < commonArray.length; i++){
            const entry = document.createElement("li");
            entry.innerHTML = commonArray[i];
            commonList.appendChild(entry);
        }
    } else { heroCommon.innerHTML = `${genus} ${species}`; }

    plantCommon.appendChild(preface);
    plantCommon.appendChild(commonList);
    mainContent.appendChild(plantCommon);

    plantHero.appendChild(heroCommon);
    plantHero.appendChild(heroBotanical);
}

function populateInfo(infoText) {
    if(infoText !== undefined && infoText !== null && infoText !== "") {
        const plantInfo = document.createElement('div');
        plantInfo.id = 'view-info';
        plantInfo.innerHTML = infoText;
        mainContent.appendChild(plantInfo);
    }
}