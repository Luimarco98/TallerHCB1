"use strict";
var Student = /** @class */ (function () {
    function Student(code, name, id, age, address, phone) {
        this.code = code;
        this.id = id;
        this.age = age;
        this.address = address;
        this.phone = phone;
        this.name = name;
    }
    return Student;
}());
var Course = /** @class */ (function () {
    function Course(name, professor, credits) {
        this.name = name;
        this.credits = credits;
        this.professor = professor;
    }
    return Course;
}());
var dataCourses = [
    new Course("Ingeniería de Sw", "Pablo Picasso", 4),
    new Course("Futbol 1", "Freddy Rincón", 2),
    new Course("Algoritmos", "Carlos Fuentes", 2),
    new Course("Estructuras de Datos", "Yesid D", 1),
    new Course("Futbol 2", "James R", 6)
];
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
// const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
btnfilterByName.onclick = function () { return applyFilterByName(); };
// equivalentes
// btnfilterByName.addEventListener("click", () => applyFilterByName());
renderCoursesInTable(dataCourses);
// totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.toLocaleLowerCase().match(nameKey.toLocaleLowerCase());
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
// Codigo para manejo de estudiante
var theStudent = new Student(2876453, "Andres", 1012467541, 25, "Carrera 8 # 20 - 12", "30012365412");
function renderStudent(student) {
    var studentTable = document.getElementById("student-table");
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Codigo</td><td>" + student.code + "</td>";
    studentTable.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Nombre</td><td>" + student.name + "</td>";
    studentTable.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Cedula</td><td>" + student.id + "</td>";
    studentTable.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Edad</td><td>" + student.age + "</td>";
    studentTable.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Direccion</td><td>" + student.address + "</td>";
    studentTable.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Telefono</td><td>" + student.phone + "</td>";
    studentTable.appendChild(trElement);
}
var minMaxButton = document.getElementById("button-filterByMinAndMax");
minMaxButton.onclick = filterByMinAndMax;
function filterByMinAndMax() {
    var minSearchBox = document.getElementById("search-box-min");
    var maxSearchBox = document.getElementById("search-box-max");
    var minValue = minSearchBox.value === "" ? 0 : minSearchBox.value;
    var maxValue = maxSearchBox.value === "" ? 100 : maxSearchBox.value;
    clearCoursesInTable();
    var filtered = dataCourses.filter(function (c) { return c.credits >= minValue && c.credits <= maxValue; }); // function(c) { return c.credits >= minValue && c.credits <= maxValue }
    renderCoursesInTable(filtered);
}
renderStudent(theStudent);
