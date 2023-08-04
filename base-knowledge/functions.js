// Write a function fib(n) that returns the n-th Fibonacci number.
const memo = new Map();
function fib(n) {
    if (memo.has(n)) return memo.get(n);
    if (n <= 1) return n;
    memo.set(n, fib(n-1) + fib(n-2));
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
    }
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

    inner_sum.toString = function() {
        return current_sum;
    }

    return inner_sum;
}

console.log(advancedSum(1)(2)(3).toString());

