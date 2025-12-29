

/*************************************************
 * LOCALSTORAGE HELPERS (ALREADY IN YOUR PROJECT)
 *************************************************/
function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function setStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

/*************************************************
 * CURRENT MONTH & YEAR (AUTO)
 *************************************************/
const currentMonth = new Date().getMonth();     // 0 - 11
const currentYear = new Date().getFullYear();  // e.g. 2025

/*************************************************
 * CHECK IF DATE IS IN CURRENT MONTH
 *************************************************/
function isInMonth(dateString, month, year) {
  const date = new Date(dateString);
  return date.getMonth() === month && date.getFullYear() === year;
}

/*************************************************
 * CALCULATE ABSENCE RATE
 *************************************************/
function calculateAbsenceRate(month, year) {
  const students = getStudents();
  if (students.length === 0) return "0.0";

  let absentStudents = 0;

  students.forEach(student => {
    const absences = student.absences || [];
    if (absences.some(date => isInMonth(date, month, year))) {
      absentStudents++;
    }
  });

  return ((absentStudents / students.length) * 100).toFixed(1);
}

/*************************************************
 * CALCULATE TARDINESS RATE
 *************************************************/
function calculateTardinessRate(month, year) {
  const students = getStudents();
  if (students.length === 0) return "0.0";

  let tardyStudents = 0;

  students.forEach(student => {
    const tardiness = student.tardiness || [];
    if (tardiness.some(date => isInMonth(date, month, year))) {
      tardyStudents++;
    }
  });

  return ((tardyStudents / students.length) * 100).toFixed(1);
}

/*************************************************
 * UPDATE DASHBOARD CARDS
 *************************************************/
function updateStatsCards() {
  const absenceRate = calculateAbsenceRate(currentMonth, currentYear);
  const tardinessRate = calculateTardinessRate(currentMonth, currentYear);
  const attendanceRate = (100 - parseFloat(absenceRate)).toFixed(1);

  document.querySelector(".absence-rate").textContent = absenceRate + "%";
  document.querySelector(".tardiness-rate").textContent = tardinessRate + "%";
  document.querySelector(".attendance-rate").textContent = attendanceRate + "%";
}

/*************************************************
 * TOP 3 MOST ABSENT STUDENTS
 *************************************************/
function top3MostAbsent(month, year) {
  return getStudents()
    .map(student => ({
      nom: student.nom,
      prenom: student.prenom,
      count: (student.absences || []).filter(date =>
        isInMonth(date, month, year)
      ).length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

/*************************************************
 * TOP 3 MOST TARDY STUDENTS
 *************************************************/
function top3MostTardy(month, year) {
  return getStudents()
    .map(student => ({
      nom: student.nom,
      prenom: student.prenom,
      count: (student.tardiness || []).filter(date =>
        isInMonth(date, month, year)
      ).length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

/*************************************************
 * FILL ABSENCE TABLE
 *************************************************/
function fillAbsenceTable() {
  const tableBody = document.getElementById("absenceTableBody");
  tableBody.innerHTML = "";

  const topAbsent = top3MostAbsent(currentMonth, currentYear);

  topAbsent.forEach((student, index) => {
    const initials =
      student.prenom[0].toUpperCase() +
      student.nom[0].toUpperCase();

    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>
          <span class="badge bg-primary me-2">${initials}</span>
          ${student.prenom} ${student.nom}
        </td>
        <td>
          <span class="badge border border-danger text-danger">
            ${student.count} Absences
          </span>
        </td>
      </tr>
    `;
  });
}

/*************************************************
 * FILL TARDINESS TABLE
 *************************************************/
function fillTardinessTable() {
  const tableBody = document.getElementById("tardinessTableBody");
  tableBody.innerHTML = "";

  const topTardy = top3MostTardy(currentMonth, currentYear);

  topTardy.forEach((student, index) => {
    const initials =
      student.prenom[0].toUpperCase() +
      student.nom[0].toUpperCase();

    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>
          <span class="badge bg-primary me-2">${initials}</span>
          ${student.prenom} ${student.nom}
        </td>
        <td>
          <span class="badge border border-warning text-warning">
            ${student.count} Tardiness
          </span>
        </td>
      </tr>
    `;
  });
}

/*************************************************
 * INITIAL LOAD
 *************************************************/
document.addEventListener("DOMContentLoaded", () => {
  updateStatsCards();
  fillAbsenceTable();
  fillTardinessTable();
});

