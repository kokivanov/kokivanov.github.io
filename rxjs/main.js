const { Observable, of, map, filter, take } = require("rxjs");

const observable = new Observable((sub) => {
  sub.next("First");
  sub.next("Second");
  sub.next("Thisrd");
});

const observer = {
  next: (v) => {
    console.log(v);
  },
  error: (err) => {
    console.error(err);
  },
  complete: () => {
    console.log("DONE");
  },
};

observable.subscribe(observer);

const users = [
  { name: "John", id: 12 },
  { name: "Michele", id: 23 },
  { name: "Rhaast", id: 42 },
  { name: "Jeremy", id: 11 },
];

const usersObservable = of(...users);
usersObservable
  .pipe(
    take(2),
    filter((v) => v.id < 40),
    map((v) => v.name)
  )
  .subscribe(observer);
