/* Aaghaaz v2 — static build. No animations, no motion libraries.
   Functional UI only: footer year, mobile menu, nav scrolled state,
   back-to-top button, and the contact mailto form. */
(function(){
  "use strict";

  /* footer year */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- mobile menu (instant open/close) ---- */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  function closeMenu(){
    links.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  burger.addEventListener("click", function(){
    var open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

  /* ---- nav scrolled state + back-to-top visibility (instant, no transitions) ---- */
  var nav = document.getElementById("nav");
  var toTop = document.getElementById("toTop");
  function onScroll(){
    var y = window.scrollY;
    nav.classList.toggle("scrolled", y > 24);
    toTop.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", function(){ window.scrollTo(0, 0); });

  /* ---- mailto message form (contact page, no backend) ---- */
  var msgForm = document.getElementById("msgForm");
  if (msgForm){
    msgForm.addEventListener("submit", function(e){
      e.preventDefault();
      var name = document.getElementById("fName").value.trim();
      var email = document.getElementById("fEmail").value.trim();
      var message = document.getElementById("fMsg").value.trim();
      var err = document.getElementById("formError");
      var ok = name.length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message.length > 3;
      err.hidden = ok;
      if (!ok) return;
      var subject = encodeURIComponent("Website enquiry from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:contact@aaghaaz.org.in?subject=" + subject + "&body=" + body;
    });
  }
})();
