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

function populateSymptoms(leafTags, flowerTags, stemTags, rootTags, growthTags, wholeTags) {
    const preface = document.createElement('div');
    preface.id = 'allSymptoms';
    preface.innerHTML = "<h3>Symptoms:</h3>";
    const symptomList = document.createElement('ul');

    for(let i = 0; i < leafTags.length; i++){
        let entry = document.createElement("li");
        entry.innerHTML = fetchDescription("leaf", leafTags[i]);
        if(entry.innerHTML !== "") { symptomList.appendChild(entry); }
    }
    for(let i = 0; i < flowerTags.length; i++){
        let entry = document.createElement("li");
        entry.innerHTML = fetchDescription("flower", flowerTags[i]);
        if(entry.innerHTML !== "") { symptomList.appendChild(entry); }
    }
    for(let i = 0; i < stemTags.length; i++){
        let entry = document.createElement("li");
        entry.innerHTML = fetchDescription("stem", stemTags[i]);
        if(entry.innerHTML !== "") { symptomList.appendChild(entry); }
    }
    for(let i = 0; i < rootTags.length; i++){
        let entry = document.createElement("li");
        entry.innerHTML = fetchDescription("root", rootTags[i]);
        if(entry.innerHTML !== "") { symptomList.appendChild(entry); }
    }
    for(let i = 0; i < growthTags.length; i++){
        let entry = document.createElement("li");
        entry.innerHTML = fetchDescription("growth", growthTags[i]);
        if(entry.innerHTML !== "") { symptomList.appendChild(entry); }
    }
    for(let i = 0; i < wholeTags.length; i++){
        let entry = document.createElement("li");
        entry.innerHTML = fetchDescription("whole", wholeTags[i]);
        if(entry.innerHTML !== "") { symptomList.appendChild(entry); }
    }

    preface.appendChild(symptomList);
    mainContent.appendChild(preface);
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

function fetchDescription(category, tag) {
    switch (category) {
        case "leaf":
            switch (tag) {
                case "blotch-brown":
                    return "Brown blotches on the leaves.";
                case "blotch-downy":
                    return "Purple or green blotches on the leaves.";
                case "blotch-yellow":
                    return "Yellow blotches on the leaves.";
                case "curled":
                    return "Leaves are curled in on themselves, or distorted.";
                case "dropped":
                    return "Leaves are dropped by the plant.";
                case "growth-mold":
                    return "Growth similar to mold on the undersides of leaves.";
                case "growth-rust":
                    return "Rust coloured pustules on the undersides of leaves.";
                case "leaf-black":
                    return "Leaves are black in colour.";
                case "leaf-brown":
                    return "Leaves are brown in colour.";
                case "leaf-mottled":
                    return "Leaves are mottled.";
                case "leaf-red":
                    return "Leaves become red or more red in colouration.";
                case "leaf-silvery":
                    return "Leaves are silvery, or have silvery lines or spots on them.";
                case "leaf-skeleton":
                    return "Leaves become skeletal, leaving only the veins.";
                case "leaf-translucent":
                    return "Leaves become translucent in colouration.";
                case "mosaic":
                    return "Mosaic pattern on the leaves.";
                case "mush":
                    return "Leaves turn mushy in spots or blotches on the leaves.";
                case "notch":
                    return "Leaves have notches missing from the edges of them.";
                case "odema":
                    return "Odema, or small bumps forming on the leaves.";
                case "ring":
                    return "Ring patterns on the leaves.";
                case "scab":
                    return "Light brown patches or raised scabs of a light brown colour on the leaves or pads of the plant.";
                case "scale":
                    return "Scale, or small, hard, bumps or shells on the leaves.";
                case "scorch":
                    return "Leaves are scorched, or have portions of brown or black that appear similar to a burn.";
                case "speck":
                    return "Yellowish swelling or specks on the undersides of leaves.";
                case "spot-brown":
                    return "Black or brown spots on the leaves.";
                case "spot-black":
                    return "Tiny black spots on the leaves.";
                case "streak-pale":
                    return "Pale green or yellow streaks throughout the leaves.";
                case "substance-fluffy":
                    return "White fluffy substance on the leaves.";
                case "substance-mold":
                    return "Fuzzy grey mold on the leaves";
                case "substance-sticky":
                    return "Honeydew, or a sticky substance on the leaves.";
                case "substance-web":
                    return "Small, silvery, webs on the leaves of the plant.";
                case "substance-white":
                    return "White, powdery substance on the leaves of the plant.";
                case "insect (pale-green)":
                    return "Small, pale green insects about 3mm in length that fly short distances when disturbed.";
                case "insect (night)":
                    return "Small insects that only appear at night.";
                case "insect (cloud)":
                    return "Clouds of insects flying around the plant.";
                case "insect (black)":
                    return "Small, black, insects.";
                case "insect (aphid)":
                    return "Small insects, black or green in colour, about 1-7mm in length.";
                default:
                    return "";
            }
        case "flower":
            switch (tag) {
                case "black":
                    return "Flower buds turning black.";
                case "drop":
                    return "Flower buds are dropping before fully forming or opening.";
                case "none":
                    return "No flowers are forming for an extended period of time";
                case "pale":
                    return "New flowers are pale or desaturated in colour.";
                case "substance-sticky":
                    return "Flowers have a sticky substance on them";
                case "substance-white":
                    return "Flowers have a white, powdery substance on them";
                case "white":
                    return "Flowers have white or pale streaks in them.";
                default:
                    return "";
            }
        case "stem":
            switch (tag) {
                case "black":
                    return "The tips of the stem turn black.";
                case "etiolated":
                    return "The stems are etiolated, lopsided or 'stretched-out.";
                case "insect":
                    return "Clusters of insects around 1-7mm in length can be seen on the stems.";
                case "mark-brown":
                    return "Brown marks visible on the stems of the plant.";
                case "mark-wet":
                    return "Brown patches with a wet appearance to them on the stems of the plant.";
                case "scale":
                    return "Scale, or small, hard bumps on the stems of the plant.";
                case "scorch":
                    return "Stems are scorched, have burn marks or pale brown patches.";
                case "substance-fluffy":
                    return "Stems have a white, fluffy substance on them.";
                case "substance-sticky":
                    return "There is a sticky substance on the stems.";
                case "substance-web":
                    return "Silky webs are present on the stems.";
                default:
                    return "";
            }
        case "root":
            switch (tag) {
                case "rot":
                    return "Roots are mushy, dark brown, or black.";
                case "insect":
                    return "Earwigs can be seen during the day hiding in the soil.";
                case "maggot":
                    return "Small white maggots can be found in the soil";
                case "aphid":
                    return "Small black or green bugs in the soil next to the roots";
                case "wool":
                    return "White, wooly clumps can be seen next to or on the roots.";
                case "grub":
                    return "White grubs with brown heads can be seen in the soil. The roots may also be damaged.";
                default:
                    return "";
            }
        case "growth":
            switch (tag) {
                case "slow":
                    return "Any new growth is slow or stunted";
                case "etiolated":
                    return "New growth is etiolated, lopsided, or 'stretched-out'.";
                case "fast":
                    return "New growth occurs rapidly, and is softer than other parts of the plant";
                case "distorted":
                    return "New growth is distorted or misshapen."
                default:
                    return "";
            }
        case "whole":
            switch (tag) {
                case "collapsed":
                    return "The plant has collapsed.";
                case "insect":
                    return "Fly-like insects around the plant.";
                case "mark-brown":
                    return "Brown marks visible on the entirety of the plant.";
                case "mark-white":
                    return "Small white spots over the entire plant.";
                case "mush":
                    return "Mushy patches, particularly towards the base or crown of the plant.";
                case "no-water":
                    return "The plant appears withered and does not recover after being watered.";
                case "odor":
                    return "A pungent scent coming from the plant or substrate of the plant.";
                case "wilt":
                    return "The plant is wilting or shrivelled.";
                default:
                    return "";
            }
        default:
            return "";
    }
}