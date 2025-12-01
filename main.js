const form = document.getElementById("breweryForm");
const status = document.getElementById("form-status");
const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

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
