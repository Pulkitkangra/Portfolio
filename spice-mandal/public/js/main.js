/* ════════════════════════════════
   Spice Mandal — Main JS
════════════════════════════════ */

/* ── PAGE LOADER ── */
(function() {
  let pct = 0;
  const loaderEl  = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPct = document.getElementById('loaderPct');
  if (!loaderEl) return;
  const iv = setInterval(() => {
    pct += Math.random() * 16 + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(iv);
      if (loaderBar) loaderBar.style.width = '100%';
      if (loaderPct) loaderPct.textContent = '100%';
      setTimeout(() => {
        loaderEl.classList.add('hide');
        document.body.classList.remove('loading');
      }, 380);
    }
    if (loaderBar) loaderBar.style.width = pct + '%';
    if (loaderPct) loaderPct.textContent = Math.floor(pct) + '%';
  }, 110);
})();

/* ── CUSTOM CURSOR ── */
(function() {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cur || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  const tick = () => {
    cur.style.left  = mx + 'px';
    cur.style.top   = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  };
  tick();
  document.querySelectorAll('a, button, .exp-card, .testi-card, .chef-card, .menu-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });
})();

/* ── NAV SCROLL + STICKY BAR + BACK-TO-TOP ── */
(function() {
  const nav       = document.getElementById('mainNav');
  const stickyBar = document.getElementById('stickyBar');
  const backTop   = document.getElementById('backTop');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    if (stickyBar) stickyBar.classList.toggle('visible', y > 500);
    if (backTop)   backTop.classList.toggle('show', y > 400);
  });
})();

/* ── MOBILE DRAWER ── */
const drawer    = document.getElementById('navDrawer');
const hamburger = document.getElementById('hamburger');
function toggleDrawer() {
  if (!drawer || !hamburger) return;
  drawer.classList.toggle('open');
  hamburger.classList.toggle('open');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}
function closeDrawer() {
  if (!drawer || !hamburger) return;
  drawer.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── MENU TAB SWITCH ── */
function switchMenu(btn, cat) {
  document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(8px)';
  setTimeout(() => {
    document.querySelectorAll('.menu-item').forEach(item => {
      item.style.display = item.dataset.cat === cat ? 'flex' : 'none';
    });
    grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 180);
}

/* ── RESERVATION FORM (AJAX) ── */
(function() {
  const form = document.getElementById('reservationForm');
  const btn  = document.getElementById('resBtn');
  const successDiv = document.getElementById('resSuccess');
  const resMsg     = document.getElementById('resMessage');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const body = {};
    new FormData(form).forEach((v, k) => { body[k] = v; });

    try {
      const res  = await fetch('/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        form.style.display = 'none';
        if (successDiv) { successDiv.style.display = 'block'; }
        if (resMsg) resMsg.textContent = data.message;
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
        btn.textContent = original;
        btn.disabled = false;
      }
    } catch (err) {
      alert('Network error. Please try again or call us at +91 98765 43210');
      btn.textContent = original;
      btn.disabled = false;
    }
  });
})();

/* ── NEWSLETTER SUBSCRIBE ── */
function subscribeNL(btn) {
  const input = document.getElementById('nlEmail');
  if (!input || !input.value) { input && input.focus(); return; }
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#2a7a3a';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 4000);
}

/* ── SCROLL REVEAL ── */
(function() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const io  = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('in'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => io.observe(el));

  // Stagger card grids
  document.querySelectorAll('.testi-grid, .chefs-grid').forEach(grid => {
    [...grid.children].forEach((c, i) => {
      c.classList.add('reveal');
      c.dataset.delay = i * 100;
      io.observe(c);
    });
  });
})();

/* ── ACTIVE NAV ON SCROLL ── */
(function() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-center a');
  if (!sections.length || !navLinks.length) return;
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.style.opacity = '');
        const a = document.querySelector(`.nav-center a[href="#${e.target.id}"]`);
        if (a) a.style.opacity = '1';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => secObs.observe(s));
})();
