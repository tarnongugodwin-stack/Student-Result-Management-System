document.addEventListener("DOMContentLoaded", function () {

    const students =
        JSON.parse(localStorage.getItem("students")) || [];

    const courses =
        JSON.parse(localStorage.getItem("courses")) || [];

    const results =
        JSON.parse(localStorage.getItem("results")) || [];

    document.getElementById("totalStudents").innerHTML =
        students.length;

    document.getElementById("totalCourses").innerHTML =
        courses.length;

    document.getElementById("totalResults").innerHTML =
        results.length;

    let totalScore = 0;

    results.forEach(function (result) {
        totalScore += Number(result.score);
    });

    let average = 0;

    if (results.length > 0) {
        average = totalScore / results.length;
    }

    document.getElementById("averageScore").innerHTML =
        average.toFixed(2);

    let grades = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0
    };

    results.forEach(function (result) {

        if (grades.hasOwnProperty(result.grade)) {
            grades[result.grade]++;
        }

    });

    document.getElementById("gradeA").innerHTML = grades.A;
    document.getElementById("gradeB").innerHTML = grades.B;
    document.getElementById("gradeC").innerHTML = grades.C;
    document.getElementById("gradeD").innerHTML = grades.D;
    document.getElementById("gradeE").innerHTML = grades.E;
    document.getElementById("gradeF").innerHTML = grades.F;

});
