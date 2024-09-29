let menu;
const close = `<button type="button" id="close-button" onclick="toggleMenu()"><i class="fa-solid fa-circle-xmark"></i></button>`;

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise);
} else { initialise(); }

function initialise() {
    const location = document.URL;
    menu = document.getElementById("overlayMenu");
    menu.innerHTML = close;
    let navigation = document.createElement("ul");

    // INDEX
    let index = document.createElement("li");
    if((location.match(/\/index(.html)?$/)) != null || (location.match(/\/$/)) != null) {
        index.classList.add('active');
        index.innerHTML = '<a href="index.html" aria-current="page"><i class="fa-solid fa-house"></i> Home</a>';
    } else {
        index.innerHTML = `<a href="index.html"><i class="fa-solid fa-house"></i> Home</a>`
    }


    // DIAGNOSIS
    let diagnosis = document.createElement("li");
    if((location.match(/\/help-my-plant(.html)?$/)) != null) {
        diagnosis.classList.add('active');
        diagnosis.innerHTML = '<a href="help-my-plant.html" aria-current="page"><i class="fa-solid fa-plant-wilt"></i> Help My Plant</a>';
    } else  {
        diagnosis.innerHTML = `<a href="help-my-plant.html"><i class="fa-solid fa-plant-wilt"></i> Help My Plant</a>`
    }

    // PLANT DATABASE
    let plant = document.createElement("li");
    if((location.match(/\/plant-database(.html)?$/)) != null) {
        plant.classList.add('active');
        plant.innerHTML = `<a href="plant-database.html" aria-current="page"><i class="fa-solid fa-leaf"></i> Plant Database</a>`;
    } else {
        plant.innerHTML = `<a href="plant-database.html"><i class="fa-solid fa-leaf"></i> Plant Database</a>`;
    }

    // PROBLEM DATABASE
    let problem = document.createElement("li");
    if((/\/problem-database(.html)?$/.exec(location)) != null) {
        problem.classList.add('active');
        problem.innerHTML = `<a href="problem-database.html" aria-current="page"><i class="fa-solid fa-bug"></i> Ailment Database</a>`;
    } else {
        problem.innerHTML = `<a href="problem-database.html"><i class="fa-solid fa-bug"></i> Ailment Database</a>`;
    }

    // ABOUT
    let about = document.createElement("li");
    if((location.match(/\/about(.html)?$/)) != null) {
        about.classList.add('active');
        about.innerHTML = `<a href="about.html" aria-current="page"><i class="fa-solid fa-question"></i> About</a>`;
    } else {
        about.innerHTML = `<a href="about.html"><i class="fa-solid fa-question"></i> About</a>`
    }
    navigation.append(index);
    navigation.append(diagnosis);
    navigation.append(plant);
    navigation.append(problem);
    navigation.append(about);
    menu.append(navigation);

}

function toggleMenu() {
        if (menu.style.display === "block") { menu.style.display = "none"; }
        else { menu.style.display = "block"; }
}