(function () {
  const header = document.getElementById("site-header");
  const yearEl = document.getElementById("year");
  const menuBtn = document.querySelector(".nav__menu-btn");
  const navLinks = document.querySelector(".nav__links--center");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Mobile menu: Join waitlist as a full-width button (not in the logo row)
  if (navLinks && !navLinks.querySelector(".nav__mobile-cta")) {
    var ctaItem = document.createElement("li");
    ctaItem.className = "nav__mobile-cta";
    ctaItem.innerHTML =
      '<a class="btn btn--primary" href="/waitlist/">Join waitlist</a>';
    navLinks.appendChild(ctaItem);
  }

  function applyScrolled() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  // Back to top
  var backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.className = "back-to-top";
  backBtn.setAttribute("aria-label", "Back to top");
  backBtn.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(backBtn);

  function applyBackToTop() {
    var show = window.scrollY > 320;
    backBtn.classList.toggle("is-visible", show);
  }

  backBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener(
    "scroll",
    function () {
      applyScrolled();
      applyBackToTop();
    },
    { passive: true }
  );
  applyScrolled();
  applyBackToTop();

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  document.querySelectorAll(".nav__links a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
      }
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -40px 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Phase 7a — WebMCP (progressive enhancement; no-op when unsupported)
  var modelContext = document.modelContext || navigator.modelContext;
  if (modelContext && typeof modelContext.registerTool === "function") {
    var SECTIONS = [
      "top",
      "value",
      "how",
      "paths",
      "drive",
      "cities",
      "waitlist-cta",
    ];

    Promise.resolve(
      modelContext.registerTool({
        name: "navigate_section",
        description:
          "Scroll the Kommutr homepage to a named section so the user can read it. Use for how it works, rider/driver paths, cities, or waitlist.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: SECTIONS,
              description: "Homepage section id to bring into view.",
            },
          },
          required: ["section"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute: async function (input) {
          var section = input && input.section;
          var el = section ? document.getElementById(section) : null;
          if (!el) {
            return 'Section "' + section + '" was not found on this page.';
          }
          document.body.classList.remove("nav-open");
          if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open menu");
          }
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          if (history.replaceState) {
            history.replaceState(null, "", "#" + section);
          } else {
            location.hash = section;
          }
          return "Navigated to the " + section + " section.";
        },
      })
    ).catch(function () {
      /* WebMCP unavailable or registration rejected — leave page unchanged */
    });
  }
})();
