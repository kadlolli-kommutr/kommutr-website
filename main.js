(function () {
  const header = document.getElementById("site-header");
  const yearEl = document.getElementById("year");
  const menuBtn = document.querySelector(".nav__menu-btn");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function applyScrolled() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", applyScrolled, { passive: true });
  applyScrolled();

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll('.nav__links a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
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
          if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
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
