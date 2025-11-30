// Smooth Scroll Setup
const lenis = new Lenis({
  smooth: true,
  lerp: 0.08,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
lenis.on("scroll", ScrollTrigger.update);


// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorImg = document.querySelector(".cursor-image");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2 });
  gsap.to(cursorImg, { x: e.clientX + 25, y: e.clientY + 25, duration: 0.3 });
});


// Hero Animation
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".nav-logo", { y: -20, opacity: 0 })
    .from(".nav-btn", { y: -20, opacity: 0 }, "-=0.4")
    .from(".eyebrow", { y: 20, opacity: 0 })
    .from(".hero-line", { y: 50, opacity: 0, stagger: 0.12 })
    .from(".hero-desc", { y: 20, opacity: 0 }, "-=0.2")
    .from(".hero-actions button", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.3")
    .from(".image-frame", { scale: 0.85, y: 40, opacity: 0 }, "-=0.7");
});

gsap.to(".image-frame img", {
  y: -12,
  duration: 3,
  repeat: -1,
  yoyo: true,
});


// Scroll Animations
gsap.utils.toArray(".project-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    delay: i * 0.15,
    scrollTrigger: { trigger: card, start: "top 90%", once: true }
  });
});

gsap.utils.toArray(".skill-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    delay: i * 0.15,
    scrollTrigger: { trigger: card, start: "top 85%" }
  });
});

gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    delay: i * 0.15,
    scrollTrigger: { trigger: card, start: "top 85%" }
  });
});


// About Reveal
gsap.from(".about-content", {
  x: -40,
  opacity: 0,
  scrollTrigger: { trigger: ".about", start: "top 80%" }
});

gsap.from(".about-image img", {
  x: 40,
  opacity: 0,
  delay: .2,
  scrollTrigger: { trigger: ".about", start: "top 80%" }
});


// Hover Effects
document.querySelectorAll("button, .project-card, .skill-card, .testimonial-card")
  .forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });


// Cursor preview image on projects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    cursorImg.style.backgroundImage = `url(${card.dataset.image})`;
    gsap.to(cursorImg, { opacity: 1, scale: 1 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(cursorImg, { opacity: 0, scale: 0.6 });
  });
});


// Parallax Glow
gsap.to(".hero-bg", {
  xPercent: -20,
  yPercent: -10,
  scrollTrigger: { trigger: ".hero", scrub: 1 }
});


// ScrollTo Buttons
document.getElementById("scroll-projects").addEventListener("click", () => {
  gsap.to(window, { scrollTo: "#projects", duration: 1.2 });
});
document.getElementById("scroll-about").addEventListener("click", () => {
  gsap.to(window, { scrollTo: ".about", duration: 1.2 });
});


// Particle Background
const canvas = document.getElementById("particle-bg");
const ctx = canvas.getContext("2d");

let particlesArray;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = { x: null, y: null, radius: 120 };
window.addEventListener("mousemove", (event) => { mouse.x = event.x; mouse.y = event.y; });

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x; this.y = y; this.size = size;
    this.speedX = speedX; this.speedY = speedY;
  }
  draw() {
    ctx.fillStyle = "rgba(255, 107, 61, 0.8)";
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      this.x -= dx / 15;
      this.y -= dy / 15;
    }
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 3 + 1,
      (Math.random() - 0.5),
      (Math.random() - 0.5),
    ));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  initParticles();
});
