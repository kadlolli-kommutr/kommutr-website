(function () {
  var form = document.getElementById("waitlist-form");
  var success = document.getElementById("waitlist-success");
  var errorEl = document.getElementById("waitlist-error");
  if (!form) return;

  function showError(message) {
    if (!errorEl) return;
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  function clearError() {
    if (!errorEl) return;
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearError();

    var emailInput = form.elements.namedItem("email");
    var nameInput = form.elements.namedItem("name");
    var interestInput = form.elements.namedItem("interest");
    var hpInput = form.elements.namedItem("company_url");

    var email = emailInput && "value" in emailInput ? String(emailInput.value).trim() : "";
    var name = nameInput && "value" in nameInput ? String(nameInput.value).trim() : "";
    var interest =
      interestInput && "value" in interestInput ? String(interestInput.value).trim() : "both";
    var honeypot = hpInput && "value" in hpInput ? String(hpInput.value).trim() : "";

    if (!email || email.indexOf("@") < 1) {
      showError("Please enter a valid email address.");
      if (emailInput && emailInput.focus) emailInput.focus();
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Joining…";
    }

    fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: email,
        name: name,
        interest: interest,
        company_url: honeypot,
      }),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, status: res.status, data: data || {} };
        });
      })
      .then(function (result) {
        if (result.ok) {
          form.hidden = true;
          if (success) success.hidden = false;
          return;
        }
        var msg =
          (result.data && result.data.error) ||
          "Something went wrong. Please try again or email support@kommutr.com.";
        showError(msg);
      })
      .catch(function () {
        showError("Network error. Please try again or email support@kommutr.com.");
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Join waitlist";
        }
      });
  });
})();
