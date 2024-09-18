import coffeeTheme from './modules/surveyTheme.js';
import surveyJson from './modules/surveyContent.js';
console.log(coffeeTheme);

const survey = new Survey.Model(surveyJson);

survey.applyTheme(coffeeTheme);

document.addEventListener("DOMContentLoaded", function () { survey.render(document.getElementById("surveyContainer")); });

