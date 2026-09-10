document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("studentLoginForm");
    const message = document.getElementById("loginMessage");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

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

        const student = students.find(function (item) {

            return item.matricNumber.toLowerCase() ===
                   matricNumber.toLowerCase();

        });

        if (!student) {

            message.innerHTML =
                "Student not found. Please check your Matric Number.";

            return;
        }

        /*
         Temporary password system:
         Any registered student can use 12345
        */

        if (password !== "12345") {

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

            window.location.href =
                "student-dashboard.html";

        }, 1000);

    });

});
