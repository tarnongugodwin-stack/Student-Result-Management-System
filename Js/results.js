document.addEventListener("DOMContentLoaded", function () {

    const results = JSON.parse(localStorage.getItem("results")) || [];

    const table = document.getElementById("resultsTable");

    if (results.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">No results uploaded yet.</td>
            </tr>
        `;
        return;
    }

    results.forEach(function (result) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.studentName}</td>
            <td>${result.matricNumber}</td>
            <td>${result.courseCode}</td>
            <td>${result.score}</td>
            <td>${result.grade}</td>
        `;

        table.appendChild(row);

    });

});
