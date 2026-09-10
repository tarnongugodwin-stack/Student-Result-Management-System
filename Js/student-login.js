document.addEventListener("DOMContentLoaded", function () {

    alert("Student login system loaded!");

    const form = document.getElementById("studentLoginForm");

    if (!form) {
        alert("Login form not found!");
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Login button is working!");

        const matricNumber = document
            .getElementById("loginMatricNumber")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value;

        const students = JSON.parse(
            localStorage.getItem("students")
        ) || [];

        alert("Number of registered students found: " + students.length);

        const student = students.find(function (item) {

            return item.matric &&
                   item.matric.toLowerCase() ===
                   matricNumber.toLowerCase();

        });

        if (!student) {

            alert("Student not found!");

            return;
        }

        if (student.password !== password) {

            alert("Incorrect password!");

            return;
        }

        alert("Login successful!");

        localStorage.setItem(
            "loggedInStudent",
            JSON.stringify(student)
        );

        window.location.href = "student-dashboard.html";

    });

});
