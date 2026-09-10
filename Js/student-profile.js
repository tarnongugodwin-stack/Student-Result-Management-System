document.addEventListener("DOMContentLoaded", function () {

    const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent")
    );

    if (!loggedInStudent) {

        window.location.href = "student-login.html";
        return;
    }

    document.getElementById("profileFullname").textContent =
        loggedInStudent.fullname || "Not available";

    document.getElementById("profileMatric").textContent =
        loggedInStudent.matric || "Not available";

    document.getElementById("profileDepartment").textContent =
        loggedInStudent.department || "Not available";

    document.getElementById("profileLevel").textContent =
        loggedInStudent.level || "Not available";

    document.getElementById("profileEmail").textContent =
        loggedInStudent.email || "Not available";

});
