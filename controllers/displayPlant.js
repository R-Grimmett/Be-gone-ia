function populateName(commonArray, genus, species, divLocation, hero) {
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
    divLocation.appendChild(plantCommon);

    hero.appendChild(heroCommon);
    hero.appendChild(heroBotanical);
}

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

function populateInfo(infoText, divLocation) {
    if(infoText !== undefined && infoText !== null && infoText !== "") {
        const plantInfo = document.createElement('div');
        plantInfo.id = 'view-info';
        plantInfo.innerHTML = infoText;
        divLocation.appendChild(plantInfo);
    }
}