document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const navbar = document.querySelector(".navbar");
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        const navbarToggler = document.querySelector(".navbar-toggler");
        if (navbarToggler && navbarToggler.offsetParent !== null) {
          navbarToggler.click();
        }
      }
    });
  });

  // Scroll animations for fade-in elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((el) => {
    fadeInObserver.observe(el);
  });

  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100
    });
  }

  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "#top") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Parallax effect removed to prevent content overlap

  // Animated counter for stats
  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    if (isNaN(target)) return;

    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // Observe stats section for counter animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          if (!counter.classList.contains("counted")) {
            counter.classList.add("counted");
            animateCounter(counter);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px" });

  const statsSection = document.querySelector(".hero-stats");
  if (statsSection) {
    // Check if stats section is already visible on load
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      // Trigger animation immediately if already visible
      const counters = statsSection.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        if (!counter.classList.contains("counted")) {
          counter.classList.add("counted");
          animateCounter(counter);
        }
      });
    } else {
      // Otherwise observe for when it comes into view
      statsObserver.observe(statsSection);
    }
  }
});

