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
}

function loadNoProblem(statusCode) {}