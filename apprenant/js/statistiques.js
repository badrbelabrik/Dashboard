function getStudents(){
    return JSON.parse(localStorage.getItem("enaa_students")) || []
}
function getAttendance(){
    return JSON.parse(localStorage.getItem("enaa_attendance")) || []
}
function getActiveStudent(){
    return JSON.parse(sessionStorage.getItem("activeStudent"))
}
const activeStudent = getActiveStudent()
document.getElementById("studentName").textContent = `${activeStudent.prenom} ${activeStudent.nom}` 
document.querySelector(".mb-4.fw-bold").textContent = `Statistiques de ${activeStudent.prenom} ${activeStudent.nom}` 

function calculateAbsenceRate(){
  const studentId = activeStudent.id  
  const attendance = getAttendance()
  let count = 0
  for(day of attendance){
    const currentStudent = day.students.find(item => item.studentId === studentId)
    if(currentStudent.status === "absent"){
      count ++
    }
  }
  const absenceRate = ((count / attendance.length)*100).toFixed(1)
  document.querySelector('.absence-rate').textContent = `${absenceRate}%`
}

function calculateLateRate(){
  const studentId = activeStudent.id  
  const attendance = getAttendance()
  let count = 0
  for(day of attendance){
    const currentStudent = day.students.find(item => item.studentId === studentId)
    if(currentStudent.status === "late"){
      count ++
    }
  }
  const lateRate = ((count / attendance.length)*100).toFixed(1)
  document.querySelector('.late-rate').textContent = `${lateRate}%`
}
let rateLate = 0
function calculatePresentDays(){
    const studentId = activeStudent.id  
  const attendance = getAttendance()
  let count = 0
  for(day of attendance){
    const currentStudent = day.students.find(item => item.studentId === studentId)
    if(currentStudent.status === "absent"){
      count ++
    }
  }
  rateLate = count
  const presentDays = attendance.length - count
  document.querySelector('.present-rate').textContent = `${presentDays} jours`
}
console.log(rateLate)
function calculateLateHour(){
  const studentId = activeStudent.id  
  const attendance = getAttendance()
  let totalMinutes = 0
  let count = 0
  for(day of attendance){
    const currentStudent = day.students.find(item => item.studentId === studentId)
    if(currentStudent.status === "late"){
      const [hours, minutes] = currentStudent.arrivalTime.split(":").map(Number)
      totalMinutes += (hours*60)+minutes
      count++
    }
  }
  console.log
  const averageMinuteesTotal = Math.round(totalMinutes/count)
  const averageHour = Math.floor(averageMinuteesTotal/60)
  const averageMinute = averageMinuteesTotal%60
  
  document.querySelector('.arrive-rate').textContent = `${averageHour}:${averageMinute} AM`
}

function pieChart(){
const data = {
  labels: [
    'Absence',
    'Retard',
    'Present'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      '#EF4444',
      '#F59E0B',
      '#10b981'
    ],
    hoverOffset: 4
  }]
};
const config = {
  type: 'pie',
  data: data,
};
const pieChart = new Chart(document.querySelector("#pieChart").getContext('2d'),config)
}

function lineChart(){
const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1,
    backgroundColor: rgba(255, 255, 255, 1)
  }]
};
const config = {
  type: 'line',
  data: data,
};
const lineChart = new Chart(document.querySelector("#lineChart").getContext('2d'),config)
}

// Sidebar toggle

const menuToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  sidebarOverlay.classList.toggle('show');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('show');
  sidebarOverlay.classList.remove('show');
});

 
if (window.innerWidth <= 768) {
  const navLinks = sidebar.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('show');
      sidebarOverlay.classList.remove('show');
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
    calculateAbsenceRate()
    calculateLateRate()
    calculatePresentDays()
    calculateLateHour()
    pieChart()
    lineChart()
})