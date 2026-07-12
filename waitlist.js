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

  function showSuccess() {
    form.hidden = true;
    if (success) success.hidden = false;
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

    // Honeypot filled → fake success, do not contact providers
    if (honeypot) {
      showSuccess();
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
        company_url: "",
      }),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, status: res.status, data: data || {} };
        });
      })
      .then(function (result) {
        if (!result.ok || !result.data.accessKey) {
          var msg =
            (result.data && result.data.error) ||
            "Something went wrong. Please try again or email support@kommutr.com.";
          showError(msg);
          return null;
        }
        // Submit from the browser so Web3Forms domain checks see www.kommutr.com
        return fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: result.data.accessKey,
            subject: "Kommutr waitlist signup",
            from_name: "Kommutr website",
            name: result.data.name || "Waitlist guest",
            email: result.data.email,
            message:
              "Kommutr waitlist signup.\nInterest: " +
              (result.data.interest || interest) +
              "\nName: " +
              (name || "(not provided)"),
            interest: result.data.interest || interest,
          }),
        }).then(function (upstream) {
          return upstream.json().then(function (data) {
            return { ok: upstream.ok && data.success !== false, data: data || {} };
          });
        });
      })
      .then(function (upstream) {
        if (!upstream) return;
        if (upstream.ok) {
          showSuccess();
          return;
        }
        showError(
          "Could not save your signup. Please try again or email support@kommutr.com."
        );
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
