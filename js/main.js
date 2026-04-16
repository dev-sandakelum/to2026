// ===== NAVBAR MOBILE DRAWER =====
const navToggle = document.querySelector('.nav-toggle');
const navDrawer = document.querySelector('.nav-drawer');
const navDrawerClose = document.querySelector('.nav-drawer-close');
const navDrawerOverlay = document.querySelector('.nav-drawer-overlay');

function openDrawer() {
  navDrawer?.classList.add('open');
  navToggle?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navDrawer?.classList.remove('open');
  navToggle?.classList.remove('open');
  document.body.style.overflow = '';
}

navToggle?.addEventListener('click', () => {
  navDrawer?.classList.contains('open') ? closeDrawer() : openDrawer();
});

navDrawerClose?.addEventListener('click', closeDrawer);
navDrawerOverlay?.addEventListener('click', closeDrawer);

// close drawer on link click
document.querySelectorAll('.nav-drawer-links a').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// Mark active nav link (both desktop + drawer)
const currentHref = location.href;
document.querySelectorAll('.nav-links a, .nav-drawer-links a').forEach(link => {
  if (link.href === currentHref) link.classList.add('active');
});

// ===== TABS =====
document.querySelectorAll('.tab-list').forEach(tabList => {
  tabList.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const parent = btn.closest('.tabs');
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      parent.querySelector(`[data-panel="${target}"]`).classList.add('active');
    });
  });
});

// ===== ACCORDION =====
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const isOpen = body.classList.contains('open');
    // close all in same accordion group
    header.closest('.accordion-group')?.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
    header.closest('.accordion-group')?.querySelectorAll('.accordion-arrow').forEach(a => a.textContent = '+');
    if (!isOpen) {
      body.classList.add('open');
      header.querySelector('.accordion-arrow').textContent = '−';
    }
  });
});

// ===== MODAL =====
document.querySelectorAll('[data-modal-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.modalOpen;
    document.getElementById(id)?.classList.add('open');
  });
});
document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal-overlay')?.classList.remove('open');
  });
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ===== FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.filter-bar');
    group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const container = document.querySelector(btn.dataset.target || '.cards-grid');
    if (!container) return;
    container.querySelectorAll('[data-category]').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  });
});

// ===== QUIZ =====
const quizData = [
  { q: '[ Question 1 placeholder text goes here? ]', opts: ['[ Option A ]', '[ Option B ]', '[ Option C ]', '[ Option D ]'] },
  { q: '[ Question 2 placeholder text goes here? ]', opts: ['[ Option A ]', '[ Option B ]', '[ Option C ]', '[ Option D ]'] },
  { q: '[ Question 3 placeholder text goes here? ]', opts: ['[ Option A ]', '[ Option B ]', '[ Option C ]', '[ Option D ]'] },
];
let currentQ = 0;

function loadQuestion() {
  const qBox = document.getElementById('question-text');
  const optList = document.getElementById('options-list');
  const progress = document.getElementById('progress-fill');
  const counter = document.getElementById('q-counter');
  if (!qBox) return;
  const data = quizData[currentQ];
  qBox.textContent = data.q;
  optList.innerHTML = '';
  data.opts.forEach(opt => {
    const li = document.createElement('li');
    li.className = 'option-item';
    li.textContent = opt;
    li.addEventListener('click', () => {
      optList.querySelectorAll('.option-item').forEach(o => o.classList.remove('selected'));
      li.classList.add('selected');
    });
    optList.appendChild(li);
  });
  const pct = ((currentQ + 1) / quizData.length) * 100;
  if (progress) progress.style.width = pct + '%';
  if (counter) counter.textContent = `Question ${currentQ + 1} / ${quizData.length}`;
}

const nextBtn = document.getElementById('next-btn');
if (nextBtn) {
  loadQuestion();
  nextBtn.addEventListener('click', () => {
    currentQ = (currentQ + 1) % quizData.length;
    loadQuestion();
  });
}

// ===== TOGGLES =====
document.querySelectorAll('.toggle').forEach(t => {
  t.addEventListener('click', () => t.classList.toggle('on'));
});

// ===== DROPDOWN =====
document.querySelectorAll('[data-dropdown]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const menu = document.getElementById(btn.dataset.dropdown);
    menu?.classList.toggle('open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
});


// ===== BOTTOM TAB BAR =====
(function () {
  const tabs = [
    { href: 'index.html',   icon: '🏠', label: 'Home'    },
    { href: 'works.html',   icon: '🗂️', label: 'Works'   },
    { href: 'apps.html',    icon: '🧩', label: 'Apps'    },
    { href: 'notes.html',   icon: '📝', label: 'Notes'   },
    { href: 'blog.html',    icon: '✍️', label: 'Blog'    },
    { href: 'quiz.html',    icon: '🧠', label: 'Quiz'    },
    { href: 'working.html', icon: '🔭', label: 'Working' },
  ];

  const bar = document.createElement('nav');
  bar.className = 'bottom-tab-bar';
  bar.setAttribute('aria-label', 'Main navigation');

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  tabs.forEach(t => {
    const a = document.createElement('a');
    a.href = t.href;
    a.className = 'tab-bar-item';
    a.setAttribute('aria-label', t.label);
    if (t.href === currentPage || (currentPage === '' && t.href === 'index.html')) {
      a.classList.add('active');
    }
    // Icon only — no label text
    a.innerHTML = `<span class="tab-bar-icon" aria-hidden="true">${t.icon}</span>`;
    bar.appendChild(a);
  });

  document.body.appendChild(bar);
})();
