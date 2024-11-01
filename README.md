# SBA-308
This program works with predefined objects within the code and utilizes a function that will parse through the keys of those objects and return
an array of new objects. The new objects contain data derived from the data of the predefined objects. The newly created objects will contain
at least three keys and will display the following:

# 1st Key: ID
The first key in each object will be the ID key. It will pair with a number value that represents the student's ID number.

# 2nd Key: avg
The second key is called 'avg' because it will represent the grade average per student. It will calculate the sum of numbers obtained from all the
scores of a student's assignments. It will also collect the sum of possible_points of the respective assignments the student submitted for. The end
result will have the 'avg' key pair with a number value that represents numerator_sum/denominator_sum.

# 3rd+ Key(s): <assignment_id>
Starting from the third key, all keys will be numbers representing the ID's of specific assignments that the students submitted work for.
Each assignment number key is paired with the specific points earned / possible points to earn, rather than being the sum of all numerators and
denominators. With this key's introduction in mind, it's important to note than not all objects in this array will contain the same number of
keys, since some students may not have submitted for particular assignments.

# Additional Features:
* If an assignment is not yet due, it is not included in either the average or the keyed dictionary of scores.

* If an AssignmentGroup does not belong to its course (mismatching course_id), the program throws an error, letting 
the user know that the input was invalid. Similar data validation occurs elsewhere within the program.

* The program checks for if points_possible is 0 and whether the type is appropriately a number.

* If an assignment is not yet due, it is not included in the results or the average. Additionally, if the learner’s submission 
is late, a deduction of 10 percent of the total points will occur for the score of that assignment.

# My Personal Checklist for Requirements of this Assignment:
* 1) Declare variables properly using let and const where appropriate. ✓
* 2) Use operators to perform calculations on variables and literals. ✓
* 3) Use strings, numbers, and Boolean values cached within variables. ✓
* 4) Use at least two if/else statements to control program flow. Optionally, use at least one switch statement. ✓
* 5) Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your program. ✓
* 6) Utilize at least two different types of loops. ✓
* 7) Utilize at least one loop control keyword such as break or continue. ✓
* 8) Create and/or manipulate arrays and objects. ✓
* 9) Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object. ✓
* 10) Use functions to handle repeated tasks. ✓
* 11) Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior. ✓
* 12) Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit). ✓
* 13) Commit frequently to the git repository. ✓
* 14) Include a README file that contains a description of your application. ✓