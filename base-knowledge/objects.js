// Create a function multiplyNumeric(obj) that multiplies all numeric property values of obj by 2
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

multiplyNumeric(menu);

console.log(menu)

function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] == "number") {
            obj[key] *=2
        }
    }
}

/* Create an object calculator with three methods:

read() prompts for two values and saves them as object properties with names a and b respectively.
sum() returns the sum of saved values.
mul() multiplies saved values and returns the result.*/
let calculator = new function() {
    this.val = 12
    this.res = 0

    this.mul = function(operand) {
        this.res = (this.res || this.val) * operand;
        return this;
    };

    this.add = function(operand) {
        this.res = (this.res || this.val) + operand;
        return this
    };

    this.read = function() {
        console.log(this.res)
        return this
    };
}

calculator.add(4).mul(2).read()


