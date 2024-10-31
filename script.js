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
 *              >> "id": number
 * 
 * 2) The learner's total, weighted average, in which assignments with
 * more points_possible shoulde be counted for more.
 * ex - a learner with 50/100 on one assignment and 190/200 on another
 * would have a weighted average score of 240/300 = 80% (adding both 
 * numerator AND denominator)         
 *              >> "avg": number
 * 
 * 3) Each assignment should have a key with its ID, and the value
 * associated with it should be the percentage that the learner scored on
 * the assignment (submission.score / possible_points).
 *              >> <assignment.id>: number
 * 
 * *** If an assignment is not yet due, it should not be included in either
 * *** the average or the keyed dictionary of scores.
 */

function getLearnerData(course, ag, submissions) {
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
    for(i=0;i<studentIDNoDupes.length;i++) { // checks through each unique student id
        let numerator = 0;
        let denominator = 0;
        for(k=0;k<submissions.length;k++) { // checks through each submission
            if (studentIDNoDupes[i] === submissions[k].learner_id) { // if unique student id matches submission student id AND if due date has not passed
                // target object in result, then add key with string literal and assign it to score/possible_points
                result[i][`${submissions[k].assignment_id}`] = (submissions[k].submission.score)/(ag.assignments[(submissions[k].assignment_id)-1].points_possible);

                // log numerator and denominator
                numerator += submissions[k].submission.score;
                denominator += ag.assignments[(submissions[k].assignment_id)-1].points_possible;
            }
        }
        result[i].avg = numerator/denominator;
        // log the numerator and denominator to appropriate obj
    }
    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// ===================Example of What Output Should be===================

// function getLearnerData(course, ag, submissions) {
//     // representation of what output SHOULD look like
//     const example_result = [
//         {
//             id: 125,
//             avg: 0.985, // (47 + 150) / (50 + 150)
//             1: 0.94, // 47 / 50
//             2: 1.0 // 150 / 150
//         },
//         {
//             id: 132,
//             avg: 0.82, // (39 + 125) / (50 + 150)
//             1: 0.78, // 39 / 50
//             2: 0.833 // late: (140 - 15) / 150
//         }
//     ];

//     return example_result;
// }

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);