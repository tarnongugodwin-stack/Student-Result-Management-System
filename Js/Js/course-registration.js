document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("courseForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const course = {
            code: document.getElementById("courseCode").value,
            title: document.getElementById("courseTitle").value,
            credit: document.getElementById("creditUnit").value,
            department: document.getElementById("department").value
        };

        let courses = JSON.parse(localStorage.getItem("courses")) || [];

        const existingCourse = courses.find(function (item) {
            return item.code === course.code;
        });

        if (existingCourse) {
            message.innerHTML = "Course with this code already exists.";
            return;
        }

        courses.push(course);

        localStorage.setItem("courses", JSON.stringify(courses));

        message.innerHTML = "Course added successfully!";

        form.reset();

    });

});
