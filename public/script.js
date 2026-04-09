const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const leadForm = document.getElementById('leadForm');
const phoneInput = document.getElementById('phone');
const serviceDateInput = document.getElementById('serviceDate');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

if (serviceDateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');

  serviceDateInput.min = `${year}-${month}-${day}`;
}

if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d()+\-\s]/g, '');
  });
}

if (leadForm) {
  const isLocalPreview =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';
  const formEndpoint = isLocalPreview ? '/api/requests' : leadForm.dataset.endpoint;

  if (formEndpoint) {
    leadForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';

      const formData = new FormData(leadForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        successMessage.textContent =
          `Thanks, ${data.name}. Your request is in. We will reach out shortly to confirm your ${data.serviceType || 'detail'}.`;
        successMessage.style.display = 'block';
        leadForm.reset();
      } catch (error) {
        errorMessage.style.display = 'block';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
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
    '.info-row',
    '.promise-card',
    '.hero-copy',
    '.hero-card',
    '.page-hero .narrow'
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
});
