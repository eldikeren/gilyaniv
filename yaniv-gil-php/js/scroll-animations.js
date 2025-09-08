// Universal scroll animation system
document.addEventListener('DOMContentLoaded', () => {
  // Create intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements that should animate
  const elementsToAnimate = document.querySelectorAll(`
    .card,
    .service-card,
    .article-card,
    .testimonial,
    .about-content,
    .contact-content,
    .section-header,
    .hero-text,
    .hero-video,
    .fade-in,
    .practice-grid .card,
    .articles-grid .card,
    .services-grid .service-card,
    .testimonials .testimonial,
    .contact-grid .card,
    .footer-section,
    .cta,
    .hero-card
  `);

  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });

  // Special handling for hero elements (animate immediately)
  const heroElements = document.querySelectorAll('.hero-text, .hero-video, .hero-card');
  heroElements.forEach(el => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 100);
  });

  // Animate section headers with slight delay
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach((header, index) => {
    setTimeout(() => {
      header.classList.add('visible');
    }, 200 + (index * 100));
  });
});
