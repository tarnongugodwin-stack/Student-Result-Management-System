
document.addEventListener("DOMContentLoaded", function () {

    alert("Student login system loaded!");

    const form = document.getElementById("studentLoginForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const matricNumber = document
            .getElementById("loginMatricNumber")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value
            .trim();

        const students = JSON.parse(
            localStorage.getItem("students")
        ) || [];

        let savedMatricNumbers = "";

        students.forEach(function (student, index) {

            savedMatricNumbers +=
                "Student " + (index + 1) +
                ": " + student.matric +
                "\n";

        });

        alert(
            "SAVED MATRIC NUMBERS:\n\n" +
            savedMatricNumbers
        );

    });

});
