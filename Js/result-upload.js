document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("resultForm");

    const studentSelect =
        document.getElementById("studentSelect");

    const matricNumber =
        document.getElementById("matricNumber");

    const studentName =
        document.getElementById("studentName");

    const courseSelect =
        document.getElementById("courseSelect");

    const courseCode =
        document.getElementById("courseCode");


    // =====================================
    // LOAD STUDENTS
    // =====================================

    const students =
        JSON.parse(
            localStorage.getItem("students")
        ) || [];


    students.forEach(function (student, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            student.fullname +
            " - " +
            student.matric;

        studentSelect.appendChild(option);

    });


    // =====================================
    // LOAD COURSES
    // =====================================

    const courses =
        JSON.parse(
            localStorage.getItem("courses")
        ) || [];


    courses.forEach(function (course, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            course.code +
            " - " +
            course.title;

        courseSelect.appendChild(option);

    });


    // =====================================
    // SELECT STUDENT
    // =====================================

    studentSelect.addEventListener(
        "change",
        function () {

            const selectedIndex =
                studentSelect.value;


            if (selectedIndex === "") {

                studentName.value = "";
                matricNumber.value = "";

                return;

            }


            const student =
                students[selectedIndex];


            studentName.value =
                student.fullname || "";


            matricNumber.value =
                student.matric || "";

        }
    );


    // =====================================
    // SELECT COURSE
    // =====================================

    courseSelect.addEventListener(
        "change",
        function () {

            const selectedIndex =
                courseSelect.value;


            if (selectedIndex === "") {

                courseCode.value = "";

                return;

            }


            const course =
                courses[selectedIndex];


            courseCode.value =
                course.code || "";

        }
    );


    // =====================================
    // UPLOAD RESULT
    // =====================================

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const score =
                Number(
                    document.getElementById("score").value
                );


            // Validate score

            if (
                isNaN(score) ||
                score < 0 ||
                score > 100
            ) {

                alert(
                    "Please enter a score between 0 and 100."
                );

                return;

            }


            // Calculate grade

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


            // Create result

            const result = {

                studentName:
                    studentName.value,

                matricNumber:
                    matricNumber.value,

                courseCode:
                    courseCode.value,

                score:
                    score,

                grade:
                    grade

            };


            // Get existing results

            let results =
                JSON.parse(
                    localStorage.getItem("results")
                ) || [];


            // Save result

            results.push(result);


            localStorage.setItem(
                "results",
                JSON.stringify(results)
            );


            alert(
                "Result uploaded successfully! Grade: " +
                grade
            );


            form.reset();

            studentName.value = "";
            matricNumber.value = "";
            courseCode.value = "";

        }
    );

});
