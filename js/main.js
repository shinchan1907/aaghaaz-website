/* Aaghaaz v2 — tiny vanilla JS. No frameworks. */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* footer year */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- mobile menu ---- */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  function closeMenu(){ links.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded","false"); document.body.style.overflow=""; }
  burger.addEventListener("click", function(){
    var open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

  /* ---- nav state + back-to-top ---- */
  var nav = document.getElementById("nav");
  var toTop = document.getElementById("toTop");
  var ticking = false;
  function onScroll(){
    var y = window.scrollY;
    nav.classList.toggle("scrolled", y > 24);
    toTop.classList.toggle("show", y > 700);
    /* hero parallax */
    if (!reduce && heroArt && y < window.innerHeight) {
      heroArt.style.transform = "translateY(" + (y * 0.08) + "px)";
    }
    ticking = false;
  }
  var heroArt = document.querySelector(".hero-art");
  window.addEventListener("scroll", function(){
    if (!ticking){ window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  toTop.addEventListener("click", function(){ window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  /* ---- scroll reveals (stagger via --d) ---- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  /* ---- scroll-spy ---- */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll(".links a[href^='#']"));
  var sections = spyLinks
    .map(function(a){ return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  var spy = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){
        spyLinks.forEach(function(a){
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(function(s){ spy.observe(s); });

  /* ---- magnetic buttons (subtle, fine pointers only) ---- */
  if (!reduce && finePointer){
    document.querySelectorAll(".magnet").forEach(function(btn){
      btn.addEventListener("pointermove", function(e){
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width;
        var y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = "translate(" + (x * 7).toFixed(1) + "px," + (y * 7).toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function(){ btn.style.transform = ""; });
    });
  }
})();
