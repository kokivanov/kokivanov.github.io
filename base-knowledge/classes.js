/* We’ve got a Clock class. As of now, it prints the time every second. 
Create a new class ExtendedClock that inherits from Clock and adds the parameter precision – the number of ms between “ticks”. Should be 1000 (1 second) by default.

Your code should be in the file extended-clock.js
Don’t modify the original clock.js. Extend it.*/

class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;

    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

class ExtendedClock extends Clock {
    constructor({template, precision = 1000}) {
        super({template})
        this.precision = precision
    }

    start() {
        this.render()
        this.timer = setInterval(() => this.render(), this.precision)
    }
}

const cl = new ExtendedClock({template: "h:m:s", precision: 100})
// cl.start()

