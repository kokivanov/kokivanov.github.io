// Variables

/* Declare two variables: admin and name.
Assign the value "John" to name.
Copy the value from name to admin.
Show the value of admin using console.log (must output “John”). */
let name = "John",
  admin = name;

console.log(name + " " + admin);

/* Create a variable with the name of our planet. How would you name such a variable?
Create a variable to store the name of a current visitor to a website. How would you name that variable? */
const PLANET = "Earth";
const visitorName = "Michael";

/* Here we have a constant birthday for the date, and also the age constant.
Would it be right to use upper case for birthday? For age? Or even for both? */
const BIRTHDAY = "18.04.1982";
const age = BIRTHDAY.replace(".", "-");
console.log(age, BIRTHDAY);

/* Here’s a code that asks the user for two numbers and shows their sum.

It works incorrectly. The output in the example below is 12 (for default prompt values).

Why? Fix it. The result should be 3.

let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

console.log(a + b); // 12 */

// let a = prompt("First number?", 1);
// let b = prompt("Second number?", 2);

let a = 15;
let b = 97;

console.log(+a + +b); // or console.log(Number(a) + Number(b))

// What will be the result for these expressions?
5 > 4; // true
"apple" > "pineapple"; // false (a < p)
"2" > "12"; // true ("2" > "1")
undefined == null; // true
undefined === null; // false
null == "\n0\n"; // false
null === +"\n0\n"; // false

/* Using if..else, write the code which gets a number via prompt and then shows in console.log:

1, if the value is greater than zero,
-1, if less than zero,
0, if equals zero.
In this task we assume that the input is always a number. */
// const input = prompt("Enter number", 0)
const input = 14
if (input < 0) console.log(-1)
else if (input === 0) console.log(0)
else console.log(1)

/*Rewrite if..else using multiple ternary operators '?'.

For readability, it’s recommended to split the code into multiple lines.

let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
} */

let message = '', login = '';

message = 
    login == 'Employee' ? 'Hello' :
    login == 'Director' ? 'Greetings' :
    login == '' ? 'No login' :
    message;

/*Write an if condition to check that age is NOT between 14 and 90 inclusively.

Create two variants: the first one using NOT !, the second one – without it. */

//first 
if (!(age > 13 && age < 91)) console.log("It is")

//second
if (age < 15 && age > 89) console.log("It is")

/* An integer number greater than 1 is called a prime if it cannot be divided without a remainder by anything except 1 and itself.

In other words, n > 1 is a prime if it can’t be evenly divided by anything except 1 and n.

For example, 5 is a prime, because it cannot be divided without a remainder by 2, 3 and 4.

Write the code which outputs prime numbers in the interval from 2 to n.

For n = 10 the result will be 2,3,5,7.

P.S. The code should work for any n, not be hard-tuned for any fixed value. */

let max = 45
outer: for (let i = 0; i <= max; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0) continue outer
    }
    console.log(i)
}

/*Write a loop which prompts for a number greater than 100. If the visitor enters another number – ask them to input again.

The loop must ask for a number until either the visitor enters a number greater than 100 or cancels the input/enters an empty line.

Here we can assume that the visitor only inputs numbers. There’s no need to implement a special handling for a non-numeric input in this task. */
let input2 = 18
do {
    input2++
} while(input2 < 100)

// Simple switch
const source = "+---+++-+=-++"
let val = 0 

outer: for (let i = 0; i < source.length; i++) {
    const c = source[i]
    switch (c) {
        case '+':
            val++
            break;
        case '-':
            val--
            break;
        case '=':
            console.log(val)
            break outer;
        default:
            console.log("Error in source")
            break outer;
    }
};

/* Write a function pow(x,n) that returns x in power n. Or, in other words, multiplies x by itself n times and returns the result.

pow(3, 2) = 3 * 3 = 9
pow(3, 3) = 3 * 3 * 3 = 27
pow(1, 100) = 1 * 1 * ...* 1 = 1
Create a web-page that prompts for x and n, and then shows the result of pow(x,n). */
function pow(base, power) {
    return (base || 0) ** (power || 0)
}

/*Replace Function Expressions with arrow functions in the code below:

function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);*/

function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
}

ask(
    "Do you agree?",
    () => alert("You agreed."),
    () => alert("You canceled the execution.")
);