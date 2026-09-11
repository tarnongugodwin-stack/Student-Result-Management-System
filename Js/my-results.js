
document.addEventListener("DOMContentLoaded", function () {

    const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent")
    );

    if (!loggedInStudent) {

        window.location.href = "student-login.html";
        return;

    }

    // Student Name
    document.getElementById("studentName").textContent =
        loggedInStudent.fullname + "'s Results";


    // Professional Result Header

    document.getElementById("printStudentName").textContent =
        loggedInStudent.fullname || "";

    document.getElementById("printMatricNumber").textContent =
        loggedInStudent.matric || "";

    document.getElementById("printDepartment").textContent =
        loggedInStudent.department || "";

    document.getElementById("printLevel").textContent =
        loggedInStudent.level || "";

    document.getElementById("printSession").textContent =
        "2025/2026";

    document.getElementById("printSemester").textContent =
        "First Semester";

    document.getElementById("printDate").textContent =
        new Date().toLocaleDateString();


    // Get All Results

    const results = JSON.parse(
        localStorage.getItem("results")
    ) || [];


    // Get Results For Logged-in Student

    const myResults = results.filter(function (result) {

        return String(result.matricNumber || "")
            .trim()
            .toLowerCase() ===
            String(loggedInStudent.matric || "")
            .trim()
            .toLowerCase();

    });


    // Results Table

    const table = document.getElementById("myResultsTable");

    table.innerHTML = "";


    if (myResults.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="3">
                    No results available yet.
                </td>
            </tr>
        `;

    } else {

        myResults.forEach(function (result) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${result.courseCode || ""}</td>
                <td>${result.score || ""}</td>
                <td>${result.grade || ""}</td>
            `;

            table.appendChild(row);

        });

    }


    // ==============================
    // ACADEMIC PERFORMANCE SUMMARY
    // ==============================


    // Total Courses

    const totalCourses = myResults.length;

    document.getElementById("printTotalCourses").textContent =
        totalCourses;


    // Average Score

    let totalScore = 0;

    myResults.forEach(function (result) {

        totalScore += Number(result.score) || 0;

    });

    let averageScore = 0;

    if (myResults.length > 0) {

        averageScore =
            totalScore / myResults.length;

    }

    document.getElementById("printAverageScore").textContent =
        averageScore.toFixed(2);


    // Best Grade

    const gradeOrder = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
    ];

    let bestGrade = "-";


    for (
        let i = 0;
        i < gradeOrder.length;
        i++
    ) {

        const found = myResults.some(
            function (result) {

                return String(
                    result.grade || ""
                )
                .trim()
                .toUpperCase() ===
                gradeOrder[i];

            }
        );

        if (found) {

            bestGrade = gradeOrder[i];
            break;

        }

    }


    document.getElementById("printBestGrade").textContent =
        bestGrade;


    // ==============================
    // RESULT STATUS
    // ==============================


    const hasFailedCourse = myResults.some(
        function (result) {

            return String(
                result.grade || ""
            )
            .trim()
            .toUpperCase() === "F";

        }
    );


    let resultStatus;


    if (myResults.length === 0) {

        resultStatus = "NO RESULT";

    } else if (hasFailedCourse) {

        resultStatus = "FAIL";

    } else {

        resultStatus = "PASS";

    }


    document.getElementById("printResultStatus").textContent =
        resultStatus;

});


// Print / Download Result

function printResult() {

    window.print();

}
