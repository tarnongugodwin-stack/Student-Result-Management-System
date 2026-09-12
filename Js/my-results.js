
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
const cleanMatric = String(loggedInStudent.matric || "")
    .trim()
    .toUpperCase()
    .replace(/\//g, "-");

document.getElementById("resultNumber").textContent =
    "FPG/2025-2026/" + cleanMatric;
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
function downloadResult() {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent")
    );

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


    // School Heading

    pdf.setFontSize(18);

    pdf.text(
        "FIDEI POLYTECHNIC GBOKO",
        105,
        20,
        { align: "center" }
    );


    pdf.setFontSize(14);

    pdf.text(
        "STUDENT ACADEMIC RESULT",
        105,
        30,
        { align: "center" }
    );


    // Student Information

    pdf.setFontSize(11);

    let y = 45;


    pdf.text(
        "Student Name: " +
        (loggedInStudent.fullname || ""),
        20,
        y
    );

    y += 8;


    pdf.text(
        "Matric Number: " +
        (loggedInStudent.matric || ""),
        20,
        y
    );

    y += 8;


    pdf.text(
        "Department: " +
        (loggedInStudent.department || ""),
        20,
        y
    );

    y += 8;


    pdf.text(
        "Level: " +
        (loggedInStudent.level || ""),
        20,
        y
    );

    y += 8;


    pdf.text(
        "Academic Session: 2025/2026",
        20,
        y
    );

    y += 8;


    pdf.text(
        "Semester: First Semester",
        20,
        y
    );

    y += 15;


    // Results Heading

    pdf.setFontSize(12);

    pdf.text(
        "COURSE RESULTS",
        20,
        y
    );

    y += 10;


    // Table Headings

    pdf.setFontSize(10);

    pdf.text("Course Code", 20, y);
    pdf.text("Score", 100, y);
    pdf.text("Grade", 150, y);

    y += 5;


    pdf.line(20, y, 190, y);

    y += 8;


    // Results

    myResults.forEach(function (result) {

        pdf.text(
            String(result.courseCode || ""),
            20,
            y
        );

        pdf.text(
            String(result.score || ""),
            100,
            y
        );

        pdf.text(
            String(result.grade || ""),
            150,
            y
        );

        y += 8;

    });


    y += 10;


    // Calculate Summary

    const totalCourses = myResults.length;


    let totalScore = 0;

    myResults.forEach(function (result) {

        totalScore +=
            Number(result.score) || 0;

    });


    let averageScore = 0;

    if (totalCourses > 0) {

        averageScore =
            totalScore / totalCourses;

    }


    const gradeOrder = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
    ];


    let bestGrade = "-";


    for (let i = 0; i < gradeOrder.length; i++) {

        const found =
            myResults.some(function (result) {

                return String(
                    result.grade || ""
                )
                .trim()
                .toUpperCase() ===
                gradeOrder[i];

            });

        if (found) {

            bestGrade = gradeOrder[i];
            break;

        }

    }


    // Result Status

    const hasFailedCourse =
        myResults.some(function (result) {

            return String(
                result.grade || ""
            )
            .trim()
            .toUpperCase() === "F";

        });


    let resultStatus =
        hasFailedCourse ? "FAIL" : "PASS";


    if (myResults.length === 0) {

        resultStatus = "NO RESULT";

    }


    // Summary

    pdf.setFontSize(12);

    pdf.text(
        "ACADEMIC PERFORMANCE SUMMARY",
        20,
        y
    );

    y += 10;


    pdf.setFontSize(10);


    pdf.text(
        "Total Courses: " + totalCourses,
        20,
        y
    );

    y += 8;


    pdf.text(
        "Average Score: " +
        averageScore.toFixed(2),
        20,
        y
    );

    y += 8;


    pdf.text(
        "Best Grade: " + bestGrade,
        20,
        y
    );

    y += 8;


    pdf.text(
        "Result Status: " + resultStatus,
        20,
        y
    );

    y += 15;


    // Date

    pdf.text(
        "Date Generated: " +
        new Date().toLocaleDateString(),
        20,
        y
    );


    y += 25;


    // Signatures

    pdf.text(
        "________________________",
        20,
        y
    );

    pdf.text(
        "________________________",
        120,
        y
    );


    y += 7;


    pdf.text(
        "Examination Officer",
        25,
        y
    );

    pdf.text(
        "Registrar",
        140,
        y
    );


    // Create Filename

    const cleanMatric =
        String(loggedInStudent.matric || "STUDENT")
        .trim()
        .toUpperCase()
        .replace(/\//g, "-");


    const filename =
        "FIDEI_RESULT_" +
        cleanMatric +
        "_2025-2026.pdf";


    // Download PDF

    pdf.save(filename);

}
