function searchResult() {

    const matricNumber = document
        .getElementById("searchMatric")
        .value
        .trim();

    const reportResult = document.getElementById("reportResult");

    const results = JSON.parse(
        localStorage.getItem("results")
    ) || [];

    const studentResults = results.filter(function (result) {
        return result.matricNumber.toLowerCase() ===
               matricNumber.toLowerCase();
    });

    if (studentResults.length === 0) {

        reportResult.innerHTML = `
            <h3>No Result Found</h3>
            <p>Please check the Matric Number and try again.</p>
        `;

        return;
    }

    let table = `
        <h2>Student Result</h2>

        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Matric Number</th>
                    <th>Course</th>
                    <th>Score</th>
                    <th>Grade</th>
                </tr>
            </thead>

            <tbody>
    `;

    studentResults.forEach(function (result) {

        table += `
            <tr>
                <td>${result.studentName}</td>
                <td>${result.matricNumber}</td>
                <td>${result.courseCode}</td>
                <td>${result.score}</td>
                <td>${result.grade}</td>
            </tr>
        `;

    });

    table += `
            </tbody>
        </table>
    `;

    reportResult.innerHTML = table;

}
