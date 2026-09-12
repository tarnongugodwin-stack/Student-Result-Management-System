document.addEventListener("DOMContentLoaded", function () {

    const courses = JSON.parse(
        localStorage.getItem("courses")
    ) || [];

    const table = document.getElementById("coursesTable");

    if (courses.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">No courses added yet.</td>
            </tr>
        `;

        return;

    }

    courses.forEach(function (course, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.credit}</td>
            <td>${course.department}</td>

            <td>
                <button onclick="editCourse(${index})">
                    ✏️ Edit
                </button>

                <button onclick="deleteCourse(${index})">
                    🗑️ Delete
                </button>
            </td>
        `;

        table.appendChild(row);

    });

});


// ===============================
// DELETE COURSE
// ===============================

function deleteCourse(index) {

    const courses = JSON.parse(
        localStorage.getItem("courses")
    ) || [];

    const course = courses[index];

    const confirmDelete = confirm(
        "Are you sure you want to delete " +
        course.code +
        "?"
    );

    if (!confirmDelete) {

        return;

    }

    courses.splice(index, 1);

    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );

    alert("Course deleted successfully!");

    location.reload();

}


// ===============================
// EDIT COURSE
// ===============================

function editCourse(index) {

    const courses = JSON.parse(
        localStorage.getItem("courses")
    ) || [];

    const course = courses[index];

    const code = prompt(
        "Enter Course Code:",
        course.code
    );

    if (code === null) return;


    const title = prompt(
        "Enter Course Title:",
        course.title
    );

    if (title === null) return;


    const credit = prompt(
        "Enter Credit Unit:",
        course.credit
    );

    if (credit === null) return;


    const department = prompt(
        "Enter Department:",
        course.department
    );

    if (department === null) return;


    courses[index] = {

        ...course,

        code: code,
        title: title,
        credit: credit,
        department: department

    };


    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );

    alert("Course updated successfully!");

    location.reload();

        }
