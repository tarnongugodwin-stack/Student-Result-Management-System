document.addEventListener("DOMContentLoaded", function () {

    const students = JSON.parse(
        localStorage.getItem("students")
    ) || [];

    const table = document.getElementById("studentsTable");

    if (students.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">No students registered yet.</td>
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

            <td>
                <button onclick="editStudent(${index})">
                    ✏️ Edit
                </button>

                <button onclick="deleteStudent(${index})">
                    🗑️ Delete
                </button>
            </td>
        `;

        table.appendChild(row);

    });

});


// ===============================
// DELETE STUDENT
// ===============================

function deleteStudent(index) {

    const students = JSON.parse(
        localStorage.getItem("students")
    ) || [];


    const student = students[index];


    const confirmDelete = confirm(
        "Are you sure you want to delete " +
        student.fullname +
        "?"
    );


    if (!confirmDelete) {

        return;

    }


    students.splice(index, 1);


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    alert("Student deleted successfully!");


    location.reload();

}


// ===============================
// EDIT STUDENT
// ===============================

function editStudent(index) {

    const students = JSON.parse(
        localStorage.getItem("students")
    ) || [];


    const student = students[index];


    const fullname = prompt(
        "Enter Full Name:",
        student.fullname
    );

    if (fullname === null) return;


    const matric = prompt(
        "Enter Matric Number:",
        student.matric
    );

    if (matric === null) return;


    const department = prompt(
        "Enter Department:",
        student.department
    );

    if (department === null) return;


    const level = prompt(
        "Enter Level:",
        student.level
    );

    if (level === null) return;


    students[index] = {

        ...student,

        fullname: fullname,
        matric: matric,
        department: department,
        level: level

    };


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    alert("Student updated successfully!");


    location.reload();

}
