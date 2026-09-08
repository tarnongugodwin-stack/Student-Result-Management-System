document.addEventListener("DOMContentLoaded", function () {

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const table = document.getElementById("studentsTable");

    if (students.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">No students registered yet.</td>
            </tr>
        `;
        return;
    }

    students.forEach(function (student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.fullname}</td>
            <td>${student.matric}</td>
            <td>${student.department}</td>
            <td>${student.level}</td>
        `;

        table.appendChild(row);

    });

});
