document.addEventListener("DOMContentLoaded", function () {

    const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent")
    );

    if (!loggedInStudent) {

        window.location.href = "student-login.html";

        return;
    }

    document.getElementById("welcomeStudent").innerHTML =
        "Welcome, " + loggedInStudent.fullname;

});

function logoutStudent() {

    localStorage.removeItem("loggedInStudent");

    alert("You have successfully logged out.");

          }
