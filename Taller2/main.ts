class Student {
  code: number;
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;

  constructor(code: number, name: string, id: number, age: number, address: string, phone: string) {
    this.code = code;
    this.id = id;
    this.age = age;
    this.address = address;
    this.phone = phone;
    this.name = name;
  }
}


class Course {
  name: string;
  credits: number;
  professor: string;

  constructor(name: string, professor: string, credits: number) {
    this.name = name;
    this.credits = credits;
    this.professor = professor;
  }
}

const dataCourses = [
  new Course("Ingeniería de Sw", "Pablo Picasso", 4),
  new Course("Futbol 1", "Freddy Rincón", 2),
  new Course("Algoritmos", "Carlos Fuentes", 2),
  new Course("Estructuras de Datos", "Yesid D", 1),
  new Course("Futbol 2", "James R", 6)
]


let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
// const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
// equivalentes
// btnfilterByName.addEventListener("click", () => applyFilterByName());

renderCoursesInTable(dataCourses);

// totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}




function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.toLocaleLowerCase().match(nameKey.toLocaleLowerCase()));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
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

const theStudent = new Student(2876453, "Andres", 1012467541, 25, "Carrera 8 # 20 - 12", "30012365412")

function renderStudent(student: Student) {
  const studentTable = document.getElementById("student-table")!;

  let trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Codigo</td><td>${student.code}</td>`;
  studentTable.appendChild(trElement);

  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Nombre</td><td>${student.name}</td>`;
  studentTable.appendChild(trElement);

  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Cedula</td><td>${student.id}</td>`
  studentTable.appendChild(trElement);

  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Edad</td><td>${student.age}</td>`
  studentTable.appendChild(trElement);

  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Direccion</td><td>${student.address}</td>`
  studentTable.appendChild(trElement);


  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Telefono</td><td>${student.phone}</td>`
  studentTable.appendChild(trElement);
}

const minMaxButton = document.getElementById("button-filterByMinAndMax")!;
minMaxButton.onclick = filterByMinAndMax;

function filterByMinAndMax() {
  const minSearchBox = <HTMLInputElement>document.getElementById("search-box-min")!;
  const maxSearchBox = <HTMLInputElement>document.getElementById("search-box-max")!;

  const minValue = minSearchBox.value === "" ? 0 : minSearchBox.value;
  const maxValue = maxSearchBox.value === "" ? 100 : maxSearchBox.value;

  clearCoursesInTable();
  const filtered = dataCourses.filter(c => c.credits >= minValue && c.credits <= maxValue) // function(c) { return c.credits >= minValue && c.credits <= maxValue }
  renderCoursesInTable(filtered);
}

renderStudent(theStudent);