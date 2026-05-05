/* ============================================================
   CEI — Chicago Expert Importers  |  main.js
   ============================================================ */

/* ── Sticky header ───────────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── Mobile menu ─────────────────────────────────────────────── */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeModal(); } });
document.addEventListener('click', e => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
});

/* ── Smooth scroll ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Reveal on scroll ────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal') || [])];
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${idx * 90}ms`;
    entry.target.classList.add('visible');
    ro.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => ro.observe(el));

/* ── Active nav on scroll ────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.hn');
const ao = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => {
        l.style.color = l.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--gold-lt, #DDB85A)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => ao.observe(s));

/* ── Counter animation ───────────────────────────────────────── */
function runCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.counter').forEach(runCounter);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.about-stats').forEach(el => counterObserver.observe(el));

/* ── FAQ accordion ───────────────────────────────────────────── */
function toggleFaq(btn) {
  const answer  = btn.nextElementSibling;
  const isOpen  = btn.getAttribute('aria-expanded') === 'true';
  // Close all
  document.querySelectorAll('.faq-q').forEach(q => {
    q.setAttribute('aria-expanded', 'false');
    q.nextElementSibling.hidden = true;
  });
  // Open clicked (if was closed)
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    answer.hidden = false;
  }
}

/* ── Service Modals ──────────────────────────────────────────── */
const modalData = {
  sourcing: {
    label: 'Service 01',
    title: 'Global Sourcing & Contract Manufacturing',
    body: 'CEI is a global sourcing service and product development company that provides high-quality products from our vast network of ISO, QS and TS certified factories. We have developed long-term strategic alliances with world-class global manufacturers that consistently deliver quality, competitive pricing, and on-time performance.',
    items: [
      'Vast factory network: ISO, QS and TS certified suppliers across Asia & Europe',
      'New product development or repositioning of existing products and parts',
      'Concept-to-completion management from design stage through delivery',
      'Long-term alliances with reliable global manufacturers',
      'Competitive pricing with consistent on-time delivery commitments',
      'Factory audits and quality control at country of origin',
    ]
  },
  logistics: {
    label: 'Service 02',
    title: 'Import / Export Logistics',
    body: 'CEI provides full-service logistical support from origin to final destination. Our C-TPAT certification ensures that your goods move through customs efficiently, safely, and in full compliance with U.S. Customs and Border Protection requirements.',
    items: [
      'Full-service import and export logistical coordination',
      'C-TPAT certified — efficient, secure, and compliant transport',
      'Complete customs clearance documentation and management',
      'Freight forwarding and carrier coordination',
      'Real-time shipment visibility and status updates',
      'Risk management and regulatory compliance guidance',
    ]
  },
  warehousing: {
    label: 'Service 03',
    title: 'Warehousing & Distribution',
    body: "CEI's warehousing services specialize in full-service, client-specific solutions that allow for the safe storage and careful transport of your goods. We own and operate a temperature-controlled 120,000 ft² facility in Batavia, IL — designed to drive efficiency into your supply chain.",
    items: [
      '120,000 ft² temperature-controlled facility in Batavia, Illinois',
      '27-foot ceiling height for maximum storage capacity',
      '9 bay stations for smooth and efficient logistics handling',
      'Auto/motion sensor lighting and high-capacity sprinkler system',
      'State-of-the-art 24/7 security system for inventory protection',
      'Flexible, client-specific solutions to lower inventory costs',
    ]
  }
};

function openModal(type) {
  const d = modalData[type];
  if (!d) return;
  document.getElementById('modalContent').innerHTML = `
    <p class="modal-label">${d.label}</p>
    <h2 class="modal-title" id="modalTitle">${d.title}</h2>
    <p class="modal-body">${d.body}</p>
    <ul class="modal-list">${d.items.map(i => `<li>${i}</li>`).join('')}</ul>
    <a href="#contact" class="btn-ink w-full text-center block" onclick="closeModal()">Request a Quote →</a>
  `;
  const overlay = document.getElementById('modalOverlay');
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => overlay.querySelector('.modal-close')?.focus(), 60);
}

function closeModal() {
  document.getElementById('modalOverlay').hidden = true;
  document.body.style.overflow = '';
}

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

/* ── Contact form ────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const successMsg  = document.getElementById('formSuccess');
const errorMsg    = document.getElementById('formError');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    const fname   = contactForm.fname.value.trim();
    const lname   = contactForm.lname.value.trim();
    const email   = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!fname || !lname || !email || !message) {
      errorMsg.classList.remove('hidden'); errorMsg.focus(); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMsg.textContent = 'Please enter a valid email address.';
      errorMsg.classList.remove('hidden'); return;
    }

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // ── NOTE FOR DEVELOPER ────────────────────────────────────
    // Replace the simulation below with a real form endpoint:
    //   • Formspree:  fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(contactForm) })
    //   • Netlify:    add netlify attribute to <form>
    //   • EmailJS:    emailjs.sendForm('service_id', 'template_id', contactForm)
    // ─────────────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 1100));

    contactForm.reset();
    submitBtn.textContent = 'Send Message →';
    submitBtn.disabled = false;
    successMsg.classList.remove('hidden');
    successMsg.focus();
    setTimeout(() => successMsg.classList.add('hidden'), 7000);
  });
}
