/* Aaghaaz – A Beginning · interactions */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  /* ---- Sticky nav state ---- */
  function onScrollNav() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---- Mobile menu ---- */
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    nav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navLinks.classList.remove("open");
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---- Scroll-reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Parallax (hero + boutique band) ---- */
  var heroBg = document.getElementById("heroBg");
  var bandBg = document.querySelector(".band-bg");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && (heroBg || bandBg)) {
    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var y = window.scrollY;
            if (heroBg) heroBg.style.transform = "translateY(" + y * 0.32 + "px)";
            if (bandBg) {
              var rect = bandBg.parentElement.getBoundingClientRect();
              var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
              bandBg.style.transform = "translateY(" + (progress * 120 - 60) + "px)";
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---- Active nav link ---- */
  var sections = document.querySelectorAll("main section[id]");
  var links = navLinks.querySelectorAll("a");
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            links.forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
