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
  const presentDays = attendance.length - count
  document.querySelector('.present-rate').textContent = `${presentDays} jours`
}

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
  console.log(`${averageHour}////${averageMinute}`)
 
  // document.querySelector('.arrive-rate').textContent = `${averageHour}:${averageMinute} AM`
}
calculateLateHour()


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
})