


// ==========================******************
// **************************************
/*************************************************
 * STUDENTS DATA (example)
 *************************************************/
const students = [
  {
    firstname: "samira",
    lastname: "elbous",
    absences: ["2025-01-03", "2025-01-15"],
    tardiness: ["2025-01-10", "2025-02-02"]
  },
  {
    firstname: "soumia",
    lastname: "lou",
    absences: ["2025-01-08"],
    tardiness: []
  },
  {
    firstname: "nawal",
    lastname: "ham",
    absences: ["2025-02-01"],
    tardiness: ["2025-01-05"]
  },
  {
    firstname: "wiam",
    lastname: "kaj",
    absences: [],
    tardiness: ["2025-01-20"]
  }
];

/*************************************************
 * CURRENT MONTH & YEAR
 *************************************************/
const currentMonth = 0; // January (0 = Jan)
const currentYear = 2025;

/*************************************************
 * CHECK IF DATE IS IN CURRENT MONTH
 *************************************************/
function isInMonth(dateString, month, year) {
  const date = new Date(dateString);
  return (
    date.getMonth() === month &&
    date.getFullYear() === year
  );
}

/*************************************************
 * CALCULATE ABSENCE RATE
 *************************************************/
function calculateAbsenceRate(students, month, year) {
  let absentStudents = 0;

  students.forEach(student => {
    const hasAbsence = student.absences.some(date =>
      isInMonth(date, month, year)
    );

    if (hasAbsence) {
      absentStudents++;
    }
  });

  const rate = (absentStudents / students.length) * 100;
  return rate.toFixed(1);
}

/*************************************************
 * CALCULATE TARDINESS RATE
 *************************************************/
function calculateTardinessRate(students, month, year) {
  let tardyStudents = 0;

  students.forEach(student => {
    const hasTardiness = student.tardiness.some(date =>
      isInMonth(date, month, year)
    );

    if (hasTardiness) {
      tardyStudents++;
    }
  });

  const rate = (tardyStudents / students.length) * 100;
  return rate.toFixed(1);
}

/*************************************************
 * UPDATE DASHBOARD CARDS
 *************************************************/
function updateStatsCards() {
  const absenceRate = calculateAbsenceRate(students, currentMonth, currentYear);
  const tardinessRate = calculateTardinessRate(students, currentMonth, currentYear);
  const attendanceRate = (100 - absenceRate).toFixed(1);

  document.querySelector(".absence-rate").textContent = absenceRate + "%";
  document.querySelector(".tardiness-rate").textContent = tardinessRate + "%";
  document.querySelector(".attendance-rate").textContent = attendanceRate + "%";
}

/*************************************************
 * TOP 3 MOST ABSENT STUDENTS
 *************************************************/
function top3MostAbsent(students, month, year) {
  return students
    .map(student => ({
      firstname: student.firstname,
      lastname: student.lastname,
      count: student.absences.filter(date =>
        isInMonth(date, month, year)
      ).length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

/*************************************************
 * TOP 3 MOST TARDY STUDENTS
 *************************************************/
function top3MostTardy(students, month, year) {
  return students
    .map(student => ({
      firstname: student.firstname,
      lastname: student.lastname,
      count: student.tardiness.filter(date =>
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

  const topAbsent = top3MostAbsent(students, currentMonth, currentYear);

  topAbsent.forEach((student, index) => {
    const initials =
      student.firstname[0].toUpperCase() +
      student.lastname[0].toUpperCase();

    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>
          <span class="badge bg-primary rounded-2 me-2"
            style="width:30px;height:25px;display:inline-flex;
            align-items:center;justify-content:center;">
            ${initials}
          </span>
          ${student.firstname} ${student.lastname}
        </td>
        <td>
          <span class="badge border border-danger text-danger rounded-4 px-3">
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

  const topTardy = top3MostTardy(students, currentMonth, currentYear);

  topTardy.forEach((student, index) => {
    const initials =
      student.firstname[0].toUpperCase() +
      student.lastname[0].toUpperCase();

    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>
          <span class="badge bg-primary rounded-2 me-2"
            style="width:30px;height:25px;display:inline-flex;
            align-items:center;justify-content:center;">
            ${initials}
          </span>
          ${student.firstname} ${student.lastname}
        </td>
        <td>
          <span class="badge border border-warning text-warning rounded-4 px-3">
            ${student.count} Tardiness
          </span>
        </td>
      </tr>
    `;
  });
}





// *******************************
/*************************************************
 * 7. SIDEBAR TOGGLE (BEGINNER FRIENDLY)
 *************************************************/

document.addEventListener("DOMContentLoaded", function () {

  let toggleBtn = document.getElementById("sidebarToggle");
  let sidebar = document.querySelector(".sidebar");

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    sidebar.classList.toggle("show");
  });

  document.addEventListener("click", function (event) {
    if (
      window.innerWidth <= 768 &&
      !sidebar.contains(event.target) &&
      !toggleBtn.contains(event.target)
    ) {
      sidebar.classList.remove("show");
    }
  });
});
/*************************************************
 * INITIAL LOAD
 *************************************************/
updateStatsCards();
fillAbsenceTable();
fillTardinessTable();
