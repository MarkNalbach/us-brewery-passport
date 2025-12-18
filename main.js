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
document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;

    if (!content) return;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
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
