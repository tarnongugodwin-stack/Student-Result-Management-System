document.addEventListener("DOMContentLoaded", function () {

    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    const table = document.getElementById("coursesTable");

    if (courses.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4">No courses added yet.</td>
            </tr>
        `;
        return;
    }

    courses.forEach(function (course) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.credit}</td>
            <td>${course.department}</td>
        `;

        table.appendChild(row);

    });

});
