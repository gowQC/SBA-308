// GIVEN OBJECTS

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

/**
 * WHAT THE FUNCTION NEEDS TO RETURN:
 * 
 * An array of objects that contain the following requirements per key:
 * 
 * 1) The ID of the learner for which this data has been collected 
 *              >> "id": number  ✓
 * 
 * 2) The learner's total, weighted average, in which assignments with
 * more points_possible shoulde be counted for more.
 * ex - a learner with 50/100 on one assignment and 190/200 on another
 * would have a weighted average score of 240/300 = 80% (adding both 
 * numerator AND denominator)         
 *              >> "avg": number  ✓
 * 
 * 3) Each assignment should have a key with its ID, and the value
 * associated with it should be the percentage that the learner scored on
 * the assignment (submission.score / possible_points).
 *              >> <assignment.id>: number  ✓
 * 
 * *** If an assignment is not yet due, it should not be included in either
 * *** the average or the keyed dictionary of scores.  ✓
 * 
 * ADDITIONAL REQUIREMENTS:
 * 
 * If an AssignmentGroup does not belong to its course (mismatching course_id), 
 * your program should throw an error, letting the user know that the input was 
 * invalid. Similar data validation should occur elsewhere within the program.  ✓
 * 
 * You should also account for potential errors in the data that your program receives. 
 * What if points_possible is 0? You cannot divide by zero. What if a value that you 
 * are expecting to be a number is instead a string?  ✓
 * 
 * Use try/catch and other logic to handle these types of errors gracefully.  ✓
 * 
 * If an assignment is not yet due, do not include it in the results or the average. 
 * Additionally, if the learner’s submission is late (submitted_at is past due_at), 
 * deduct 10 percent of the total points possible from their score for that assignment.  ✓
 * 
 * Create a function named getLearnerData() that accepts these values as parameters, 
 * in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns 
 * the formatted result, which should be an array of objects as described above.  ✓
 */

function getLearnerData(course, ag, submissions) {
    try {
        if (ag.course_id === course.id) {
            // for loop to calculate all unique learners (student id's)
            const storeStudentID = []; // fill array with all student ids including duplicates
            for (i=0;i<submissions.length;i++) {
                storeStudentID.push(submissions[i].learner_id);
            }
            const studentIDNoDupes = [...new Set(storeStudentID)]; // removes duplicates from original student id array

            // initialize result based result to be returned on no dupe id array.length
            const result = [];
            for (i=0;i<studentIDNoDupes.length;i++) {
                result[i] = { id: studentIDNoDupes[i] };
            }

            // determine weighted average of each unique student
            let currentDate = new Date(); // MUST be let, cannot be const
            currentDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate())); // today's date in UTC
            for(i=0;i<studentIDNoDupes.length;i++) { // checks through each unique student id
                let numerator = 0;
                let denominator = 0;
                let k = 0;
                while(k<submissions.length) { // checks through each submission
                    let onTime = true; // value to check if assignment is late
                    const dueDate = new Date(ag.assignments[(submissions[k].assignment_id)-1].due_at + "T00:00:00Z"); // gets assignment due date + the extra string enforces UTC
                    // if unique student id matches submission student id AND if due date has not passed 
                    // AND (checks to make sure points possible is greater than 0 AND typeof points_possible is a number)
                    if ( (studentIDNoDupes[i] === submissions[k].learner_id) && (currentDate>dueDate) && 
                    ((ag.assignments[(submissions[k].assignment_id)-1].points_possible > 0) && (typeof ag.assignments[(submissions[k].assignment_id)-1].points_possible === "number"))) {
                        // target object in result, then add key with string literal and assign it to score/possible_points
                        result[i][`${submissions[k].assignment_id}`] = (submissions[k].submission.score)/(ag.assignments[(submissions[k].assignment_id)-1].points_possible);

                        // if late, deduct 10 percent from numerator
                        let subDate = new Date(submissions[k].submission.submitted_at + "T00:00:00Z");
                        if ( subDate > dueDate) {
                            onTime = false;
                        }

                        // log numerator and denominator - considers late assignments
                        if (onTime === true) {
                            numerator += submissions[k].submission.score;
                            denominator += ag.assignments[(submissions[k].assignment_id)-1].points_possible;
                        }
                        else {
                            numerator += submissions[k].submission.score;
                            numerator = numerator - ((ag.assignments[(submissions[k].assignment_id)-1].points_possible)*0.1);
                            if (numerator < 0) { // in case for very low scores
                                numerator = 0;
                            }
                            denominator += ag.assignments[(submissions[k].assignment_id)-1].points_possible;
                        }
                    }
                    k++;
                }
                result[i].avg = numerator/denominator;
                // log the numerator and denominator to appropriate obj
            }
            return result;
        }
        else {
            throw "Error! Assignment Group and Course ID Mismatch."
        }
    }
    catch (err) {
        console.log(err)
    }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

/**
 * MY PERSONAL CHECKLIST FOR REQUIREMENTS:
 * 
 * 1) Declare variables properly using let and const where appropriate. ✓
 * 2) Use operators to perform calculations on variables and literals. ✓
 * 3) Use strings, numbers, and Boolean values cached within variables. ✓
 * 4) Use at least two if/else statements to control program flow. Optionally, use at least one switch statement. ✓
 * 5) Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your program. - add more meaningful try/catch blocks
 * 6) Utilize at least two different types of loops. ✓
 * 7) Utilize at least one loop control keyword such as break or continue. - need one break or continue
 * 8) Create and/or manipulate arrays and objects. ✓
 * 9) Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object. - yes retrieval, should add more manip and removal
 * 10) Use functions to handle repeated tasks. - implement helper functions
 * 11) Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior. ✓
 * 12) Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit). ✓
 * 13) Commit frequently to the git repository. ✓
 * 14) Include a README file that contains a description of your application. ✓
 */