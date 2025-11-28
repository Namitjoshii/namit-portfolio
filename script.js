// SMOOTH SCROLL SETUP
const lenis = new Lenis({
  smooth: true,
  smoothTouch: false,
  lerp: 0.08,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

// CUSTOM CURSOR MOVE
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.2,
    ease: "power2.out",
  });
});

// HERO TEXT ANIMATION
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".nav-logo", { y: -20, opacity: 0, duration: 0.6 })
    .from(".nav-btn", { y: -20, opacity: 0, duration: 0.5 }, "-=0.4")
    .from(".eyebrow", { y: 20, opacity: 0, duration: 0.5 })
    .from(".hero-line", { y: 50, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.2")
    .from(".hero-desc", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
    .from(".hero-actions button", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.3")
    .from(".image-frame", { scale: 0.85, y: 40, opacity: 0, duration: 0.9 }, "-=0.7");
});

// FLOAT IMAGE
gsap.to(".image-frame img", {
  y: -12,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// PROJECT CARDS SCROLL ANIMATION
gsap.utils.toArray(".project-card").forEach((card, i) => {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
  });
});

// SKILLS SCROLL
gsap.utils.toArray(".skill-card").forEach((card, i) => {
  gsap.to(card, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: i * 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
  });
});

// TESTIMONIALS SCROLL
gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
  gsap.to(card, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    delay: i * 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
    },
  });
});

// ABOUT SECTION
gsap.from(".about-content", {
  x: -40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
});

gsap.from(".about-image img", {
  x: 40,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
});

// CURSOR HOVER
const hoverItems = document.querySelectorAll("button, a, .project-card, .skill-card, .testimonial-card");
hoverItems.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// CURSOR IMAGE PREVIEW
const cursorImg = document.querySelector(".cursor-image");
document.addEventListener("mousemove", (e) => {
  gsap.to(cursorImg, {
    x: e.clientX + 25,
    y: e.clientY + 25,
    duration: 0.3,
    ease: "power3.out",
  });
});

// PROJECT IMAGE PREVIEW
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const img = card.getAttribute("data-image");
    cursorImg.style.backgroundImage = `url(${img})`;

    gsap.to(cursorImg, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(cursorImg, {
      opacity: 0,
      scale: 0.6,
      duration: 0.3,
      ease: "power3.out",
    });
  });
});

// 🔥 MAGNETIC HOVER
const magneticElements = document.querySelectorAll(".primary-btn, .ghost-btn, .project-card");
magneticElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  });
});

// 🔥 PARALLAX 3D HOVER
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;

    gsap.to(card, {
      rotationY: x,
      rotationX: y,
      duration: 0.35,
      ease: "power3.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  });
});
