// DOM elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const resumeBtn = document.getElementById('resumeBtn');
const demoBtns = document.querySelectorAll('.demo-link');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // change icon
  const icon = hamburger.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// close mobile menu on link click + active class & smooth scroll
navLinkItems.forEach(link => {
  link.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Update active highlighting manually after click
    updateActiveLink(targetId);
  });
});

// Intersection Observer for active menu highlight
function updateActiveLink(sectionId) {
  navLinkItems.forEach(link => {
    const href = link.getAttribute('href').substring(1);
    if (href === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      updateActiveLink(id);
    }
  });
}, { threshold: 0.45, rootMargin: "-70px 0px -20px 0px" });

sections.forEach(section => observer.observe(section));

// resume simulation button
resumeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  alert("📄 Resume preview: Alex Chen_CS_2025.pdf (demo) — full version available upon request.");
});

// Project demo links simulation (alert because demo/gh placeholder)
demoBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    alert("🔗 This link would redirect to actual GitHub repository or live demo. Industry-ready portfolio includes full projects.");
  });
});

// Contact form validation + alert
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert("❌ Please fill all fields before sending.");
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    alert("⚠️ Please enter a valid email address.");
    return;
  }
  alert(`✅ Thanks ${name}! Your message has been sent. I'll reply within 24 hours.`);
  contactForm.reset();
});

// optional: smooth polyfill for old browsers, but all good
// add current year auto footer
const footerYear = document.querySelector('footer p');
if (footerYear) {
  const year = new Date().getFullYear();
  footerYear.innerHTML = `© ${year} Murabanda Simhachalam. Built with <i class="fas fa-heart" style="color:#2563eb;"></i> and effections`;
}

// handling active link when page loads (home)
window.addEventListener('load', () => {
  const heroSection = document.getElementById('home');
  if (heroSection) {
    const rect = heroSection.getBoundingClientRect();
    if (rect.top <= 100) updateActiveLink('home');
  }
});