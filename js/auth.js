/* ================================================================
   AUTH.JS  —  Optional user login system (UI only, localStorage)
   ================================================================ */
(function () {

  const STORAGE_KEY = 'auth_user';

  // ── State ──────────────────────────────────────────────────────
  const Auth = {
    user: null,

    load() {
      try { this.user = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { this.user = null; }
    },

    save() {
      if (this.user) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
      else localStorage.removeItem(STORAGE_KEY);
    },

    login(name, email) {
      this.user = { name, email, avatar: name.charAt(0).toUpperCase(), joinedAt: new Date().toISOString() };
      this.save();
      this._emit('login');
    },

    logout() {
      this.user = null;
      this.save();
      this._emit('logout');
    },

    isLoggedIn() { return !!this.user; },

    _listeners: {},
    on(event, fn) { (this._listeners[event] = this._listeners[event] || []).push(fn); },
    _emit(event) { (this._listeners[event] || []).forEach(fn => fn(this.user)); },
  };

  Auth.load();
  window.Auth = Auth; // expose globally

  // ── Inject HTML ────────────────────────────────────────────────
  const html = `
<!-- AUTH MODALS -->
<div class="modal-overlay" id="modal-auth">
  <div class="modal-box auth-modal-box">

    <!-- Login view -->
    <div class="auth-view" id="auth-view-login">
      <div class="modal-header">
        <strong>Sign in</strong>
        <button class="modal-close" data-close="modal-auth">✕</button>
      </div>
      <p class="auth-sub">Sign in to save quiz progress, react to posts, and more.</p>
      <div class="form-group"><label>Name</label><input id="auth-login-name" type="text" placeholder="Your name" autocomplete="name" /></div>
      <div class="form-group"><label>Email</label><input id="auth-login-email" type="email" placeholder="you@example.com" autocomplete="email" /></div>
      <div class="auth-error" id="auth-login-error"></div>
      <button class="btn primary" style="width:100%;justify-content:center;" id="auth-login-submit">Sign in</button>
      <div class="auth-divider"><span>or</span></div>
      <button class="btn" style="width:100%;justify-content:center;" id="auth-guest-btn">Continue as guest</button>
      <p class="auth-switch">Don't have an account? <button class="auth-link" id="auth-goto-signup">Sign up</button></p>
    </div>

    <!-- Signup view -->
    <div class="auth-view" id="auth-view-signup" style="display:none;">
      <div class="modal-header">
        <strong>Create account</strong>
        <button class="modal-close" data-close="modal-auth">✕</button>
      </div>
      <p class="auth-sub">Free account — no password needed for this demo.</p>
      <div class="form-group"><label>Name</label><input id="auth-signup-name" type="text" placeholder="Your name" autocomplete="name" /></div>
      <div class="form-group"><label>Email</label><input id="auth-signup-email" type="email" placeholder="you@example.com" autocomplete="email" /></div>
      <div class="auth-error" id="auth-signup-error"></div>
      <button class="btn primary" style="width:100%;justify-content:center;" id="auth-signup-submit">Create account</button>
      <p class="auth-switch">Already have one? <button class="auth-link" id="auth-goto-login">Sign in</button></p>
    </div>

  </div>
</div>

<!-- PROFILE DROPDOWN -->
<div class="auth-profile-dropdown" id="auth-profile-dropdown">
  <div class="auth-profile-info">
    <div class="auth-avatar-lg" id="auth-dropdown-avatar"></div>
    <div>
      <div class="auth-dropdown-name" id="auth-dropdown-name"></div>
      <div class="auth-dropdown-email" id="auth-dropdown-email"></div>
    </div>
  </div>
  <div class="auth-dropdown-divider"></div>
  <a href="admin.html" class="auth-dropdown-item">⚙ Admin Panel</a>
  <button class="auth-dropdown-item auth-dropdown-logout" id="auth-logout-btn">↩ Sign out</button>
</div>
<div class="auth-dropdown-overlay" id="auth-dropdown-overlay"></div>

<!-- AUTH GATE PROMPT (shown inline when login needed) -->
<div class="auth-gate-toast" id="auth-gate-toast">
  <span id="auth-gate-msg">Sign in to use this feature</span>
  <button class="btn sm primary" id="auth-gate-login-btn">Sign in</button>
  <button class="auth-gate-close" id="auth-gate-close">✕</button>
</div>`;

  document.body.insertAdjacentHTML('beforeend', html);

  // ── Nav button ─────────────────────────────────────────────────
  // Replace every .nav-right and .nav-drawer-profile with auth-aware buttons
  function buildNavBtn() {
    document.querySelectorAll('.nav-right[data-modal-open="modal-profile"]').forEach(el => {
      el.removeAttribute('data-modal-open');
      el.id = 'auth-nav-btn';
      el.addEventListener('click', handleNavBtnClick);
    });
    document.querySelectorAll('.nav-drawer-profile[data-modal-open="modal-profile"]').forEach(el => {
      el.removeAttribute('data-modal-open');
      el.id = 'auth-drawer-btn';
      el.addEventListener('click', handleNavBtnClick);
    });
  }

  function handleNavBtnClick(e) {
    e.stopPropagation();
    if (Auth.isLoggedIn()) toggleDropdown();
    else openAuthModal('login');
  }

  // ── Render nav button label ────────────────────────────────────
  function renderNavBtn() {
    const btn = document.getElementById('auth-nav-btn');
    const drawerBtn = document.getElementById('auth-drawer-btn');
    if (Auth.isLoggedIn()) {
      const u = Auth.user;
      if (btn) {
        btn.innerHTML = `<span class="auth-avatar">${u.avatar}</span><span>${u.name.split(' ')[0]}</span>`;
        btn.classList.add('auth-logged-in');
      }
      if (drawerBtn) {
        drawerBtn.innerHTML = `<span class="auth-avatar">${u.avatar}</span> ${u.name}`;
        drawerBtn.classList.add('auth-logged-in');
      }
      // dropdown info
      const da = document.getElementById('auth-dropdown-avatar');
      const dn = document.getElementById('auth-dropdown-name');
      const de = document.getElementById('auth-dropdown-email');
      if (da) da.textContent = u.avatar;
      if (dn) dn.textContent = u.name;
      if (de) de.textContent = u.email;
    } else {
      if (btn) { btn.innerHTML = '[ Sign in ]'; btn.classList.remove('auth-logged-in'); }
      if (drawerBtn) { drawerBtn.innerHTML = '[ Sign in / Guest ]'; drawerBtn.classList.remove('auth-logged-in'); }
    }
  }

  // ── Auth modal ─────────────────────────────────────────────────
  function openAuthModal(view = 'login') {
    showView(view);
    document.getElementById('modal-auth').classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const inp = document.getElementById(view === 'login' ? 'auth-login-name' : 'auth-signup-name');
      inp && inp.focus();
    }, 120);
  }

  function closeAuthModal() {
    document.getElementById('modal-auth').classList.remove('open');
    document.body.style.overflow = '';
    clearErrors();
  }

  function showView(v) {
    document.getElementById('auth-view-login').style.display  = v === 'login'  ? '' : 'none';
    document.getElementById('auth-view-signup').style.display = v === 'signup' ? '' : 'none';
  }

  function clearErrors() {
    ['auth-login-error','auth-signup-error'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  function validate(name, email, errId) {
    const el = document.getElementById(errId);
    if (!name.trim()) { el.textContent = 'Name is required.'; return false; }
    if (!email.trim() || !email.includes('@')) { el.textContent = 'Enter a valid email.'; return false; }
    el.textContent = '';
    return true;
  }

  // Login submit
  document.getElementById('auth-login-submit').addEventListener('click', () => {
    const name  = document.getElementById('auth-login-name').value;
    const email = document.getElementById('auth-login-email').value;
    if (!validate(name, email, 'auth-login-error')) return;
    Auth.login(name, email);
    closeAuthModal();
  });

  // Signup submit
  document.getElementById('auth-signup-submit').addEventListener('click', () => {
    const name  = document.getElementById('auth-signup-name').value;
    const email = document.getElementById('auth-signup-email').value;
    if (!validate(name, email, 'auth-signup-error')) return;
    Auth.login(name, email);
    closeAuthModal();
  });

  // Guest
  document.getElementById('auth-guest-btn').addEventListener('click', () => {
    Auth.login('Guest', 'guest@local');
    closeAuthModal();
  });

  // Switch views
  document.getElementById('auth-goto-signup').addEventListener('click', () => showView('signup'));
  document.getElementById('auth-goto-login').addEventListener('click',  () => showView('login'));

  // Close buttons
  document.querySelectorAll('[data-close="modal-auth"]').forEach(b => b.addEventListener('click', closeAuthModal));
  document.getElementById('modal-auth').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-auth')) closeAuthModal();
  });

  // Enter key
  ['auth-login-name','auth-login-email'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('auth-login-submit').click();
    });
  });
  ['auth-signup-name','auth-signup-email'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('auth-signup-submit').click();
    });
  });

  // ── Profile dropdown ───────────────────────────────────────────
  function toggleDropdown() {
    const dd = document.getElementById('auth-profile-dropdown');
    const ov = document.getElementById('auth-dropdown-overlay');
    const btn = document.getElementById('auth-nav-btn');
    const isOpen = dd.classList.contains('open');
    if (isOpen) { closeDropdown(); return; }

    // Position below nav button
    if (btn) {
      const r = btn.getBoundingClientRect();
      dd.style.top  = (r.bottom + 8) + 'px';
      dd.style.right = (window.innerWidth - r.right) + 'px';
    }
    dd.classList.add('open');
    ov.classList.add('open');
  }

  function closeDropdown() {
    document.getElementById('auth-profile-dropdown').classList.remove('open');
    document.getElementById('auth-dropdown-overlay').classList.remove('open');
  }

  document.getElementById('auth-dropdown-overlay').addEventListener('click', closeDropdown);
  document.getElementById('auth-logout-btn').addEventListener('click', () => {
    Auth.logout();
    closeDropdown();
  });

  // ── Auth gate toast ────────────────────────────────────────────
  window.showAuthGate = function (msg = 'Sign in to use this feature') {
    const toast = document.getElementById('auth-gate-toast');
    document.getElementById('auth-gate-msg').textContent = msg;
    toast.classList.add('show');
  };

  document.getElementById('auth-gate-close').addEventListener('click', () => {
    document.getElementById('auth-gate-toast').classList.remove('show');
  });

  document.getElementById('auth-gate-login-btn').addEventListener('click', () => {
    document.getElementById('auth-gate-toast').classList.remove('show');
    openAuthModal('login');
  });

  // ── React buttons (blog cards & post page) ─────────────────────
  function initReactions() {
    document.querySelectorAll('.react-btn').forEach(btn => {
      const postId = btn.closest('[data-post-id]')?.dataset.postId || 'post';
      const type   = btn.dataset.react;
      const key    = `react_${postId}_${type}`;

      // restore state
      if (localStorage.getItem(key) === '1') btn.classList.add('reacted');
      updateReactCount(btn);

      btn.addEventListener('click', () => {
        if (!Auth.isLoggedIn()) {
          showAuthGate('Sign in to react to posts');
          return;
        }
        const reacted = btn.classList.toggle('reacted');
        localStorage.setItem(key, reacted ? '1' : '0');
        updateReactCount(btn);
      });
    });
  }

  function updateReactCount(btn) {
    const countEl = btn.querySelector('.react-count');
    if (!countEl) return;
    const base = parseInt(btn.dataset.baseCount || '0', 10);
    const extra = btn.classList.contains('reacted') ? 1 : 0;
    countEl.textContent = base + extra;
  }

  // ── Quiz resume/pause gate ─────────────────────────────────────
  window.requireAuthForQuiz = function (action) {
    if (Auth.isLoggedIn()) return true;
    showAuthGate(`Sign in to ${action} quiz progress`);
    return false;
  };

  // ── React to auth state changes ────────────────────────────────
  Auth.on('login',  () => { renderNavBtn(); initReactions(); });
  Auth.on('logout', () => { renderNavBtn(); initReactions(); });

  // ── Init ───────────────────────────────────────────────────────
  buildNavBtn();
  renderNavBtn();
  initReactions();

  // expose openAuthModal globally for other scripts
  window.openAuthModal = openAuthModal;

})();
