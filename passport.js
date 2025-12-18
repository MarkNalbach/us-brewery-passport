document.addEventListener("DOMContentLoaded", () => {

  // Topic accordions
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      btn.classList.toggle("active");

      content.style.maxHeight
        ? content.style.maxHeight = null
        : content.style.maxHeight = content.scrollHeight + "px";
    });
  });

  // States list
  const container = document.getElementById("states-container");

  Object.keys(BREWERIES_BY_STATE).forEach(state => {
    const stateDiv = document.createElement("div");
    stateDiv.className = "state";

    const btn = document.createElement("button");
    btn.innerHTML = `<span>${state}</span><span class="arrow">▸</span>`;

    const list = document.createElement("div");
    list.className = "brewery-list";

    const breweries = BREWERIES_BY_STATE[state];
    list.innerHTML = breweries.length
      ? breweries.map(b => `<p>${b}</p>`).join("")
      : "<em>Coming soon</em>";

    btn.addEventListener("click", () => {
      stateDiv.classList.toggle("open");
      list.style.display = list.style.display === "block" ? "none" : "block";
    });

    stateDiv.appendChild(btn);
    stateDiv.appendChild(list);
    container.appendChild(stateDiv);
  });
});
