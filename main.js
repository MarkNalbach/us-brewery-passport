const form = document.getElementById("breweryForm");
const status = document.getElementById("form-status") || { textContent: "" };

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "flex";

  const closeBtn = document.getElementById("closeModalBtn");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Sending…";

  // Honeypot trap
  if (form.middleName.value.trim() !== "") {
    status.textContent = "Bot detected. Submission blocked.";
    return;
  }

  // Captcha check
  if (parseInt(form.captcha.value) !== 5) {
    status.textContent = "Captcha incorrect.";
    return;
  }

  // Send to Formspree
  try {
    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/mdkqzojk", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      status.textContent = "";
      showSuccessModal();
    } else {
      status.textContent = "Submission failed. Please try again.";
    }
  } catch (err) {
    console.error(err);
    status.textContent = "Error sending form.";
  }
});

