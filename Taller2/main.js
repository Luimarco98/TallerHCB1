"use strict";
// import { dataCourses } from "./dataCourses";
var Course = /** @class */ (function () {
    function Course(name, professor, credits) {
        this.name = name;
        this.credits = credits;
        this.professor = professor;
    }
    return Course;
}());
;
var dataCourses = [
    new Course("Ingeniería de Sw", "Pablo Picasso", 4),
    new Course("Futbol 1", "Freddy Rincón", 2),
    new Course("Algoritmos", "Carlos Fuentes", 2),
    new Course("Estructuras de Datos", "Yesid D", 1),
    new Course("Futbol 2", "James R", 6)
];
var coursesTbody = document.getElementById("courses");
if (coursesTbody) {
    coursesTbody.innerText = JSON.stringify(dataCourses);
}
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                           <td>" + c.professor + "</td>\n                           <td>" + c.credits + "</td>";
        if (coursesTbody) {
            coursesTbody.appendChild(trElement);
        }
    });
}
// codigo despues en consola 
