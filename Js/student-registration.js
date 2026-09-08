document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("studentForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const student = {
            fullname: document.getElementById("fullname").value,
            matric: document.getElementById("matric").value,
            department: document.getElementById("department").value,
            level: document.getElementById("level").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        let students = JSON.parse(localStorage.getItem("students")) || [];

        const existingStudent = students.find(function (item) {
            return item.matric === student.matric;
        });

        if (existingStudent) {
            message.innerHTML = "Student with this Matric Number already exists.";
            return;
        }

        students.push(student);

        localStorage.setItem("students", JSON.stringify(students));

        message.innerHTML = "Student registered successfully!";

        form.reset();

    });

});
