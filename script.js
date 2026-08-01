// DEADLOCK Website - JavaScript Functionality

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmoothScroll();
  initToast();
  setYear();
});

/* MOBILE NAVIGATION */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.contains('active');
    siteNav.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', !isOpen);
  });

  // Close menu when clicking a link
  const navLinks = siteNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
      siteNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* SMOOTH SCROLL */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      
      // Account for fixed header
      const headerHeight = document.querySelector('.site-header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* TOAST NOTIFICATIONS */
function initToast() {
  window.showToast = function(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };
}

/* SET CURRENT YEAR */
function setYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* SCROLL ANIMATIONS */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .race-item, .combat-card, .code-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

/* ACTIVE NAV LINK HIGHLIGHTING */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const headerHeight = document.querySelector('.site-header').offsetHeight;

  let currentSection = null;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.site-nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

/* PARALLAX EFFECT */
window.addEventListener('scroll', () => {
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.innerWidth > 768) {
    const scrollY = window.scrollY;
    heroVisual.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});

/* BUTTON INTERACTIONS */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
  });

  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });

  btn.addEventListener('click', function(e) {
    // Add ripple effect on click
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: rippleEffect 0.6s ease-out;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

/* KEYBOARD NAVIGATION */
document.addEventListener('keydown', (e) => {
  // Close mobile nav on Escape
  if (e.key === 'Escape') {
    const siteNav = document.getElementById('site-nav');
    const navToggle = document.getElementById('nav-toggle');
    if (siteNav && siteNav.classList.contains('active')) {
      siteNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

/* ADD RIPPLE ANIMATION TO STYLESHEET */
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('DEADLOCK Website initialized successfully! 🎮');
