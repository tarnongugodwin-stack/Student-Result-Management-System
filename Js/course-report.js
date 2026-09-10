function searchCourseReport() {

    const courseCode = document
        .getElementById("searchCourse")
        .value
        .trim();

    const courseReportResult =
        document.getElementById("courseReportResult");

    const results =
        JSON.parse(localStorage.getItem("results")) || [];

    const courseResults = results.filter(function (result) {

        return result.courseCode.toLowerCase() ===
               courseCode.toLowerCase();

    });

    if (courseResults.length === 0) {

        courseReportResult.innerHTML = `
            <h3>No Results Found</h3>
            <p>Please check the Course Code and try again.</p>
        `;

        return;

    }

    let table = `
        <h2>Course Performance Report</h2>

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

    courseResults.forEach(function (result) {

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

    courseReportResult.innerHTML = table;

}
