/*Create a function randomInteger(min, max) that generates a random integer number from min to max including both min and max as possible values.

Any number from the interval min..max must appear with the same probability.

Examples of its work:

alert( randomInteger(1, 5) ); // 1
alert( randomInteger(1, 5) ); // 3
alert( randomInteger(1, 5) ); // 5*/

function randomInteger(min, max) {
  const temp_num = Math.random();
  const digits = max.toString().length;
  const res = min + ((temp_num * 10 ** digits) % max);
  return Math.trunc(res);
}

console.log(randomInteger(3, 9));

/*Write a function checkSpam(str) that returns true if str contains ‘viagra’ or ‘XXX’, otherwise false.

The function must be case-insensitive:*/
function checkSpam(str) {
  let spam = ["viagra", "xxx"];
  for (let term in spam) {
    if (str.toLowerCase().includes(term)) return true;
  }
  return false;
}

console.log(checkSpam("buy ViAgRA now"));

/*We have a cost in the form "$120". That is: the dollar sign goes first, and then the number.

Create a function extractCurrencyValue(str) that would extract the numeric value from such string and return it.

The example:*/
function extractCurrencyValue(str) {
  let target = 0;
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      target = i;
      break;
    }
  }

  return parseFloat(str.slice(target));
}
console.log(extractCurrencyValue("abc123drc"));
/*The input is an array of numbers, e.g. arr = [1, -2, 3, 4, -9, 6].

The task is: find the contiguous subarray of arr with the maximal sum of items.

Write the function getMaxSubSum(arr) that will return that sum.

For instance:

getMaxSubSum([-1, 2, 3, -9]) == 5 (the sum of highlighted items)
getMaxSubSum([2, -1, 2, 3, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, 11]) == 11
getMaxSubSum([-2, -1, 1, 2]) == 3
getMaxSubSum([100, -9, 2, -3, 5]) == 100
getMaxSubSum([1, 2, 3]) == 6 (take all)*/

function getMaxSubSum(arr) {
  let max_sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let cur_sum = arr[i];
    for (let j = i; j < arr.length; j++) {
      if (i !== j) {
        cur_sum += arr[j];
      }
      max_sum = cur_sum > max_sum ? cur_sum : max_sum;
    }
  }
  return max_sum;
}

console.log(getMaxSubSum([2, -1, 2, 3, -9]));

//Create a constructor function Calculator that creates “extendable” calculator objects.
function Calculator() {
  this.operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  this.calculate = function (source) {
    const tokens = source.split(" ");
    return this.operations[tokens[1]](parseInt(tokens[0]), parseInt(tokens[2]));
  };

  this.addOperation = function (operation, func) {
    this.operations[operation] = func;
  };
}

const cl = new Calculator();
cl.addOperation("*", (a, b) => a * b);
console.log(cl.calculate("1 * 2"));

/* Anagrams are words that have the same number of same letters, but in different order.

For instance:

nap - pan
ear - are - era
cheaters - hectares - teachers
Write a function aclean(arr) that returns an array cleaned from anagrams.

For instance:

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
From every anagram group should remain only one word, no matter which one. */
function aclean(arr) {
  const res = new Map();

  for (let elem of arr) {
    const sortedElem = Array.from(elem.toLowerCase()).sort().join("");
    res.set(sortedElem, elem);
  }

  return res.values();
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
console.log(aclean(arr));

/*There’s an array of messages:

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
Your code can access it, but the messages are managed by someone else’s code. New messages are added, old ones are removed regularly by that code, and you don’t know the exact moments when it happens.

Now, which data structure could you use to store information about whether the message “has been read”? The structure must be well-suited to give the answer “was it read?” for the given message object.

P.S. When a message is removed from messages, it should disappear from your structure as well.

P.P.S. We shouldn’t modify message objects, add our properties to them. As they are managed by someone else’s code, that may lead to bad consequences.*/
let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];

const unreadMessages = new WeakSet();
unreadMessages.add(messages[0]);
console.log(
  "Message 0 was " + (unreadMessages.has(messages[0]) ? "not read" : "read")
);

/* There is a salaries object with arbitrary number of salaries.

Write the function sumSalaries(salaries) that returns the sum of all salaries using Object.values and the for..of loop.

If salaries is empty, then the result must be 0.

For instance:

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650 */

function sumSalaries(salaries) {
  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum;
}

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

console.log(sumSalaries(salaries));

/*Write a function getLastDayOfMonth(year, month) that returns the last day of month. Sometimes it is 30th, 31st or even 28/29th for Feb.

Parameters:

year – four-digits year, for instance 2012.
month – month, from 0 to 11.
For instance, getLastDayOfMonth(2012, 1) = 29 (leap year, Feb).*/

function getLastDayOfMonth(year, month) {
  let date = new Date();
  date.setFullYear(year, month + 1);
  date.setDate(0);
  return date.getDate();
}

console.log(getLastDayOfMonth(2012, 1));

/*In simple cases of circular references, we can exclude an offending property from serialization by its name.

But sometimes we can’t just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.

Write replacer function to stringify everything, but remove properties that reference meetup:

let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
  // Your code
}));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  occupiedBy: [{ name: "John" }, { name: "Alice" }],
  place: room,
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    if (key === "place") {
        delete value.occupiedBy
        return value
    }
    if (key !== "self") return value
  })
);
