const form = document.getElementById("breweryForm");
const status = document.getElementById("form-status");
const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

// Accordion toggle
// const accordionBtn = document.querySelector(".accordion-btn");
// const accordionContent = document.querySelector(".accordion-content");

// accordionBtn.addEventListener("click", () => {
//   accordionBtn.classList.toggle("active");

//   if (accordionContent.style.maxHeight) {
//     accordionContent.style.maxHeight = null;
//     accordionBtn.textContent = "How It Works ▸";
//   } else {
//     accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
//     accordionBtn.textContent = "How It Works ▾";
//   }
// });
// --- HOW IT WORKS accordion ---
const howBtn = document.querySelector(".how-accordion-btn");
const howContent = document.querySelector(".how-accordion-content");

howBtn.addEventListener("click", () => {
  const open = howContent.style.maxHeight;

  // close any currently open
  howContent.style.maxHeight = open ? null : howContent.scrollHeight + "px";
  howBtn.classList.toggle("active");
});


// --- SCREENSHOTS accordion ---
const screenBtn = document.querySelector(".screens-accordion-btn");
const screenContent = document.querySelector(".screens-accordion-content");

screenBtn.addEventListener("click", () => {
  const open = screenContent.style.maxHeight;

  screenContent.style.maxHeight = open ? null : screenContent.scrollHeight + "px";
  screenBtn.classList.toggle("active");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Sending...";

  // CAPTCHA check
  const answer = Number(form.captcha.value);
  if (answer !== 5) {
    status.textContent = "Captcha incorrect. Please try again.";
    return;
  }

  // Honeypot bot trap
  if (form.middleName.value) {
    status.textContent = "Bot detected.";
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/mdkqzojk", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData
    });

    if (response.ok) {
      status.textContent = "";
      form.reset();
      modal.style.display = "flex";
    } else {
      status.textContent = "Submission failed. Please try again.";
      console.error(await response.text());
    }
  } catch (err) {
    console.error(err);
    status.textContent = "Network error. Please try again.";
  }
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
