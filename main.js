document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("breweryForm");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending…";

    try {
      const formData = new FormData(form);

      // 🔴 IMPORTANT: Replace with YOUR actual Formspree endpoint
      const response = await fetch("https://formspree.io/f/mdkqzojk", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        status.textContent = "Submitted successfully!";
      } else {
        status.textContent = "Submission failed. Please try again.";
      }

    } catch (err) {
      console.error(err);
      status.textContent = "Submission failed. Please try again.";
    }
  });
});
