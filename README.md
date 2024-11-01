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