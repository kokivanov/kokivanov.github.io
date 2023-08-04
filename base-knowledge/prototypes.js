/* Add to the prototype of all functions the method defer(ms), that returns a wrapper, delaying the call by ms milliseconds.

Here’s an example of how it should work:

function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // shows 3 after 1 second
Please note that the arguments should be passed to the original function. */

function f(a, b) {
  console.log(a + b);
}

function wrapper(f) {
    f.__proto__.defer = function(timeout) {
        return function(a, b) {
            setTimeout(f, timeout, a, b)
        }
    }
    return f
}

wrapper(f)


f.defer(1000)(1, 2); // shows 3 after 1 second

/*There’s an object dictionary, created as Object.create(null), to store any key/value pairs.

Add method dictionary.toString() into it, that should return a comma-delimited list of keys. Your toString should not show up in for..in over the object.

Here’s how it should work:*/

let dictionary = Object.create(null);

Object.defineProperty(dictionary, "toString", {
    value()  {
        return Object.keys(this).join(',')
    },
})

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// only apple and __proto__ are in the loop
for(let key in dictionary) {
  console.log(key); // "apple", then "__proto__"
}

// your toString in action
console.log(dictionary.toString()); // "apple,__proto__"

