document.addEventListener("DOMContentLoaded", function () {

    const results = JSON.parse(
        localStorage.getItem("results")
    ) || [];

    const table = document.getElementById("resultsTable");

    if (results.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">No results uploaded yet.</td>
            </tr>
        `;

        return;

    }

    results.forEach(function (result, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.studentName}</td>
            <td>${result.matricNumber}</td>
            <td>${result.courseCode}</td>
            <td>${result.score}</td>
            <td>${result.grade}</td>

            <td>
                <button onclick="editResult(${index})">
                    ✏️ Edit
                </button>

                <button onclick="deleteResult(${index})">
                    🗑️ Delete
                </button>
            </td>
        `;

        table.appendChild(row);

    });

});


// ===============================
// DELETE RESULT
// ===============================

function deleteResult(index) {

    const results = JSON.parse(
        localStorage.getItem("results")
    ) || [];

    const result = results[index];

    const confirmDelete = confirm(
        "Are you sure you want to delete the result for " +
        result.studentName +
        "?"
    );

    if (!confirmDelete) {

        return;

    }

    results.splice(index, 1);

    localStorage.setItem(
        "results",
        JSON.stringify(results)
    );

    alert("Result deleted successfully!");

    location.reload();

}


// ===============================
// EDIT RESULT
// ===============================

function editResult(index) {

    const results = JSON.parse(
        localStorage.getItem("results")
    ) || [];

    const result = results[index];


    const studentName = prompt(
        "Enter Student Name:",
        result.studentName
    );

    if (studentName === null) return;


    const matricNumber = prompt(
        "Enter Matric Number:",
        result.matricNumber
    );

    if (matricNumber === null) return;


    const courseCode = prompt(
        "Enter Course Code:",
        result.courseCode
    );

    if (courseCode === null) return;


    const score = prompt(
        "Enter Score:",
        result.score
    );

    if (score === null) return;


    // Automatically calculate grade

    let grade = "";

    const numericScore = Number(score);

    if (numericScore >= 70) {

        grade = "A";

    } else if (numericScore >= 60) {

        grade = "B";

    } else if (numericScore >= 50) {

        grade = "C";

    } else if (numericScore >= 45) {

        grade = "D";

    } else if (numericScore >= 40) {

        grade = "E";

    } else {

        grade = "F";

    }


    results[index] = {

        ...result,

        studentName: studentName,
        matricNumber: matricNumber,
        courseCode: courseCode,
        score: numericScore,
        grade: grade

    };


    localStorage.setItem(
        "results",
        JSON.stringify(results)
    );

    alert(
        "Result updated successfully! Grade: " +
        grade
    );

    location.reload();

        }
