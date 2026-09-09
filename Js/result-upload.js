document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("resultForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const score = Number(document.getElementById("score").value);

        let grade;

        if (score >= 70) {
            grade = "A";
        } else if (score >= 60) {
            grade = "B";
        } else if (score >= 50) {
            grade = "C";
        } else if (score >= 45) {
            grade = "D";
        } else if (score >= 40) {
            grade = "E";
        } else {
            grade = "F";
        }

        const result = {
            studentName: document.getElementById("studentName").value,
            matricNumber: document.getElementById("matricNumber").value,
            courseCode: document.getElementById("courseCode").value,
            score: score,
            grade: grade
        };

        let results = JSON.parse(localStorage.getItem("results")) || [];

        results.push(result);

        localStorage.setItem("results", JSON.stringify(results));

        alert("Result uploaded successfully! Grade: " + grade);

        form.reset();

    });

});
