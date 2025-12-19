// /*************************************************
//  * STUDENTS DATA
//  *************************************************/
// let students = [
//   {
//     firstname: "samira",
//     lastname: "elbous",
//     absences: ["2025-01-03", "2025-01-15"],
//     tardiness: ["2025-01-10", "2025-02-02"]
//   },
//   {
//     firstname: "soumia",
//     lastname: "lou",
//     absences: ["2025-01-08"],
//     tardiness: []
//   },
//   {
//     firstname: "nawal",
//     lastname: "ham",
//     absences: ["2025-02-01"],
//     tardiness: ["2025-01-05"]
//   },
//   {
//     firstname: "wiam",
//     lastname: "kaj",
//     absences: [],
//     tardiness: ["2025-01-20"]
//   }
// ];


// /*************************************************
//  * SELECTED MONTH & YEAR
//  * Month: 0 = January, 1 = February ...
//  *************************************************/
// let currentMonth = 0; // January
// let currentYear = 2025;


// /*************************************************
//  * HELPER: CHECK IF DATE IS IN MONTH
//  *************************************************/
// function isInMonth(dateString, month, year) {
//   let date = new Date(dateString);
//   return date.getMonth() === month && date.getFullYear() === year;
// }


// /*************************************************
//  * CALCULATE MONTHLY ABSENCE RATE
//  *************************************************/
// function calcMonthlyAbsenceRate(students, month, year) {
//   let absentStudents = 0;

//   for (let student of students) {
//     let hasAbsence = student.absences.some(date =>
//       isInMonth(date, month, year)
//     );

//     if (hasAbsence) {
//       absentStudents++;
//     }
//   }

//   if (students.length === 0) return 0;

//   return ((absentStudents / students.length) * 100).toFixed(1);
// }


// /*************************************************
//  * CALCULATE MONTHLY TARDINESS RATE
//  *************************************************/
// function calcMonthlyTardinessRate(students, month, year) {
//   let tardyStudents = 0;

//   for (let student of students) {
//     let hasTardiness = student.tardiness.some(date =>
//       isInMonth(date, month, year)
//     );

//     if (hasTardiness) {
//       tardyStudents++;
//     }
//   }

//   if (students.length === 0) return 0;

//   return ((tardyStudents / students.length) * 100).toFixed(1);
// }


// /*************************************************
//  * CALCULATE ATTENDANCE RATE
//  *************************************************/
// function calcAttendanceRate(absenceRate) {
//   return (100 - absenceRate).toFixed(1);
// }


// /*************************************************
//  * UPDATE DASHBOARD CARDS
//  *************************************************/
// function updateDashboard() {
//   let absenceRate = calcMonthlyAbsenceRate(
//     students,
//     currentMonth,
//     currentYear
//   );

//   let tardinessRate = calcMonthlyTardinessRate(
//     students,
//     currentMonth,
//     currentYear
//   );

//   let attendanceRate = calcAttendanceRate(absenceRate);

//   document.querySelector(".absence-rate").textContent =
//     absenceRate + "%";

//   document.querySelector(".tardiness-rate").textContent =
//     tardinessRate + "%";

//   document.querySelector(".attendance-rate").textContent =
//     attendanceRate + "%";
// }


// /*************************************************
//  * TOP 3 MOST ABSENT STUDENTS (MONTHLY)
//  *************************************************/
// function top3MostAbsent(students, month, year) {
//   let result = [];

//   for (let student of students) {
//     let count = student.absences.filter(date =>
//       isInMonth(date, month, year)
//     ).length;

//     result.push({
//       name: student.firstname + " " + student.lastname,
//       count: count
//     });
//   }

//   return result
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 3);
// }


// /*************************************************
//  * TOP 3 MOST TARDY STUDENTS (MONTHLY)
//  *************************************************/
// function top3MostTardy(students, month, year) {
//   let result = [];

//   for (let student of students) {
//     let count = student.tardiness.filter(date =>
//       isInMonth(date, month, year)
//     ).length;

//     result.push({
//       name: student.firstname + " " + student.lastname,
//       count: count
//     });
//   }

//   return result
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 3);
// }


// /*************************************************
//  * FILL ABSENCE TABLE
//  *************************************************/
// function fillAbsenceTable() {
//   let tableBody = document.getElementById("absenceTableBody");
//   tableBody.innerHTML = "";

//   let topAbsent = top3MostAbsent(
//     students,
//     currentMonth,
//     currentYear
//   );

//   topAbsent.forEach((student, index) => {
//     tableBody.innerHTML += `
//       <tr>
//   <td>${index + 1}</td>
//   <td>${student.name}</td>
//   <td>
//     <span class="badge border border-danger text-danger rounded-4 px-3">
//       ${student.count} Absences
//     </span>
//   </td>
// </tr>

//     `;
//   });
// }


// /*************************************************
//  * FILL TARDINESS TABLE
//  *************************************************/
// function fillTardinessTable() {
//   let tableBody = document.getElementById("tardinessTableBody");
//   tableBody.innerHTML = "";

//   let topTardy = top3MostTardy(
//     students,
//     currentMonth,
//     currentYear
//   );

//   topTardy.forEach((student, index) => {
//     tableBody.innerHTML += `
//       <tr>
//         <td>${index + 1}</td>
//         <td>${student.name}</td>
//         <td>
//           <span class="badge border border-warning text-warning rounded-4 px-3">
//             ${student.count} Absences
//           </span>
//         </td>
//       </tr>
//     `;
//   });
// }


// /*************************************************
//  * INITIAL LOAD
//  *************************************************/
// updateDashboard();
// fillAbsenceTable();
// fillTardinessTable();
ddd