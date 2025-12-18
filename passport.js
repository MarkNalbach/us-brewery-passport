const list = document.getElementById("breweryList");

Object.entries(window.BREWERIES_BY_STATE).forEach(([state, breweries]) => {
  const row = document.createElement("div");
  row.className = "state-row";

  const toggle = document.createElement("button");
  toggle.className = "state-toggle";
  toggle.innerHTML = `
    <span>${state}</span>
    <span>${breweries.length ? breweries.length : "Coming soon"}</span>
  `;

  const content = document.createElement("div");
  content.className = "state-content";

  if (breweries.length) {
    const ul = document.createElement("ul");
    breweries.forEach(b => {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    });
    content.appendChild(ul);
  } else {
    const p = document.createElement("p");
    p.className = "coming-soon";
    p.textContent = "Breweries coming soon.";
    content.appendChild(p);
  }

  toggle.addEventListener("click", () => {
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });

  row.appendChild(toggle);
  row.appendChild(content);
  list.appendChild(row);
});
