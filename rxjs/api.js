const baseUrl = `https://api.todoist.com/rest/v2/`;

const projects = rxjs.from(
  fetch(baseUrl.toString() + "projects", {
    method: "GET",
    headers: { Authorization: "Bearer " + api_key },
  }).then((v) => v.json())
);

const subscribe = projects.subscribe({
  next: (v) => {
    console.log(v);
  },
});
