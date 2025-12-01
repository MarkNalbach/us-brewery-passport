// main.js

const form = document.getElementById("breweryForm");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusMessage.textContent = "";

  // Honeypot check
  if (form.middleName.value.trim() !== "") {
    statusMessage.textContent = "Bot submission blocked.";
    return;
  }

  // Captcha
  if (parseInt(form.captcha.value, 10) !== 5) {
    statusMessage.textContent = "Incorrect captcha answer.";
    return;
  }

  statusMessage.textContent = "Submitting...";

  const formData = new FormData(form); // includes offerDetails, website, logo, etc.

  // Use your Formspree endpoint here – update if needed
  const response = await fetch("https://formspree.io/f/mkgnolbb", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    statusMessage.textContent = "Thank you! Your application has been submitted.";
    form.reset();
  } else {
    statusMessage.textContent = "Submission failed. Please try again.";
  }
});
