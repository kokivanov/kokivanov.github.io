window.addEventListener("load", () => {
  const logArea = document.getElementById("log");
  function log(src) {
    const p = document.createElement("p");
    p.innerText = src;
    logArea.appendChild(p);
  }

  const click = rxjs.fromEvent(document.getElementById("area"), "click");
  click.subscribe({
    next: (v) => {
      log(`Clicked at ${v.x} ${v.y}`);
    },
  });
});
