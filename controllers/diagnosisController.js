const survey = new Survey.Model(surveyJson);
let resultPlant, resultProblem, rootURL;
const reURL = RegExp(/localhost/);

survey.applyTheme(coffeeTheme);

survey.onComplete.add((sender, options) => {
    console.log(sender.data);
    calculatePlant(sender.data);
})

document.addEventListener("DOMContentLoaded", function () {
    rootURL = reURL.test(document.URL) ? "http://localhost:3000" : "https://begoneia.onrender.com";
    survey.render(document.getElementById("surveyContainer")); });

function calculatePlant(result) {
    let dbPlantRequest = new XMLHttpRequest();

    if (result.commonKnow === true || result.botanicalKnow === true) {
        const commonName = result.commonKnow ? result.commonName.replace(/\s/g, "%20") : '';
        let botanicalName = result.botanicalKnow ? `${result.botanicalName.genus !== undefined ? result.botanicalName.genus : ''}%20${result.botanicalName.species !== undefined ? result.botanicalName.species : ''}` : '';
        dbPlantRequest.open("GET", `${rootURL}/plants/search/common=${commonName}%25botanical=${botanicalName}`);
        dbPlantRequest.send();
        dbPlantRequest.responseType = "json";
        dbPlantRequest.onload = () => {
            if (dbPlantRequest.status === 200) {
                const plantJSONString = JSON.stringify(dbPlantRequest.response[0]);
                calculateProblem(plantJSONString);
            }
            else { calculateProblem(null); }
        }
    } else {
        calculateProblem(null, result);
    }
}

function calculateProblem(plantString, result) {
    let problemName, resCombined;

    //get probable answers based on each group of symptoms
    const resLeaf = result.symptom.includes("leaf") ? probableLeaf(result.symptomLeaf) : null;
    const resFlower = result.symptom.includes("flower") ? probableFlower(result.symptomFlower) : null;
    const resStem = result.symptom.includes("stem") ? probableStem(result.symptomStem) : null;
    const resRoot = result.symptom.includes("root") ? probableRoot(result.symptomRoot) : null;
    const resGrowth = result.symptom.includes("growth") ? probableGrowth(result.symptomGrowth) : null;
    const resWhole = result.symptom.includes("whole") ? probableWhole(result.symptomWhole) : null;
    let resAll = [resLeaf, resFlower, resStem, resRoot, resGrowth, resWhole];

    // check if the same result appears more than once
    let resCompare = [];
    for (let i = 0; i < resAll.length - 1; i++) {
        if(resAll[i] !== null && resAll[i] !== undefined) {
            for (let j = i + 1; j < resAll.length; j++) {
                if (resAll[j] !== null && resAll[j] !== undefined) {
                    const compare = resAll[i].filter((word) => resAll[j].includes(word));
                    for (k in compare) {
                        resCompare.push(compare[k]);
                    }
                }
            }
        }
    }

    if(resCompare.length === 1) { problemName = resCompare[0]; }
    else if(resCompare.length > 1) { problemName = prioProblem(resCompare); }
    else {
        resCombined = [];
        for(let i = 0; i < resAll.length; i++) {
            if(resAll[i] !== null && resAll[i] !== undefined) {
                for(j in resAll[i]) { resCombined.push(resAll[i][j]); }
            }
        }
        problemName = prioProblem(resCombined);
    }
    console.log(problemName);

    let dbProblemRequest = new XMLHttpRequest();
    dbProblemRequest.open("GET", `${rootURL}/problems/search/category=all%25name=${problemName}`);
    dbProblemRequest.send();
    dbProblemRequest.responseType = "json";
    dbProblemRequest.onload = () => {
        if(dbProblemRequest.status === 200) {
            let problemJSONString = null;
            if(dbProblemRequest.response.length > 1) {
                const spaceRE = new RegExp(/\s/);
                if(!spaceRE.test(problemName)) {
                    for(obj in dbProblemRequest.response) {
                        for(name in dbProblemRequest.response[obj]) {
                            if(!spaceRE.test(dbProblemRequest.response[obj].common[name]) && problemJSONString === null) {
                                problemJSONString = JSON.stringify(dbProblemRequest.response[obj]);
                            }
                        }
                    }
                }
                else {
                    for(obj in dbProblemRequest.response) {
                        for(name in dbProblemRequest.response[obj]) {
                            if(spaceRE.test(dbProblemRequest.response[obj].common[name]) && problemJSONString === null) {
                                problemJSONString = JSON.stringify(dbProblemRequest.response[obj]);
                            }
                        }
                    }
                }
            }
            else{
                problemJSONString = JSON.stringify(dbProblemRequest.response[0]);
            }
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

// May God have mercy on ye who travel here to the land of if else statements
function probableLeaf(tagsArray) {
    if(tagsArray.length === 1) {
        switch (tagsArray[0]) {
            case "blotch-brown":
                return ["too cold", "downy mildew"];
            case "blotch-downy":
                return ["downy mildew"];
            case "blotch-yellow":
                return ["stem and bulb nematodes", "mealybug", "downy mildew"];
            case "curled":
                return ["too hot", "overwatering", "underwatering", "aphids", "spider mite", "glasshouse whitefly", "root aphids", "stem and bulb nematodes"];
            case "dropped":
                return ["underfeeding", "spider mite", "fungal leaf spot", "rust", "downy mildew"];
            case "growth-mold":
                return ["downy mildew"];
            case "growth-rust":
                return ["rust"];
            case "leaf-black":
                return ["bacterial leaf spot"];
            case "leaf-brown":
                return ["too hot", "too cold", "overwatering", "underwatering", "rust"];
            case "leaf-mottled":
                return ["spider mite", "leafhopper"];
            case "leaf-pale":
                return ["not enough light", "underfeeding", "root mealybug"];
            case "leaf-red":
                return ["underwatering"];
            case "leaf-silvery":
                return ["thrips"];
            case "leaf-skeleton":
                return ["earwigs"];
            case "leaf-translucent":
                return ["bacterial leaf spot"];
            case "mosaic":
                return ["viruses"];
        }
    }
    else if(tagsArray.includes("substance-web")) { return ["spider mite"]; }
    else if(tagsArray.includes("substance-fluffy")) { return ["mealybug"]; }
    else if(tagsArray.includes("scale")) {
        return tagsArray.includes("curled") ? ["glasshouse whitefly"] : ["scale insect"]; }
    else if(tagsArray.includes("mosaic") || tagsArray.includes("ring")
        || tagsArray.includes("streak-pale")) { return ["viruses"]; }
    else if(tagsArray.includes("substance-sticky")) { return ["aphids"]; }
    else if(tagsArray.includes("leaf-pale")) {
        return tagsArray.includes("dropped") ? ["underfeeding"] : ["not enough light", "root mealybug"]; }
    else if(tagsArray.includes("spot-black") || tagsArray.includes("leaf-silvery")) { return ["thrips"]; }
    else if(tagsArray.includes("blotch-downy")) { return ["downy mildew"]; }
    else if(tagsArray.includes("blotch-brown") || tagsArray.includes("blotch-yellow") &&
        !(tagsArray.includes("leaf-brown") || tagsArray.includes("speck") ||
            tagsArray.includes("curled"))) { return ["downy mildew"]; }
    else if(tagsArray.includes("blotch-yellow")) { return ["stem and bulb nematodes"]; }
    else if(tagsArray.includes("growth-rust")) { return ["rust"]; }
    else if(tagsArray.includes("scab")) { return ["corky scab"]; }
    else if(tagsArray.includes("spot-brown")) {
        if(tagsArray.includes("dropped")) { return ["fungal leaf spot"]; }
        else if(tagsArray.includes("leaf-black") || tagsArray.includes("leaf-translucent")
            || tagsArray.includes("mush")) { return ["bacterial leaf spot"]}
        else { return ["sooty mold"]; }
    }
    else if(tagsArray.includes("leaf-black") || tagsArray.includes("leaf-translucent")
        || tagsArray.includes("mush")) { return ["bacterial leaf spot"]; }
    else if(tagsArray.includes("leaf-mottled")) {
        return (tagsArray.includes("dropped") || tagsArray.includes("curled")) ? ["spider mite"] : ["leafhopper"];
    }
    else if(tagsArray.includes("scorch")) {
        return (tagsArray.includes("curled") || tagsArray.includes("leaf-brown")) ? ["too hot"] : ["too much light"];
    }
    else if(tagsArray.includes("blotch-brown")) { return ["too cold"]; }
    else if(tagsArray.includes("odema")) {
        return (tagsArray.includes("speck") || tagsArray.includes("blotch-yellow")) ? ["stem and bulb nematodes"] : ["overwatering"];
    }
    else if(tagsArray.includes("growth-mold") || tagsArray.includes("substance-mold")) {
        return (tagsArray.includes("dropped") || tagsArray.includes("blotch-yellow")) ? ["downy mildew"] : ["grey mold"];
    }
    else if(tagsArray.includes("substance-white")) { return ["powdery mildew"]; }
    else if(tagsArray.includes("speck")) { return ["stem and bulb nematodes"]; }
    else if(tagsArray.includes("notch")) { return ["vine weevils"]; }
    else if(tagsArray.includes("leaf-skeleton")) { return ["earwigs"]; }
    else if(tagsArray.includes("leaf-red")) { return ["underwatering"]; }
    else if(tagsArray.includes("dropped")) {
        return tagsArray.includes("leaf-brown") ? ["rust"] : ["underfeeding", "fungal leaf spot"];
    }
    else if(tagsArray.includes("leaf-brown")) {
        return tagsArray.includes("curled") ? [ "too hot", "overwatering", "underwatering"] : ["too cold", "rust", "underwatering"];
    }
    else{ return ["root aphids", "too hot", "underwatering", "aphids"]; }
}

function probableFlower(tagsArray) {
    if (tagsArray.length === 1) {
        switch (tagsArray[0]) {
            case "black":
                return ["stem and bulb nematodes"];
            case "drop":
                return ["too hot", "too cold", "overwatering", "underwatering"];
            case "none":
                return ["too hot", "overfeeding", "underfeeding"];
            case "pale":
                return ["root mealybug"];
            case "substance-sticky":
                return ["aphids", "glasshouse whitefly"];
            case "substance-white":
                return ["powdery mildew"];
            case "white":
                return ["thrips", "viruses"];
            default:
                return null;
        }
    }
    else if (tagsArray.includes("substance-sticky")) { return ["aphids", "glasshouse whitefly"]; }
    else if (tagsArray.includes("substance-white")) { return ["powdery mildew"]; }
    else if (tagsArray.includes("drop") && tagsArray.includes("none")) { return ["too hot"]; }
    else if (tagsArray.includes("white")) { return ["thrips", "viruses"]; }
    else if (tagsArray.includes("pale")) { return ["root mealybug"]; }
    else if (tagsArray.includes("drop")) { return ["too cold", "overwatering", "underwatering"]; }
    else if (tagsArray.includes("none")) { return ["overfeeding", "underfeeding"]; }
    else { return ["stem and bulb nematodes"]; }
}

function probableStem(tagsArray) {
    if(tagsArray.length === 1) {
        switch (tagsArray[0]) {
            case "black":
                return ["stem and bulb nematodes"];
            case "etiolated":
                return ["not enough light"];
            case "insect":
                return ["aphids"];
            case "mark-brown":
                return ["too cold"];
            case "mark-wet":
                return ["stem and crown rot"];
            case "scale":
                return ["glasshouse whitefly", "scale insect"];
            case "scorch":
                return ["too much light"];
            case "substance-fluffy":
                return ["mealybug"];
            case "substance-sticky":
                return ["aphids", "glasshouse whitefly", "mealybug", "scale insect"];
            case "substance-web":
                return ["spider mite"];
            default:
                return null;
        }
    }
    else if (tagsArray.includes("substance-web")) { return ["spider mite"]; }
    else if (tagsArray.includes("insect") && tagsArray.includes("substance-sticky")) { return ["aphids"]; }
    else if (tagsArray.includes("substance-sticky") && tagsArray.includes("scale")) { return ["scale insect", "glasshouse whitefly"]; }
    else if (tagsArray.includes("substance-fluffy")) { return ["mealybug"]; }
    else if (tagsArray.includes("substance-sticky")) { return ["aphids", "glasshouse whitefly", "mealybug", "scale insect"]; }
    else if (tagsArray.includes("scale")) { return ["glasshouse whitefly", "scale"]; }
    else if (tagsArray.includes("etioltaed")) { return ["not enough light"]; }
    else if (tagsArray.includes("mark-wet")) { return ["stem and crown rot"]; }
    else if (tagsArray.includes("black")) { return ["stem and bulb nematodes"]; }
    else if (tagsArray.includes("mark-brown")) { return ["too cold"]; }
    else { return ["too much light"]; }
}

function probableRoot(tagsArray) {
    if(tagsArray.length === 1) {
        switch (tagsArray[0]) {
            case "rot":
                return ["stem and crown rot", "root rot"];
            case "insect":
                return ["earwigs"];
            case "maggot":
                return ["fungus gnat"];
            case "aphid":
                return ["root aphid"];
            case "wool":
                return ["root mealybug"];
            case "grub":
                return ["vine weevils"];
            default:
                return null;
        }
    }
    else if(tagsArray.includes("rot")) { return ["stem and crown rot", "root rot"]; }
    else if(tagsArray.includes("wool")) { return ["root mealybug"]; }
    else if(tagsArray.includes("aphid")) { return ["root aphid"]; }
    else if(tagsArray.includes("maggot")) { return ["fungus gnat"]; }
    else if(tagsArray.includes("grub")) { return ["vine weevils"]; }
    else return ["earwigs"];
}

function probableGrowth(tagsArray) {
    if(tagsArray.length === 1) {
        switch(tagsArray[0]) {
            case "slow":
                return ["too hot", "too cold", "underfeeding", "underwatering", "aphids", "fungas gnats", "spider mite", "glasshouse whitefly", "mealybug", "viruses"];
            case "etiolated":
                return ["not enough light"];
            case "fast":
                return ["overfeeding"];
            case "distorted":
                return ["mealybug", "thrips", "viruses"];
            default:
                return null;
        }
    }
    else if(tagsArray.includes("slow") && tagsArray.includes("distorted")) { return ["mealybug", "viruses"]; }
    else if(tagsArray.includes("etiolated")) { return ["not enough light"]; }
    else if(tagsArray.includes("distorted")) { return ["thrips", "mealybug", "viruses"]; }
    else if(tagsArray.includes("fast")) { return ["overfeeding"]; }
    else { return ["too hot", "too cold", "underfeeding", "underwatering", "aphids", "fungas gnats", "spider mite", "glasshouse whitefly", "mealybug", "viruses"]; }
}

function probableWhole(tagsArray) {
    if(tagsArray.length === 1) {
        switch(tagsArray[0]) {
            case 'collapsed':
                return ["vine weevils", "stem and crown rot", "root rot"];
            case 'insect':
                return ["fungas gnats"];
            case 'mark-brown':
                return ["too cold"];
            case 'mark-white':
                return ["spider mite"];
            case `no-water`:
                return ["root rot"];
            case 'odor':
                return ["stem and crown rot", "root rot"];
            case 'wilt':
                return ["too hot", "overwatering", "underwatering", "root aphids", "stem and crown rot", "root rot"];
            default:
                return null;
        }
    }
    else if(tagsArray.includes("mark-white")) { return ["spider mite"]; }
    else if(tagsArray.includes("collapsed") && !tagsArray.includes("odor") && !tagsArray.includes("no-water")) { return ["vine weevils"]; }
    else if(tagsArray.includes("odor") || tagsArray.includes("no-water")) { return ["stem and crown rot", "root rot"]; }
    else if(tagsArray.includes("insect")) {return ["fungas gnats"]; }
    else if(tagsArray.includes("mark-brown")) { return ["too cold"]; }
    else { return ["too hot", "overwatering", "underwatering", "root aphids"]; }
}

function prioProblem(problemArray) {
    const allProblemsArray = ["spider mite", "viruses", "root mealybug", "mealybug", "scale insect", "glasshouse whitefly",
        "not enough light", "root rot", "stem and crown rot", "thrips", "fungus gnat", "downy mildew", "root aphid",
        "aphid", "sooty mold", "powdery mildew", "fungal leaf spot", "bacterial leaf spot", "rust", "too hot",
        "stem and bulb nematodes", "corky scab", "underfeeding", "overwatering", "grey mold", "underwatering",
        "too much light", "vine weevils", "leafhopper", "earwigs", "too cold", "overfeeding"];

    for(let i = 0; i < problemArray.length; i++) {
        if(allProblemsArray.includes(problemArray[i])) { return problemArray[i]; }
    }

    return null;
}