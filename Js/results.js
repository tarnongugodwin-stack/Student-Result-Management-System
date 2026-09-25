document.addEventListener("DOMContentLoaded", function () {

    const table =
        document.getElementById("resultsTable");

    const searchInput =
        document.getElementById("resultSearch");


    function displayResults(resultList) {

        table.innerHTML = "";


        if (resultList.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        No matching results found.
                    </td>
                </tr>
            `;

            return;
        }


        resultList.forEach(function (result) {

            const row =
                document.createElement("tr");


            /*
             * Keep the original result index.
             * This allows Edit and Delete to
             * continue working after searching.
             */

            row.innerHTML = `
                <td>${result.studentName || ""}</td>

                <td>${result.matricNumber || ""}</td>

                <td>${result.courseCode || ""}</td>

                <td>${result.score || ""}</td>

                <td>${result.grade || ""}</td>

                <td>

                    <button
                        onclick="editResult(${result.originalIndex})">
                        ✏️ Edit
                    </button>

                    <button
                        onclick="deleteResult(${result.originalIndex})">
                        🗑️ Delete
                    </button>

                </td>
            `;


            table.appendChild(row);

        });

    }


    // Get results
    let results =
        JSON.parse(
            localStorage.getItem("results")
        ) || [];


    // Add original index to each result
    results = results.map(function (result, index) {

        return {
            ...result,
            originalIndex: index
        };

    });


    // Display all results
    displayResults(results);


    // Search results
    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchText =
                    searchInput.value
                    .trim()
                    .toLowerCase();


                const filteredResults =
                    results.filter(function (result) {

                        const studentName =
                            String(
                                result.studentName || ""
                            ).toLowerCase();


                        const matricNumber =
                            String(
                                result.matricNumber || ""
                            ).toLowerCase();


                        const courseCode =
                            String(
                                result.courseCode || ""
                            ).toLowerCase();


                        return (
                            studentName.includes(searchText) ||
                            matricNumber.includes(searchText) ||
                            courseCode.includes(searchText)
                        );

                    });


                displayResults(filteredResults);

            }
        );

    }

});


// ===============================
// DELETE RESULT
// ===============================

function deleteResult(index) {

    const results =
        JSON.parse(
            localStorage.getItem("results")
        ) || [];


    const result = results[index];


    const confirmDelete =
        confirm(
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


    alert(
        "Result deleted successfully!"
    );


    location.reload();

}


// ===============================
// EDIT RESULT
// ===============================

function editResult(index) {

    const results =
        JSON.parse(
            localStorage.getItem("results")
        ) || [];


    const result = results[index];


    const studentName =
        prompt(
            "Enter Student Name:",
            result.studentName
        );


    if (studentName === null) return;


    const matricNumber =
        prompt(
            "Enter Matric Number:",
            result.matricNumber
        );


    if (matricNumber === null) return;


    const courseCode =
        prompt(
            "Enter Course Code:",
            result.courseCode
        );


    if (courseCode === null) return;


    const score =
        prompt(
            "Enter Score:",
            result.score
        );


    if (score === null) return;


    // Automatically calculate grade

    let grade = "";

    const numericScore =
        Number(score);


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

        studentName:
            studentName.trim(),

        matricNumber:
            matricNumber.trim(),

        courseCode:
            courseCode.trim(),

        score:
            numericScore,

        grade:
            grade

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
