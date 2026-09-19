document.addEventListener("DOMContentLoaded", function () {

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    const table =
        document.getElementById("studentsTable");

    const searchInput =
        document.getElementById("studentSearch");


    function displayStudents(studentList) {

        table.innerHTML = "";


        studentList.forEach(function (student, index) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>

                <td>${student.fullname || ""}</td>

                <td>${student.matric || ""}</td>

                <td>${student.department || ""}</td>

                <td>${student.level || ""}</td>

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

    }


    // Display all students
    displayStudents(students);


    // Search students
    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.trim().toLowerCase();


        const filteredStudents = students.filter(function (student) {

            const name =
                String(student.fullname || "").toLowerCase();

            const matric =
                String(student.matric || "").toLowerCase();


            return (
                name.includes(searchText) ||
                matric.includes(searchText)
            );

        });


        displayStudents(filteredStudents);

    });


    // Edit student
    window.editStudent = function (index) {

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


        student.fullname = fullname.trim();
        student.matric = matric.trim();
        student.department = department.trim();
        student.level = level.trim();


        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        displayStudents(students);

    };


    // Delete student
    window.deleteStudent = function (index) {

        const student = students[index];


        const confirmDelete = confirm(
            "Are you sure you want to delete " +
            student.fullname + "?"
        );


        if (!confirmDelete) return;


        students.splice(index, 1);


        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        displayStudents(students);

    };

});
