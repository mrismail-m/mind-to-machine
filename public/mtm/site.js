const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeMenu();
});
// Restore the captured site's entrance reveals, scroll motion, and text scramble.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const pixelHeadings = document.querySelectorAll('h1 .pixel, h2 .pixel');
if (window.gsap && window.ScrambleTextPlugin) {
  gsap.registerPlugin(ScrambleTextPlugin);
}
function scramble(element, duration = .45) {
  if (motionPreference.matches || !window.gsap || !window.ScrambleTextPlugin) return;
  gsap.killTweensOf(element);
  gsap.to(element, {duration, scrambleText: {text: element.dataset.original || element.textContent, chars: 'weruoaszxcvnm', speed: .5}});
}
pixelHeadings.forEach(element => { element.dataset.original = element.textContent; });
const animatedItems = document.querySelectorAll('.sponsor-slot, .section-top, .about-heading, .about-copy, .process-strip > div, .cash, .swag-item, .schedule-item, .venue-layout > div, .judge, .team-layout > div, .price-card, .registration-heading');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    if (!motionPreference.matches) {
      const siblings = [...entry.target.parentElement.children];
      const stagger = Math.min(siblings.indexOf(entry.target), 3) * 65;
      entry.target.animate([{opacity: 0, transform: 'translateY(28px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 650, delay: stagger, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'backwards'});
      entry.target.querySelectorAll('.pixel').forEach(element => scramble(element));
    }
    revealObserver.unobserve(entry.target);
  });
}, {threshold: .12});
animatedItems.forEach(element => revealObserver.observe(element));
if (!motionPreference.matches) {
  document.querySelectorAll('.hero .eyebrow, .hero h1, .hero-description, .hero .btn, .hero-meta').forEach((element, index) => {
    element.animate([{opacity: 0, transform: 'translateY(25px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 800, delay: index * 95, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'backwards'});
  });
  const heroPixel = document.querySelector('h1 .pixel');
  setTimeout(() => scramble(heroPixel, .65), 180);
}
document.querySelectorAll('.btn').forEach(button => {
  // Animate only the label, preserving arrows, accessible names, and click targets.
  const textNode = [...button.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (!textNode) return;
  const label = document.createElement('span');
  label.textContent = textNode.textContent.trim();
  label.dataset.original = label.textContent;
  textNode.replaceWith(label);
  button.addEventListener('mouseenter', () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) scramble(label, .3);
  });
});
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.to('.hero .float, .hero .code-tile, .hero .idea-tile', {y: -65, ease: 'none', scrollTrigger: {trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1}});
  });
}
motionPreference.addEventListener('change', event => {
  if (event.matches && window.gsap) {
    [...pixelHeadings, ...document.querySelectorAll('.btn span[data-original]')].forEach(element => {
      gsap.killTweensOf(element);
      element.textContent = element.dataset.original;
    });
  }
});
