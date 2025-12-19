

// /*********************************************************
//  * LOAD STUDENTS FROM LOCAL STORAGE
//  *********************************************************/
// const students = JSON.parse(localStorage.getItem("students")) || [];

// /*********************************************************
//  * GLOBAL STATE
//  *********************************************************/
// let currentMonth = "2025-01";

// // const rowsPerPage = 4;
// // let currentPage = {
// //   absence: 1,
// //   tardiness: 1
// // };

// /*********************************************************
//  * MAIN DASHBOARD UPDATE
//  *********************************************************/
// function updateDashboard(month = currentMonth) {
//   currentMonth = month;

//   updateStatsCards(month);
//   renderTable("absence", students, month);
//   renderTable("tardiness", students, month);
// }

// /*********************************************************
//  * UPDATE STATISTIC CARDS
//  *********************************************************/
// function updateStatsCards(month) {
//   const { totalAbsence, totalTardiness } = calculateMonthlyStats(month);

//   const totalStudents = students.length || 1;
//   const absenceRate = (totalAbsence / totalStudents).toFixed(1);
//   const tardinessRate = (totalTardiness / totalStudents).toFixed(1);
//   const attendanceRate = (100 - absenceRate).toFixed(1);

//   document.querySelector(".absence-rate").textContent = absenceRate + "%";
//   document.querySelector(".tardiness-rate").textContent = tardinessRate + "%";
//   document.querySelector(".attendance-rate").textContent = attendanceRate + "%";
// }

// /*********************************************************
//  * CALCULATE MONTHLY TOTALS
//  *********************************************************/
// function calculateMonthlyStats(month) {
//   let totalAbsence = 0;
//   let totalTardiness = 0;

//   students.forEach(student => {
//     if (student.records?.[month]) {
//       totalAbsence += student.records[month].absence || 0;
//       totalTardiness += student.records[month].tardiness || 0;
//     }
//   });

//   return { totalAbsence, totalTardiness };
// }

// /*********************************************************
//  * RENDER TABLES (SORT + PAGINATION)
//  *********************************************************/
// function renderTable(type, students, month) {
//   const tableBody = document.getElementById(type + "TableBody");
//   tableBody.innerHTML = "";

//   // Sort by month value
//   const sorted = [...students].sort((a, b) => {
//     const aValue = a.records?.[month]?.[type] || 0;
//     const bValue = b.records?.[month]?.[type] || 0;
//     return bValue - aValue;
//   });
// }


// // 


// /*********************************************************
//  * SIDEBAR TOGGLE
//  *********************************************************/
// const toggleBtn = document.getElementById("sidebarToggle");
// const sidebar = document.querySelector(".sidebar");

// if (toggleBtn) {
//   toggleBtn.addEventListener("click", () => {
//     sidebar.classList.toggle("show");
//   });
// }

// document.addEventListener("click", (e) => {
//   if (
//     window.innerWidth <= 768 &&
//     !sidebar.contains(e.target) &&
//     !toggleBtn.contains(e.target)
//   ) {
//     sidebar.classList.remove("show");
//   }
// });

// /*********************************************************
//  * INITIAL LOAD
//  *********************************************************/
// updateDashboard(currentMonth);








// =============================================================
// ===============================================================
// ============================================================
/*************************************************
 * 1. LOAD STUDENTS FROM LOCAL STORAGE
 *************************************************/

// // Get students from localStorage
// let studentsData = localStorage.getItem("students");

// // Convert text to JavaScript array
// let students;
// if (studentsData) {
//   students = JSON.parse(studentsData);
// } else {
//   students = [];
// }


// /*************************************************
//  * 2. GLOBAL VARIABLES
//  *************************************************/

// // Current selected month
// let currentMonth = "2025-01";


// /*************************************************
//  * 3. MAIN DASHBOARD FUNCTION
//  *************************************************/

// function updateDashboard(month) {

//   // If month not provided, use currentMonth
//   if (!month) {
//     month = currentMonth;
//   }

//   currentMonth = month;

//   updateStatsCards(month);
//   renderTable("absence", month);
//   renderTable("tardiness", month);
// }


// /*************************************************
//  * 4. UPDATE STATISTICS CARDS
//  *************************************************/

// function updateStatsCards(month) {

//   let totals = calculateMonthlyStats(month);

//   let totalAbsence = totals.totalAbsence;
//   let totalTardiness = totals.totalTardiness;

//   let totalStudents = students.length;
//   if (totalStudents === 0) {
//     totalStudents = 1;
//   }

//   let absenceRate = (totalAbsence / totalStudents).toFixed(1);
//   let tardinessRate = (totalTardiness / totalStudents).toFixed(1);
//   let attendanceRate = (100 - absenceRate).toFixed(1);

//   document.querySelector(".absence-rate").textContent = absenceRate + "%";
//   document.querySelector(".tardiness-rate").textContent = tardinessRate + "%";
//   document.querySelector(".attendance-rate").textContent = attendanceRate + "%";
// }


// /*************************************************
//  * 5. CALCULATE MONTHLY TOTALS
//  *************************************************/

// function calculateMonthlyStats(month) {

//   let totalAbsence = 0;
//   let totalTardiness = 0;

//   for (let i = 0; i < students.length; i++) {

//     let student = students[i];

//     if (student.records && student.records[month]) {

//       if (student.records[month].absence) {
//         totalAbsence += student.records[month].absence;
//       }

//       if (student.records[month].tardiness) {
//         totalTardiness += student.records[month].tardiness;
//       }
//     }
//   }

//   return {
//     totalAbsence: totalAbsence,
//     totalTardiness: totalTardiness
//   };
// }


// /*************************************************
//  * 6. RENDER TABLE (SIMPLE SORT)
//  *************************************************/

// function renderTable(type, month) {

//   let tableBody = document.getElementById(type + "TableBody");
//   tableBody.innerHTML = "";

//   // Copy students array
//   let sortedStudents = students.slice();

//   // Sort students
//   sortedStudents.sort(function (a, b) {

//     let aValue = 0;
//     let bValue = 0;

//     if (a.records && a.records[month]) {
//       aValue = a.records[month][type] || 0;
//     }

//     if (b.records && b.records[month]) {
//       bValue = b.records[month][type] || 0;
//     }

//     return bValue - aValue;
//   });

//   // Display students
//   for (let i = 0; i < sortedStudents.length; i++) {

//     let student = sortedStudents[i];
//     let value = 0;

//     if (student.records && student.records[month]) {
//       value = student.records[month][type] || 0;
//     }

//     let initials =
//       student.firstName.charAt(0) +
//       student.lastName.charAt(0);

//     tableBody.innerHTML += `
//       <tr>
//         <td>${i + 1}</td>
//         <td>
//           <span class="badge bg-primary me-2"
//             style="width:30px;height:25px;display:inline-flex;
//                    align-items:center;justify-content:center;">
//             ${initials}
//           </span>
//           ${student.firstName} ${student.lastName}
//         </td>
//         <td>${value}</td>
//       </tr>
//     `;
//   }
// }


// /*************************************************
//  * 7. SIDEBAR TOGGLE (BEGINNER FRIENDLY)
//  *************************************************/

// document.addEventListener("DOMContentLoaded", function () {

//   let toggleBtn = document.getElementById("sidebarToggle");
//   let sidebar = document.querySelector(".sidebar");

//   if (!toggleBtn || !sidebar) return;

//   toggleBtn.addEventListener("click", function (event) {
//     event.stopPropagation();
//     sidebar.classList.toggle("show");
//   });

//   document.addEventListener("click", function (event) {
//     if (
//       window.innerWidth <= 768 &&
//       !sidebar.contains(event.target) &&
//       !toggleBtn.contains(event.target)
//     ) {
//       sidebar.classList.remove("show");
//     }
//   });
// });


// /*************************************************
//  * 8. INITIAL LOAD
//  *************************************************/

// updateDashboard(currentMonth);











// ===================load 3 
/*************************************************
 * 1. LOAD STUDENTS FROM LOCAL STORAGE
 *************************************************/

// Get students from localStorage
let studentsData = localStorage.getItem("students");

// Convert text to JavaScript array
let students;
if (studentsData) {
  students = JSON.parse(studentsData);
} else {
  students = [];
}


/*************************************************
 * 2. GLOBAL VARIABLES
 *************************************************/

// Current selected month
let currentMonth = "2025-01";


/*************************************************
 * 3. MAIN DASHBOARD FUNCTION
 *************************************************/

function updateDashboard(month) {

  // If month not provided, use currentMonth
  if (!month) {
    month = currentMonth;
  }

  currentMonth = month;

  updateStatsCards(month);
  renderTable("absence", month);
  renderTable("tardiness", month);
}


/*************************************************
 * 4. UPDATE STATISTICS CARDS
 *************************************************/

function updateStatsCards(month) {

  let totals = calculateMonthlyStats(month);

  let totalAbsence = totals.totalAbsence;
  let totalTardiness = totals.totalTardiness;

  let totalStudents = students.length;
  if (totalStudents === 0) {
    totalStudents = 1;
  }

  let absenceRate = (totalAbsence / totalStudents).toFixed(1);
  let tardinessRate = (totalTardiness / totalStudents).toFixed(1);
  let attendanceRate = (100 - absenceRate).toFixed(1);

  document.querySelector(".absence-rate").textContent = absenceRate + "%";
  document.querySelector(".tardiness-rate").textContent = tardinessRate + "%";
  document.querySelector(".attendance-rate").textContent = attendanceRate + "%";
}


/*************************************************
 * 5. CALCULATE MONTHLY TOTALS
 *************************************************/

function calculateMonthlyStats(month) {

  let totalAbsence = 0;
  let totalTardiness = 0;

  for (let i = 0; i < students.length; i++) {

    let student = students[i];

    if (student.records && student.records[month]) {

      if (student.records[month].absence) {
        totalAbsence += student.records[month].absence;
      }

      if (student.records[month].tardiness) {
        totalTardiness += student.records[month].tardiness;
      }
    }
  }

  return {
    totalAbsence: totalAbsence,
    totalTardiness: totalTardiness
  };
}


/*************************************************
 * 6. RENDER TABLE (SIMPLE SORT)
 *************************************************/

function renderTable(type, month) {

  let tableBody = document.getElementById(type + "TableBody");
  tableBody.innerHTML = "";

  // Copy students array
  let sortedStudents = students.slice();

  // Sort students
  sortedStudents.sort(function (a, b) {

    let aValue = 0;
    let bValue = 0;

    if (a.records && a.records[month]) {
      aValue = a.records[month][type] || 0;
    }

    if (b.records && b.records[month]) {
      bValue = b.records[month][type] || 0;
    }

    return bValue - aValue;
  });

  // Display students
  for (let i = 0; i < sortedStudents.length; i++) {

    let student = sortedStudents[i];
    let value = 0;

    if (student.records && student.records[month]) {
      value = student.records[month][type] || 0;
    }

    let initials =
      student.firstName.charAt(0) +
      student.lastName.charAt(0);

    tableBody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>
          <span class="badge bg-primary me-2"
            style="width:30px;height:25px;display:inline-flex;
                   align-items:center;justify-content:center;">
            ${initials}
          </span>
          ${student.firstName} ${student.lastName}
        </td>
        <td>${value}</td>
      </tr>
    `;
  }
}


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
 * 8. INITIAL LOAD
 *************************************************/

updateDashboard(currentMonth);
