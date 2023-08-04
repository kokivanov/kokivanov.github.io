// Write a function fib(n) that returns the n-th Fibonacci number.
const memo = new Map();
function fib(n) {
  if (memo.has(n)) return memo.get(n);
  if (n <= 1) return n;
  memo.set(n, fib(n - 1) + fib(n - 2));
  return memo.get(n);
}

console.log(fib(77));

/*Write function sum that works like this: sum(a)(b) = a+b.

Yes, exactly this way, using double parentheses (not a mistype).

For instance:

sum(1)(2) = 3
sum(5)(-1) = 4*/

function sum(a) {
  return function sub_sum(b) {
    return a + b;
  };
}

console.log(sum(1)(2));

/*Write function sum that would work like this:

sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15*/
let advancedSum = function adv_sum(a) {
  let current_sum = a;

  function inner_sum(b) {
    current_sum += b;
    return inner_sum;
  }

  inner_sum.toString = function () {
    return current_sum;
  };

  return inner_sum;
};

console.log(advancedSum(1)(2)(3).toString());

/*Write a function printNumbers(from, to) that outputs a number every second, starting from from and ending with to.

Make two variants of the solution.

Using setInterval.
Using nested setTimeout.*/
function printNumbersInterval(from, to) {
  let counter = from;
  const intID = setInterval(function cn() {
    if (counter >= to) {
      clearInterval(intID);
    }

    console.log(counter);
    counter++;
  }, 100);
}

function printNumbersTimeout(from, to) {
  let counter = from;
  setTimeout(function cn() {
    if (counter >= to) {
      return;
    }

    console.log(counter);
    counter++;
    setTimeout(cn, 100);
  }, 100);
}

// printNumbersInterval(0, 10)
// printNumbersTimeout(0, 10)

/* Create a “throttling” decorator throttle(f, ms) – that returns a wrapper.

When it’s called multiple times, it passes the call to f at maximum once per ms milliseconds. */
function throttle(func, timeout) {
  let last_throttle = 0;
  let last_timeout = 0;

  return function f(...args) {
    if (Date.now() - last_throttle < timeout) {
      clearTimeout(last_timeout);
      last_timeout = setTimeout(
        func,
        timeout - (Date.now() - last_throttle),
        ...args
      );
    } else {
      last_throttle = Date.now();
      func(...args);
    }
  };
}

function f(a) {
  console.log(a);
}

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

/*The task is a little more complex variant of Fix a function that loses "this".

The user object was modified. Now instead of two functions loginOk/loginFail, it has a single function user.login(true/false).

What should we pass askPassword in the code below, so that it calls user.login(true) as ok and user.login(false) as fail?*/
const pass = "rockstar";
function askPassword(ok, fail) {
  let password = pass;
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: "John",

  login(result) {
    console.log(this.name + (result ? " logged in" : " failed to log in"));
  },
};

askPassword(user.login.bind(user, true), user.login.bind(user, false)); // ?
