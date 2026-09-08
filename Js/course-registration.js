document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("courseForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const courseCode = document.getElementById("courseCode").value;
        const courseTitle = document.getElementById("courseTitle").value;
        const creditUnit = document.getElementById("creditUnit").value;
        const department = document.getElementById("department").value;

        const course = {
            code: courseCode,
            title: courseTitle,
            credit: creditUnit,
            department: department
        };

        let courses = JSON.parse(localStorage.getItem("courses")) || [];

        courses.push(course);

        localStorage.setItem("courses", JSON.stringify(courses));

        alert("Course added successfully!");

        form.reset();

    });

});
