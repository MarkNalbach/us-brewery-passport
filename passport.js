document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("states-container");

  if (!container) {
    console.error("states-container not found");
    return;
  }

  container.innerHTML = ""; // remove loading text

  Object.keys(BREWERIES_BY_STATE).forEach(state => {
    const stateDiv = document.createElement("div");
    stateDiv.className = "state";

    const button = document.createElement("button");
    button.textContent = state;

    const list = document.createElement("div");
    list.className = "brewery-list";
    list.style.display = "none";

    const breweries = BREWERIES_BY_STATE[state];

    if (breweries.length === 0) {
      list.innerHTML = "<em>Coming soon</em>";
    } else {
      breweries.forEach(name => {
        const p = document.createElement("p");
        p.textContent = name;
        list.appendChild(p);
      });
    }

    button.addEventListener("click", () => {
      list.style.display = list.style.display === "none" ? "block" : "none";
    });

    stateDiv.appendChild(button);
    stateDiv.appendChild(list);
    container.appendChild(stateDiv);
  });
});
