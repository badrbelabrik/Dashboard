function getStudents(){
    return JSON.parse(localStorage.getItem("enaa_students")) || []
}
function getActiveStudent(){
    return JSON.parse(sessionStorage.getItem("activeStudent"))
}
const activeStudent = getActiveStudent()
const student = document.getElementById("studentName")
student.textContent = `${activeStudent.prenom} ${activeStudent.nom}` 






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