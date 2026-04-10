import { siteConfig } from '../config/config.js';
import { mountLeadForm } from '../components/lead-form.js';

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function setLink(selector, href, label) {
  document.querySelectorAll(selector).forEach((element) => {
    element.setAttribute('href', href);
    if (label) {
      element.textContent = label;
    }
  });
}

function renderCards(containerId, items, renderer) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = items.map(renderer).join('');
}

function applyBranding() {
  const { business, colors, hero, sections, sidebarFeatures, footerDescription } = siteConfig;
  const root = document.documentElement;

  root.style.setProperty('--bg', colors.background);
  root.style.setProperty('--surface', colors.surface);
  root.style.setProperty('--surface-strong', colors.surfaceStrong);
  root.style.setProperty('--ink', colors.ink);
  root.style.setProperty('--muted', colors.muted);
  root.style.setProperty('--line', colors.line);
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--primary-dark', colors.primaryDark);
  root.style.setProperty('--accent-glow', colors.accentGlow);

  setText('[data-business-name]', business.name);
  setText('[data-business-tagline]', business.tagline);
  setText('[data-brand-initials]', business.initials);
  setText('[data-hero-eyebrow]', hero.eyebrow);
  setText('[data-hero-title]', hero.title);
  setText('[data-hero-description]', hero.description);
  setText('[data-primary-cta]', business.ctaLabel);
  setText('[data-secondary-cta]', hero.secondaryCta);
  setText('[data-highlight-label]', hero.highlightLabel);
  setText('[data-highlight-title]', hero.highlightTitle);
  setText('[data-highlight-cta]', hero.highlightCta);
  setText('[data-benefits-eyebrow]', sections.benefits.eyebrow);
  setText('[data-benefits-title]', sections.benefits.title);
  setText('[data-services-eyebrow]', sections.services.eyebrow);
  setText('[data-services-title]', sections.services.title);
  setText('[data-services-description]', sections.services.description);
  setText('[data-process-eyebrow]', sections.process.eyebrow);
  setText('[data-process-title]', sections.process.title);
  setText('[data-results-eyebrow]', sections.results.eyebrow);
  setText('[data-results-title]', sections.results.title);
  setText('[data-results-description]', sections.results.description);
  setText('[data-testimonials-eyebrow]', sections.testimonials.eyebrow);
  setText('[data-testimonials-title]', sections.testimonials.title);
  setText('[data-testimonials-description]', sections.testimonials.description);
  setText('[data-about-eyebrow]', sections.about.eyebrow);
  setText('[data-about-title]', sections.about.title);
  setText('[data-about-description]', sections.about.description);
  setText('[data-form-title]', siteConfig.form.title);
  setText('[data-form-description]', siteConfig.form.description);
  setText('[data-final-eyebrow]', sections.finalCta.eyebrow);
  setText('[data-final-title]', sections.finalCta.title);
  setText('[data-footer-description]', footerDescription);

  setLink('[data-primary-cta]', business.ctaHref, business.ctaLabel);
  setLink('[data-contact-email-link]', `mailto:${business.email}`, business.email);
  setLink('[data-contact-email-button]', `mailto:${business.email}`, 'Email Us');
  setLink('[data-contact-phone-link]', business.phoneHref, business.phone);
  setLink('[data-contact-cta-link]', business.ctaHref, business.ctaLabel);

  renderCards(
    'trust-cards',
    sections.trust,
    (item) => `
      <div>
        <strong>${item.title}</strong>
        <span>${item.text}</span>
      </div>
    `
  );

  renderCards(
    'highlight-points',
    hero.highlightPoints,
    (item) => `<li>${item}</li>`
  );

  renderCards(
    'benefit-cards',
    sections.benefits.cards,
    (item) => `
      <article class="info-card">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `
  );

  renderCards(
    'service-cards',
    sections.services.cards,
    (item) => `
      <article class="package-card${item.price === 'Most Popular' ? ' featured' : ''}">
        <div class="package-head">
          <h3>${item.title}</h3>
          <span>${item.price}</span>
        </div>
        <p>${item.description}</p>
      </article>
    `
  );

  renderCards(
    'process-steps',
    sections.process.steps,
    (item, index) => `
      <article class="step-card">
        <span>${index + 1}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `
  );

  renderCards(
    'proof-gallery',
    sections.results.gallery,
    (item) => `
      <figure class="gallery-card">
        <img src="${item.image}" alt="${item.alt}">
        <figcaption>${item.caption}</figcaption>
      </figure>
    `
  );

  renderCards(
    'testimonial-cards',
    sections.testimonials.cards,
    (item) => `
      <blockquote class="review-card">
        <p>"${item.quote}"</p>
        <cite>${item.author}</cite>
      </blockquote>
    `
  );

  renderCards(
    'feature-points',
    sidebarFeatures,
    (item) => `<li>${item}</li>`
  );

  mountLeadForm(document.getElementById('lead-form-root'), siteConfig.form, siteConfig.webhook);
}

function enableNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');

  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function enableScrollEffects() {
  const animatedSelectors = [
    '.section-heading',
    '.info-card',
    '.package-card',
    '.step-card',
    '.review-card',
    '.gallery-card',
    '.callout-shell',
    '.booking-card',
    '.sidebar-card',
    '.hero-copy',
    '.hero-card',
    '.promise-card'
  ];

  const parallaxSelectors = [
    '.hero-card',
    '.gallery-card img'
  ];

  const animatedItems = document.querySelectorAll(animatedSelectors.join(', '));
  const parallaxItems = document.querySelectorAll(parallaxSelectors.join(', '));

  animatedItems.forEach((item) => item.classList.add('scroll-animate'));
  parallaxItems.forEach((item) => item.classList.add('parallax'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedItems.forEach((item) => observer.observe(item));

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxItems.forEach((item) => {
      const offset = scrollY * 0.1;
      item.style.setProperty('--parallax-offset', `${offset}px`);
    });

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  window.addEventListener('resize', requestParallaxUpdate);
  requestParallaxUpdate();
}

document.addEventListener('DOMContentLoaded', () => {
  applyBranding();
  enableNavigation();
  enableScrollEffects();
});
