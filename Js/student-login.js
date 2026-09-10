document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("studentLoginForm");
    const message = document.getElementById("loginMessage");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const matricNumber = document
            .getElementById("loginMatricNumber")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("loginPassword")
            .value
            .trim();

        const students = JSON.parse(
            localStorage.getItem("students")
        ) || [];

        const student = students.find(function (item) {

            return String(item.matric)
                .trim()
                .toLowerCase() === matricNumber;

        });

        if (!student) {

            message.innerHTML =
                "Student not found. Please check your Matric Number.";

            return;
        }

        if (String(student.password).trim() !== password) {

            message.innerHTML =
                "Incorrect password. Please try again.";

            return;
        }

        localStorage.setItem(
            "loggedInStudent",
            JSON.stringify(student)
        );

        message.innerHTML =
            "Login successful! Redirecting...";

        setTimeout(function () {
            window.location.href = "student-dashboard.html";
        }, 1000);

    });

});
