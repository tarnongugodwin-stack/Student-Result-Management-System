document.addEventListener("DOMContentLoaded", function () {

    const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent")
    );

    if (!loggedInStudent) {

        window.location.href = "student-login.html";
        return;
    }

    document.getElementById("studentName").innerHTML =
        loggedInStudent.fullname + "'s Results";
document.getElementById("printStudentName").textContent =
    loggedInStudent.fullname || "";

document.getElementById("printMatricNumber").textContent =
    loggedInStudent.matric || "";

document.getElementById("printDepartment").textContent =
    loggedInStudent.department || "";

document.getElementById("printLevel").textContent =
    loggedInStudent.level || "";
    document.getElementById("printDate").textContent =
    new Date().toLocaleDateString();
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

    const table = document.getElementById("myResultsTable");

    if (myResults.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="3">No results available yet.</td>
            </tr>
        `;

        return;
    }

    myResults.forEach(function (result) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.courseCode}</td>
            <td>${result.score}</td>
            <td>${result.grade}</td>
        `;

        table.appendChild(row);

    });

});
function printResult() {

    window.print();

                  }
