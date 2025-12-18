// -------------------------------
// SAFE ELEMENT HELPERS
// -------------------------------
const byId = (id) => document.getElementById(id);
const byClass = (cls) => document.querySelector(cls);

// -------------------------------
// FORM HANDLING (Partner Page)
// -------------------------------
const form = byId("breweryForm");
const status = byId("form-status");
const modal = byId("successModal");
const closeModal = byId("closeModal");

function expandToFit(contentEl) {
  // Only adjust if it's currently open
  if (contentEl && contentEl.style.maxHeight && contentEl.style.maxHeight !== "0px") {
    contentEl.style.maxHeight = contentEl.scrollHeight + "px";
  }
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending...";

    // CAPTCHA
    const answer = Number(form.captcha.value);
    if (answer !== 5) {
      status.textContent = "Captcha incorrect. Please try again.";
      return;
    }

    // Honeypot
    if (form.middleName.value) {
      status.textContent = "Bot detected.";
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mdkqzojk", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        status.textContent = "";
        form.reset();
        if (modal) modal.style.display = "flex";
      } else {
        status.textContent = "Submission failed. Please try again.";
      }
    } catch (err) {
      console.error(err);
      status.textContent = "Network error. Please try again.";
    }
  });
}

if (closeModal && modal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// -------------------------------
// ACCORDIONS (ALL PAGES)
// -------------------------------
document.querySelectorAll(".accordion-btn, .how-accordion-btn, .screens-accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");

    const content = btn.nextElementSibling;
    const caret = btn.querySelector(".accordion-caret");

    if (!content) return;

    const isOpen = !!content.style.maxHeight;

    // Toggle height
    content.style.maxHeight = isOpen
      ? null
      : content.scrollHeight + "px";

    // Toggle arrow
    if (caret) {
      caret.textContent = isOpen ? "▸" : "▾";
    }
  });
});

// -------------------------------
// LEGACY ACCORDIONS (Index Page)
// -------------------------------
const howBtn = byClass(".how-accordion-btn");
const howContent = byClass(".how-accordion-content");

if (howBtn && howContent) {
  howBtn.addEventListener("click", () => {
    howBtn.classList.toggle("active");
    howContent.style.maxHeight
      ? (howContent.style.maxHeight = null)
      : (howContent.style.maxHeight = howContent.scrollHeight + "px");
  });
}

const screenBtn = byClass(".screens-accordion-btn");
const screenContent = byClass(".screens-accordion-content");

if (screenBtn && screenContent) {
  screenBtn.addEventListener("click", () => {
    screenBtn.classList.toggle("active");
    screenContent.style.maxHeight
      ? (screenContent.style.maxHeight = null)
      : (screenContent.style.maxHeight = screenContent.scrollHeight + "px");
  });
}
