function populateProblemName(commonName, scientificName, hero, main) {
    const heroCommon = document.createElement('h1');
    heroCommon.innerHTML = `${commonName[0]}`;
    hero.appendChild(heroCommon);

    const heroScientific = document.createElement('p');
    if(scientificName !== "" && scientificName !== null && scientificName !== undefined) {
        heroScientific.innerHTML = `${scientificName}`;
        hero.appendChild(heroScientific);
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
        main.appendChild(commonDiv);
    }
}

function populateSymptoms(leafTags, flowerTags, stemTags, rootTags, growthTags, wholeTags, main) {
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
    main.appendChild(preface);
}

function populateProblemInfo(treatmentData, infoData, main) {
    if(treatmentData !== "" && treatmentData !== null && treatmentData !== undefined) {
        const treatDiv = document.createElement('div');
        treatDiv.id = 'problem-treatment';
        treatDiv.innerHTML = `<h3>Treatment Options:</h3>${treatmentData}`;
        main.appendChild(treatDiv);
    }

    if(infoData !== "" && infoData !== null && infoData !== undefined) {
        const infoDiv = document.createElement('div');
        infoDiv.id = `view-info`;
        infoDiv.innerHTML = `<h3>Information:</h3>${infoData}`;
        main.appendChild(infoDiv);
    }
}