const loginForm = document.getElementById("loginForm")

function getStudents(){
    return JSON.parse(localStorage.getItem("enaa_students")) || []
}

loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const nomInput = document.getElementById("nomInput")
    const prenomInput = document.getElementById("prenomInput")
    const students = getStudents()

    const foundStudent = students.find(student => student.nom === nomInput.value && student.prenom === prenomInput.value)
    console.log(foundStudent)
        if(foundStudent){
            sessionStorage.setItem("activeStudent",JSON.stringify(foundStudent))
            window.location.href='apprenant/pages/statistiques.html'
        } else {alert("Login failed! wrong credentials")}
    }
)