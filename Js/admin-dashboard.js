document.addEventListener("DOMContentLoaded", function () {

    // Get Students
    const students = JSON.parse(
        localStorage.getItem("students")
    ) || [];

    // Get Courses
    const courses = JSON.parse(
        localStorage.getItem("courses")
    ) || [];

    // Get Results
    const results = JSON.parse(
        localStorage.getItem("results")
    ) || [];


    // Total Students
    document.getElementById("totalStudents").textContent =
        students.length;


    // Total Courses
    document.getElementById("totalCourses").textContent =
        courses.length;


    // Total Results
    document.getElementById("totalResults").textContent =
        results.length;


    // Pass and Fail Results
    let passCount = 0;
    let failCount = 0;


    results.forEach(function (result) {

        const grade = String(
            result.grade || ""
        )
        .trim()
        .toUpperCase();


        if (grade === "F") {

            failCount++;

        } else if (grade !== "") {

            passCount++;

        }

    });


    // Calculate Pass Rate
    let passRate = 0;

    if (results.length > 0) {

        passRate =
            (passCount / results.length) * 100;

    }


    // Calculate Fail Rate
    let failRate = 0;

    if (results.length > 0) {

        failRate =
            (failCount / results.length) * 100;

    }


    // Display Rates
    document.getElementById("passRate").textContent =
        passRate.toFixed(1) + "%";


    document.getElementById("failRate").textContent =
        failRate.toFixed(1) + "%";

});
