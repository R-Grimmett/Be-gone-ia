const survey = new Survey.Model(surveyJson);
let resultPlant, resultProblem;

survey.applyTheme(coffeeTheme);

survey.onComplete.add((sender, options) => {
    calculatePlant(sender.data);
})

document.addEventListener("DOMContentLoaded", function () { survey.render(document.getElementById("surveyContainer")); });

function calculatePlant(result) {
    let dbPlantRequest = new XMLHttpRequest();

    if (result.commonKnow === true || result.botanicalKnow === true) {
        const commonName = result.commonKnow ? result.commonName.replace(/\s/g, "%20") : '';
        let botanicalName = result.botanicalKnow ? `${result.botanicalName.genus !== undefined ? result.botanicalName.genus : ''}%20${result.botanicalName.species !== undefined ? result.botanicalName.species : ''}` : '';
        dbPlantRequest.open("GET", `http://localhost:3000/plants/search/common=${commonName}%25botanical=${botanicalName}`);
        dbPlantRequest.send();
        dbPlantRequest.responseType = "json";
        dbPlantRequest.onload = () => {
            if (dbPlantRequest.status === 200) {
                const plantJSONString = JSON.stringify(dbPlantRequest.response[0]);
                calculateProblem(plantJSONString);
            }
        }
    } else {
        calculateProblem(null);
    }
}

function calculateProblem(plantString) {
    // TODO actually implement the logic
    let dbProblemRequest = new XMLHttpRequest();
    // dbProblemRequest.open("GET", `http://localhost:3000/problems/search/category=all%25name=%25leaf=${leafTags}%25flower=${flowerTags}%25${stemTags}%25${rootTags}%25${wholeTags}%25${growthTags}`);
    dbProblemRequest.open("GET", `http://localhost:3000/problems/id/66fe4e7d35a7baa560a90fde`);
    dbProblemRequest.send();
    dbProblemRequest.responseType = "json";
    dbProblemRequest.onload = () => {
        if(dbProblemRequest.status === 200) {
            const problemJSONString = JSON.stringify(dbProblemRequest.response);
            displayResult(plantString, problemJSONString);
        }
        else { displayResult(plantString, null); }
    }
}

function displayResult(plantData, problemData) {
    resultPlant = JSON.parse(plantData);
    resultProblem = JSON.parse(problemData);
    const resultDiv = document.getElementById('results-container');

    let resultHero = document.createElement("div");
    // let img;
    // if(resultPlant !== null) {
    //     if(resultPlant.imgSrc !== "" && resultPlant.imgSrc !== null) {
    //         img = `<img src='${resultPlant.imgSrc}' alt='Image of ${resultPlant.genus} ${resultPlant.species}.>`;
    //     }
    // }
    // else { img = `<img src="./img/background/background-hero.jpg" alt="Image of foliage.">`; }
    //TODO re-add images based on the plant. Not sure why its not working.
    resultHero.classList.add('result-hero');
    resultHero.innerHTML = `<div><h2>Your ${resultPlant !== null ? `${resultPlant.genus} ${resultPlant.species}` : `Plant`}
        is likely affected by:</h2><h1>${resultProblem.common[0]}</h1></div>`;

    let resultInformation = document.createElement("div");
    resultInformation.classList.add('result-information');
    let informationText = '';
    let informationSplit = resultProblem.information.split(new RegExp(/<br><br>/, 'g'));
    if(informationSplit.length === 1) { informationText = informationSplit[0]; }
    else {
        for(let i = 0; i < informationSplit.length - 1; i++) {
            if(i === 0) { informationText = informationSplit[i]; }
            else { informationText = informationText + `<br><br>` + informationSplit[i];}
        }
    }
    resultInformation.innerHTML = `<div><h3>Information about ${resultProblem.common[0]}:</h3><p>${informationText}</p></div>
        <div><h3>Treatment Options:</h3>${resultProblem.treatment}</div>`;

    let resultLinks = document.createElement('div');
    resultLinks.classList.add('result-links');
    if(resultPlant !== null) {
        let linkPlant = document.createElement('button');
        linkPlant.onclick = function() { togglePlant(); };
        linkPlant.innerHTML = (`<i class="fa-solid fa-seedling"></i> More about ${resultPlant.genus} ${resultPlant.species}`);
        resultLinks.appendChild(linkPlant);
    }
    let linkProblem = document.createElement('button');
    linkProblem.onclick = function() { toggleProblem(); };
    linkProblem.innerHTML = `<i class="fa-solid fa-bug"></i> More about ${resultProblem.common[0]}`;
    let linkAgain = document.createElement('a');
    linkAgain.href = 'help-my-plant.html';
    linkAgain.innerHTML = `<i class="fa-solid fa-rotate"></i> Help Another Plant?`;

    resultLinks.appendChild(linkProblem);
    resultLinks.appendChild(linkAgain);

    resultDiv.append(resultHero);
    resultDiv.append(resultInformation);
    resultDiv.append(resultLinks);
}

function togglePlant() { console.log(resultPlant); }
function toggleProblem() { console.log(resultProblem); }

