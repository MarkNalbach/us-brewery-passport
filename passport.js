const container = document.getElementById("states-container");

Object.keys(BREWERIES_BY_STATE).forEach(state => {
  const stateDiv = document.createElement("div");
  stateDiv.className = "state";

  const button = document.createElement("button");
  button.textContent = state;

  const list = document.createElement("div");
  list.className = "brewery-list";
  list.style.display = "none";

  if (BREWERIES_BY_STATE[state].length === 0) {
    list.innerHTML = "<em>Coming soon</em>";
  } else {
    BREWERIES_BY_STATE[state].forEach(brewery => {
      const p = document.createElement("p");
      p.textContent = brewery;
      list.appendChild(p);
    });
  }

  button.onclick = () => {
    list.style.display = list.style.display === "none" ? "block" : "none";
  };

  stateDiv.appendChild(button);
  stateDiv.appendChild(list);
  container.appendChild(stateDiv);
});
