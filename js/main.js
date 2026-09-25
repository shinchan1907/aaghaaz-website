/* Aaghaaz v2 — GSAP-enhanced with graceful CSS fallback. No frameworks required. */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var isMobile = window.matchMedia("(max-width: 900px)").matches;

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

  /* ---- nav state: glass on scroll + hide on scroll down / show on up ---- */
  var nav = document.getElementById("nav");
  var toTop = document.getElementById("toTop");
  var lastY = window.scrollY, ticking = false;
  function onScroll(){
    var y = window.scrollY;
    nav.classList.toggle("scrolled", y > 24);
    toTop.classList.toggle("show", y > 700);
    if (!reduce){
      if (y > 320 && y > lastY + 4 && !links.classList.contains("open")) nav.classList.add("hidden");
      else if (y < lastY - 4 || y <= 320) nav.classList.remove("hidden");
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function(){
    if (!ticking){ window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  toTop.addEventListener("click", function(){ window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

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
      window.location.href = "mailto:aaghaazbegin@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  var hasGsap = !reduce && window.gsap && window.ScrollTrigger;

  /* ============ FALLBACK: plain CSS reveals (no GSAP / reduced motion) ============ */
  if (!hasGsap){
    if (!reduce){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
    }
    return;
  }

  /* ============ GSAP WORLD ============ */
  document.documentElement.classList.add("gsap-on");
  gsap.registerPlugin(ScrollTrigger);

  /* split an element's text into masked word spans (keeps inner markup like .hl) */
  function splitWords(el){
    Array.prototype.slice.call(el.childNodes).forEach(function(node){
      if (node.nodeType === 3){
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function(part){
          if (!part) return;
          if (/^\s+$/.test(part)){ frag.appendChild(document.createTextNode(" ")); }
          else {
            var w = document.createElement("span"); w.className = "ww";
            var wi = document.createElement("span"); wi.className = "wi"; wi.textContent = part;
            w.appendChild(wi); frag.appendChild(w);
          }
        });
        el.replaceChild(frag, node);
      } else if (node.nodeType === 1){ splitWords(node); }
    });
  }

  /* ---- cinematic hero entrance (home) ---- */
  var heroTitle = document.getElementById("heroTitle");
  if (heroTitle){
    splitWords(heroTitle);
    gsap.set("#heroTitle", { opacity: 1, y: 0 }); /* h1 stays visible; its words animate */
    gsap.set(".hero .wi", { yPercent: 115 });
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".nav", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: .7 })
      .fromTo(".hero .sticker-1", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .55 }, "-=.45")
      .to(".hero .wi", { yPercent: 0, duration: .95, stagger: .07 }, "-=.35")
      .fromTo(".hero .lede", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .7 }, "-=.55")
      .fromTo(".hero-cta .btn", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .1 }, "-=.5")
      .fromTo(".scroll-hint", { opacity: 0 }, { opacity: 1, duration: .6 }, "-=.3");
    /* ken-burns: slow scale + drift as you scroll away */
    gsap.to(".hero-bg img", { scale: 1.14, yPercent: 10, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-inner", { yPercent: -10, opacity: 0, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true } });
  }

  /* ---- inner page heroes animate on load ---- */
  var pageHeroReveals = document.querySelectorAll(".page-hero .reveal");
  if (pageHeroReveals.length){
    gsap.to(pageHeroReveals, { opacity: 1, y: 0, duration: .9, ease: "power3.out", stagger: .1, delay: .15 });
  }

  /* ---- editorial line-by-line reveal (about) ---- */
  var whyLines = document.querySelectorAll(".why-lines .wline");
  if (whyLines.length){
    gsap.from(whyLines, { yPercent: 115, duration: 1, ease: "power3.out", stagger: .12,
      scrollTrigger: { trigger: ".why-lines", start: "top 82%" } });
  }

  /* ---- clip-path image reveals ---- */
  gsap.utils.toArray("[data-clip]").forEach(function(el){
    gsap.fromTo(el,
      { clipPath: "inset(16% 9% 16% 9% round 2rem)", scale: 1.05 },
      { clipPath: "inset(0% 0% 0% 0% round 2rem)", scale: 1, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" } });
  });

  /* ---- gentle parallax (desktop only; hero has its own) ---- */
  if (!isMobile){
    gsap.utils.toArray("[data-parallax]").forEach(function(el){
      var amt = parseFloat(el.getAttribute("data-parallax")) || 9;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none",
        scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* ---- quote: words ignite on scroll (home) ---- */
  var quoteText = document.getElementById("quoteText");
  if (quoteText){
    var words = quoteText.textContent.trim().split(/\s+/);
    quoteText.innerHTML = words.map(function(w){ return '<span class="qw">' + w + "</span>"; }).join(" ");
    gsap.fromTo("#quoteText .qw", { opacity: .13, y: 12 }, { opacity: 1, y: 0, ease: "none", stagger: .05,
      scrollTrigger: { trigger: ".voices", start: "top 70%", end: "center 45%", scrub: 1 } });
  }

  /* ---- batched scroll reveals (everything not hero-animated) ---- */
  ScrollTrigger.batch(".reveal:not(.hero .reveal):not(.page-hero .reveal)", {
    start: "top 88%",
    onEnter: function(els){
      gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: "power3.out", stagger: .08, overwrite: true });
    }
  });

  ScrollTrigger.refresh();
})();
