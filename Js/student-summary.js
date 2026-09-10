document.addEventListener("DOMContentLoaded", function () {

    const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent")
    );

    if (!loggedInStudent) {

        window.location.href = "student-login.html";
        return;
    }

    document.getElementById("summaryStudentName").innerHTML =
        loggedInStudent.fullname + "'s Academic Summary";

    const results = JSON.parse(
        localStorage.getItem("results")
    ) || [];

    const myResults = results.filter(function (result) {

        return String(result.matricNumber || "")
            .trim()
            .toLowerCase() ===
            String(loggedInStudent.matric || "")
            .trim()
            .toLowerCase();

    });

    // Total Results
    document.getElementById("totalMyResults").innerHTML =
        myResults.length;

    // Total Unique Courses
    const uniqueCourses = [];

    myResults.forEach(function (result) {

        if (!uniqueCourses.includes(result.courseCode)) {
            uniqueCourses.push(result.courseCode);
        }

    });

    document.getElementById("totalMyCourses").innerHTML =
        uniqueCourses.length;

    // Average Score
    let totalScore = 0;

    myResults.forEach(function (result) {
        totalScore += Number(result.score);
    });

    let average = 0;

    if (myResults.length > 0) {
        average = totalScore / myResults.length;
    }

    document.getElementById("myAverageScore").innerHTML =
        average.toFixed(2);

    // Grade Distribution
    const grades = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0
    };

    myResults.forEach(function (result) {

        if (grades.hasOwnProperty(result.grade)) {
            grades[result.grade]++;
        }

    });

    document.getElementById("myGradeA").innerHTML = grades.A;
    document.getElementById("myGradeB").innerHTML = grades.B;
    document.getElementById("myGradeC").innerHTML = grades.C;
    document.getElementById("myGradeD").innerHTML = grades.D;
    document.getElementById("myGradeE").innerHTML = grades.E;
    document.getElementById("myGradeF").innerHTML = grades.F;

    // Best Grade
    let bestGrade = "-";

    const gradeOrder = ["A", "B", "C", "D", "E", "F"];

    for (let i = 0; i < gradeOrder.length; i++) {

        if (grades[gradeOrder[i]] > 0) {

            bestGrade = gradeOrder[i];
            break;

        }

    }

    document.getElementById("bestGrade").innerHTML =
        bestGrade;

});
