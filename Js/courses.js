document.addEventListener("DOMContentLoaded", function () {

    let courses =
        JSON.parse(localStorage.getItem("courses")) || [];

    const table =
        document.getElementById("coursesTable");

    const searchInput =
        document.getElementById("courseSearch");


    function displayCourses(courseList) {

        table.innerHTML = "";

        courseList.forEach(function (course, index) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${course.code || ""}</td>

                <td>${course.title || ""}</td>

                <td>${course.credit || ""}</td>

                <td>${course.department || ""}</td>

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

    }


    // Display all courses
    displayCourses(courses);


    // Search courses
    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.trim().toLowerCase();


        const filteredCourses = courses.filter(function (course) {

            const code =
                String(course.code || "").toLowerCase();

            const title =
                String(course.title || "").toLowerCase();


            return (
                code.includes(searchText) ||
                title.includes(searchText)
            );

        });


        displayCourses(filteredCourses);

    });


    // Edit course
    window.editCourse = function (index) {

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


        course.code = code.trim();
        course.title = title.trim();
        course.credit = credit.trim();
        course.department = department.trim();


        localStorage.setItem(
            "courses",
            JSON.stringify(courses)
        );


        displayCourses(courses);

    };


    // Delete course
    window.deleteCourse = function (index) {

        const course = courses[index];


        const confirmDelete = confirm(
            "Are you sure you want to delete " +
            course.code + "?"
        );


        if (!confirmDelete) return;


        courses.splice(index, 1);


        localStorage.setItem(
            "courses",
            JSON.stringify(courses)
        );


        displayCourses(courses);

    };

});
