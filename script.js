const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.02,
    rootMargin: '0px 0px 100px 0px'
  }
);

revealItems.forEach((item) => observer.observe(item));

/* --- Interactive 3D Cyber Grid & Liquid Aurora Canvas Background (Performance Optimized) --- */
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let isMobile = window.innerWidth <= 768;
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2, active: false };
  let lastTime = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    isMobile = window.innerWidth <= 768;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  class AuroraOrb {
    constructor(color, radius, vx, vy) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = vx;
      this.vy = vy;
      this.radius = radius;
      this.color = color;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.015;

      if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
      if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;
    }

    draw() {
      const scale = isMobile ? 0.55 : 1;
      const currentRadius = (this.radius + Math.sin(this.pulse) * 30) * scale;
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentRadius);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(3, 5, 9, 0)');

      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  const orbs = [
    new AuroraOrb('rgba(0, 242, 254, 0.18)', 280, 0.35, 0.25),
    new AuroraOrb('rgba(255, 0, 127, 0.14)', 320, -0.25, 0.35)
  ];

  if (!isMobile) {
    orbs.push(
      new AuroraOrb('rgba(121, 40, 202, 0.16)', 360, 0.25, -0.25),
      new AuroraOrb('rgba(0, 242, 254, 0.12)', 260, -0.3, -0.2)
    );
  }

  function animateCanvas(timestamp) {
    requestAnimationFrame(animateCanvas);

    // Throttle frame rate on mobile to 30FPS for 0% CPU lag
    if (isMobile) {
      if (timestamp - lastTime < 32) return;
      lastTime = timestamp;
    }

    ctx.clearRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    orbs.forEach((orb) => {
      orb.update();
      orb.draw();
    });

    if (mouse.active && !isMobile) {
      const mouseGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
      mouseGradient.addColorStop(0, 'rgba(0, 242, 254, 0.18)');
      mouseGradient.addColorStop(0.5, 'rgba(255, 0, 127, 0.08)');
      mouseGradient.addColorStop(1, 'rgba(3, 5, 9, 0)');

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
      ctx.fillStyle = mouseGradient;
      ctx.fill();
    }

    // 3D Perspective Cyber Grid Lines
    const horizon = height * 0.65;
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
    ctx.lineWidth = 1;

    const yStep = isMobile ? 36 : 24;
    for (let y = horizon; y < height; y += yStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const numLines = isMobile ? 10 : 18;
    const centerX = width / 2;
    for (let i = 0; i <= numLines; i++) {
      const x = (width / numLines) * i;
      ctx.beginPath();
      ctx.moveTo(centerX + (x - centerX) * 0.15, horizon);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  }

  requestAnimationFrame(animateCanvas);
}

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent = 'Sending your message...';
      formStatus.className = 'form-status loading';
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/solution.tech.1214@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: new URLSearchParams(new FormData(contactForm)),
      });

      if (response.ok) {
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = 'Your message was sent successfully. We will reply soon.';
          formStatus.className = 'form-status success';
        }
      } else {
        throw new Error('Unable to send message');
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Something went wrong. Please email us directly at solution.tech.1214@gmail.com';
        formStatus.className = 'form-status error';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    }
  });
}

/* --- Mobile Navigation Drawer Toggle --- */
const mobileToggleBtn = document.querySelector('.mobile-nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (mobileToggleBtn && siteNav) {
  mobileToggleBtn.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

/* --- Project Category Filter Logic --- */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-card, .project-row');

if (filterButtons.length > 0 && projectItems.length > 0) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        const displayType = item.classList.contains('project-row') ? 'grid' : 'flex';
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = displayType;
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });
}

/* --- Case Study Modal Handler --- */
const modalOverlay = document.getElementById('caseStudyModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

const modalTitle = document.getElementById('modalTitle');
const modalTag = document.getElementById('modalTag');
const modalMedia = document.getElementById('modalMedia');
const modalDesc = document.getElementById('modalDesc');
const modalTech = document.getElementById('modalTech');
const modalHighlights = document.getElementById('modalHighlights');
const modalLink = document.getElementById('modalLink');

const projectData = {
  studyalquran: {
    title: 'Study Al Quran Learning Platform',
    tag: 'EdTech & Learning Academy',
    media: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80',
    desc: 'An international online Quran & Islamic education platform engineered for seamless student enrollment, live tutor session scheduling, course curriculum tracking, and global accessibility across desktop & mobile.',
    tech: 'React.js / Custom Frontend, Node.js API, MongoDB, Tailwind CSS, Vercel',
    highlights: [
      'Interactive student registration & class scheduling workflow',
      'Optimized global media streaming and audio playback engine',
      'Multi-currency course subscription & payment gateway integration',
      'Sub-second page rendering speed with 100% responsive layout'
    ],
    link: 'https://studyalquran.com'
  },
  cellspart: {
    title: 'Cells Part E-Commerce Portal',
    tag: 'High-Volume E-Commerce',
    media: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    desc: 'A robust e-commerce platform for tech and mobile replacement parts featuring full product catalog management, instant SKU search, cart persistence, and secure checkout processing.',
    tech: 'MERN Stack (MongoDB, Express, React, Node), Redux Toolkit, Stripe, Tailwind CSS',
    highlights: [
      'High-speed SKU & parts instant search filtering engine',
      'Full administrative dashboard for stock & order management',
      'Multi-item shopping cart with localized currency conversion',
      'Secure payment processing with automated invoice generation'
    ],
    link: 'https://cellspart.com'
  },
  starpools: {
    title: '6Star Pools Australia Corporate Site',
    tag: 'Corporate & Service Agency (Australia)',
    media: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    desc: 'A high-converting web platform built for a premier Australian swimming pool construction & maintenance company. Features custom project showcases, service quote estimators, and lead generation funnels.',
    tech: 'Webflow / Modern Frontend, Custom JS, Tailwind CSS, High-Speed CDN',
    highlights: [
      'Interactive project gallery showcase with high-res image lightboxes',
      'Custom online quote & consultation request form funnel',
      'Advanced local SEO optimization for major Australian cities',
      'Mobile-first responsive architecture with smooth animations'
    ],
    link: 'https://6starpools.au/'
  },
  alnoorquran: {
    title: 'Al Noor Online Quran Academy',
    tag: 'Global EdTech Portal',
    media: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    desc: 'A worldwide digital learning portal connecting students across the UK, USA, and Australia with certified tutors. Includes comprehensive course modules, student portals, and contact forms.',
    tech: 'Modern Web Architecture, PHP/Node.js, MySQL/MongoDB, CSS3 Grid, Vercel',
    highlights: [
      'Global student portal with timezone-aware class scheduling',
      'Interactive course catalog with structured curriculum levels',
      'High-conversion direct WhatsApp & Email lead integration',
      'Sub-second load times optimized for low-bandwidth mobile users'
    ],
    link: 'https://www.alnooronlinequranacademy.com/'
  },
  aspectcleaning: {
    title: 'Aspect Window Cleaning Australia',
    tag: 'Commercial Service Platform (Australia)',
    media: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    desc: 'A modern commercial and residential service platform engineered for an Australian cleaning agency. Features instant service package booking, client reviews, and direct quote requests.',
    tech: 'Custom Frontend, Framer / CMS, High-Performance CSS, Node Backend',
    highlights: [
      'Streamlined commercial quote calculator & booking request',
      'High-converting landing layout designed for Australian search traffic',
      'Responsive gallery of before-and-after project transformations',
      'Optimized performance score and sub-second page speed'
    ],
    link: 'https://aspectwindowcleaning.com.au/'
  },
  nexus: {
    title: 'Nexus AI Interactive Book & Reading Platform',
    tag: 'AI Online E-Book Reader & Assistant',
    media: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    desc: 'An intelligent online digital book & e-reading platform where users can read full books online, chat with a real-time AI reading tutor (Gemini RAG), extract chapter summaries, and translate or explain complex concepts while reading.',
    tech: 'React.js / Next.js, Node.js, Express.js, MongoDB, Gemini API, Tailwind CSS',
    highlights: [
      '📖 Interactive In-Browser E-Book & Document Reader',
      '🤖 Real-Time AI Reading Tutor (Gemini API RAG)',
      '⚡ Instant Chapter Summaries, Highlights & Concept Explanation',
      '📚 Personal User Workspace, Saved Books & Reading Progress'
    ],
    link: 'https://nexus-ai-book.vercel.app'
  },
  healthmate: {
    title: 'HealthMate Wellness Portal',
    tag: 'MERN Stack',
    media: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    desc: 'A comprehensive health tracking and wellness platform built to streamline patient data management and health monitoring. Features real-time charts and secure authentication.',
    tech: 'React.js, Tailwind CSS, Node.js, Express.js, MongoDB, JWT Auth',
    highlights: [
      'Interactive health metrics tracker & progress visualization',
      'Secure MongoDB database with encrypted patient data',
      'Responsive patient portal optimized for mobile & desktop',
      'Fast REST API endpoints with Express middleware validation'
    ],
    link: 'https://healthmate-frontend-five.vercel.app/'
  },
  luxe: {
    title: 'Luxe Clothing E-Commerce Store',
    tag: 'MERN Stack & E-Commerce',
    media: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    desc: 'A high-performance MERN stack e-commerce web application featuring full CRUD product management, cart & checkout workflows, and optimized sub-second product page rendering.',
    tech: 'React.js, Redux Toolkit, Tailwind CSS, Node.js, Express.js, MongoDB',
    highlights: [
      'Seamless multi-item shopping cart with local state persistence',
      'Fast product filtering by category, price, and availability',
      'Full administrative panel for inventory & order tracking',
      'Optimized image loading and responsive luxury layout'
    ],
    link: 'https://luxe-brand.vercel.app/'
  }
};

window.openCaseStudy = function(projectId) {
  const data = projectData[projectId];
  if (!data || !modalOverlay) return;

  if (modalTitle) modalTitle.textContent = data.title;
  if (modalTag) modalTag.textContent = data.tag;
  if (modalMedia) modalMedia.src = data.media;
  if (modalDesc) modalDesc.textContent = data.desc;
  if (modalTech) modalTech.textContent = data.tech;
  if (modalLink) modalLink.href = data.link;

  if (modalHighlights) {
    modalHighlights.innerHTML = data.highlights.map((item) => `<li>${item}</li>`).join('');
  }

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

