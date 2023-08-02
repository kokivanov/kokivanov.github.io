/*Create a function randomInteger(min, max) that generates a random integer number from min to max including both min and max as possible values.

Any number from the interval min..max must appear with the same probability.

Examples of its work:

alert( randomInteger(1, 5) ); // 1
alert( randomInteger(1, 5) ); // 3
alert( randomInteger(1, 5) ); // 5*/

function randomInteger(min, max) {
    const temp_num = Math.random();
    const digits = max.toString().length;
    const res = min + (temp_num * 10 ** digits) % max;
    return Math.trunc(res);
}

console.log(randomInteger(3, 9));

/*Write a function checkSpam(str) that returns true if str contains ‘viagra’ or ‘XXX’, otherwise false.

The function must be case-insensitive:*/
function checkSpam(str) {
    let spam = ['viagra', 'xxx'];
    for (let term in spam) {
        if (str.toLowerCase().includes(term)) return true;
    }
    return false;
}

console.log(checkSpam('buy ViAgRA now'));

/*We have a cost in the form "$120". That is: the dollar sign goes first, and then the number.

Create a function extractCurrencyValue(str) that would extract the numeric value from such string and return it.

The example:*/
function extractCurrencyValue(str){
    let target = 0;
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            target = i;
            break;
        }
    }

    return parseFloat(str.slice(target));
}
console.log(extractCurrencyValue('abc123drc'));
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
            max_sum = cur_sum > max_sum ? cur_sum : max_sum
        }
    }
    return max_sum
}

console.log(getMaxSubSum([2, -1, 2, 3, -9]))

function Calculator() {
    this.operations = {
        "+" : (a, b) => a + b,
        "-" : (a, b) => a - b,
    }

    this.calculate = function(source) {
        const tokens = source.split(" ")
        return this.operations[tokens[1]]
            (parseInt(tokens[0]), parseInt(tokens[2]))
    }
    
    this.addOperation = function(operation, func) {
        this.operations[operation] = func
    }
}

const cl = new Calculator()
cl.addOperation("*", (a, b) => a * b)
console.log(cl.calculate("1 * 2"))