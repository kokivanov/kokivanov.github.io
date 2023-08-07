/* Call async from non-async
We have a “regular” function called f. How can you call the async function wait() and use its result inside of f? */
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"

  wait().catch(err => {throw err}).then(resp => console.log(resp))
}

f()