document.querySelectorAll(".state-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const chevron = btn.querySelector(".chevron");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      chevron.style.transform = "rotate(0deg)";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      chevron.style.transform = "rotate(180deg)";
    }
  });
});
