/* ===== SETTINGS PANEL ===== */
(function () {

  // --- Inject panel HTML into body ---
  const panelHTML = `
<div class="settings-overlay" id="settings-overlay">
  <div class="settings-panel" id="settings-panel" role="dialog" aria-label="Settings">

    <div class="sp-header">
      <span class="sp-title">Settings</span>
      <button class="sp-close" id="sp-close" aria-label="Close settings">✕</button>
    </div>

    <div class="sp-body">

      <!-- THEME -->
      <div class="sp-group">
        <div class="sp-group-label">Theme</div>
        <div class="sp-theme-grid">
          <button class="sp-theme-btn" data-theme="light">
            <span class="sp-theme-preview light-preview"></span>
            <span class="sp-theme-name">Light</span>
          </button>
          <button class="sp-theme-btn" data-theme="dark">
            <span class="sp-theme-preview dark-preview"></span>
            <span class="sp-theme-name">Dark</span>
          </button>
          <button class="sp-theme-btn" data-theme="contrast">
            <span class="sp-theme-preview contrast-preview"></span>
            <span class="sp-theme-name">Contrast</span>
          </button>
        </div>
      </div>

      <!-- FONT -->
      <div class="sp-group">
        <div class="sp-group-label">Font</div>
        <div class="sp-font-list">
          <button class="sp-font-btn" data-font="inter">
            <span class="sp-font-sample" style="font-family:'Inter',sans-serif;">Aa</span>
            <span class="sp-font-name">Inter <span class="sp-font-sub">Default</span></span>
          </button>
          <button class="sp-font-btn" data-font="times">
            <span class="sp-font-sample" style="font-family:'Times New Roman',serif;">Aa</span>
            <span class="sp-font-name">Times New Roman <span class="sp-font-sub">Serif</span></span>
          </button>
          <button class="sp-font-btn" data-font="comic">
            <span class="sp-font-sample" style="font-family:'Comic Sans MS',cursive;">Aa</span>
            <span class="sp-font-name">Comic Sans MS <span class="sp-font-sub">Casual</span></span>
          </button>
        </div>
      </div>

      <!-- ACCENT COLOR -->
      <div class="sp-group">
        <div class="sp-group-label">Accent Color</div>
        <div class="sp-color-grid">
          <button class="sp-color-btn" data-color="blue"   style="--c:#2563EB;" title="Blue"></button>
          <button class="sp-color-btn" data-color="violet" style="--c:#7C3AED;" title="Violet"></button>
          <button class="sp-color-btn" data-color="rose"   style="--c:#E11D48;" title="Rose"></button>
          <button class="sp-color-btn" data-color="emerald"style="--c:#059669;" title="Emerald"></button>
          <button class="sp-color-btn" data-color="amber"  style="--c:#D97706;" title="Amber"></button>
          <button class="sp-color-btn" data-color="slate"  style="--c:#475569;" title="Slate"></button>
        </div>
      </div>

      <!-- FONT SIZE -->
      <div class="sp-group">
        <div class="sp-group-label">Font Size</div>
        <div class="sp-size-row">
          <button class="sp-size-btn" data-size="sm">A<small>sm</small></button>
          <button class="sp-size-btn" data-size="md">A<small>md</small></button>
          <button class="sp-size-btn" data-size="lg">A<small>lg</small></button>
        </div>
      </div>

    </div>

    <div class="sp-footer">
      <button class="sp-reset" id="sp-reset">Reset to defaults</button>
    </div>

  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', panelHTML);

  // --- Wire settings button (already in navbar HTML) ---
  // No injection needed — button is rendered by components/navbar.php

  // Also add to mobile drawer footer
  const drawerFooter = document.querySelector('.nav-drawer-footer');
  if (drawerFooter) {
    const drawerSettingsBtn = document.createElement('button');
    drawerSettingsBtn.className = 'nav-drawer-profile';
    drawerSettingsBtn.style.marginTop = '8px';
    drawerSettingsBtn.id = 'drawer-settings-btn';
    drawerSettingsBtn.textContent = '⚙ Settings';
    drawerFooter.appendChild(drawerSettingsBtn);
    drawerSettingsBtn.addEventListener('click', openPanel);
  }

  // --- State ---
  const DEFAULTS = { theme: 'light', font: 'inter', color: 'blue', size: 'md' };
  const STORAGE_KEY = 'site-settings';

  const FONTS = {
    inter:  "'Inter', system-ui, -apple-system, sans-serif",
    times:  "'Times New Roman', Times, serif",
    comic:  "'Comic Sans MS', 'Comic Sans', cursive"
  };

  const COLORS = {
    blue:    { accent: '#2563EB', dark: '#1D4ED8', light: '#EFF6FF', mid: '#BFDBFE' },
    violet:  { accent: '#7C3AED', dark: '#6D28D9', light: '#F5F3FF', mid: '#DDD6FE' },
    rose:    { accent: '#E11D48', dark: '#BE123C', light: '#FFF1F2', mid: '#FECDD3' },
    emerald: { accent: '#059669', dark: '#047857', light: '#ECFDF5', mid: '#A7F3D0' },
    amber:   { accent: '#D97706', dark: '#B45309', light: '#FFFBEB', mid: '#FDE68A' },
    slate:   { accent: '#475569', dark: '#334155', light: '#F8FAFC', mid: '#CBD5E1' },
  };

  const SIZES = { sm: '13px', md: '15px', lg: '17px' };

  // --- Load saved settings ---
  function loadSettings() {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
    catch { return { ...DEFAULTS }; }
  }

  function saveSettings(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  // --- Apply settings to DOM ---
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function applyFont(font) {
    document.documentElement.style.setProperty('--font-body', FONTS[font] || FONTS.inter);
    document.body.style.fontFamily = FONTS[font] || FONTS.inter;
  }

  function applyColor(color) {
    const c = COLORS[color] || COLORS.blue;
    const root = document.documentElement;
    root.style.setProperty('--accent',       c.accent);
    root.style.setProperty('--accent-dark',  c.dark);
    root.style.setProperty('--accent-light', c.light);
    root.style.setProperty('--accent-mid',   c.mid);
  }

  function applySize(size) {
    document.documentElement.style.setProperty('--base-font-size', SIZES[size] || SIZES.md);
    document.body.style.fontSize = SIZES[size] || SIZES.md;
  }

  function applyAll(s) {
    applyTheme(s.theme);
    applyFont(s.font);
    applyColor(s.color);
    applySize(s.size);
  }

  // --- Sync UI buttons to current state ---
  function syncUI(s) {
    document.querySelectorAll('.sp-theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === s.theme));
    document.querySelectorAll('.sp-font-btn').forEach(b => b.classList.toggle('active', b.dataset.font === s.font));
    document.querySelectorAll('.sp-color-btn').forEach(b => b.classList.toggle('active', b.dataset.color === s.color));
    document.querySelectorAll('.sp-size-btn').forEach(b => b.classList.toggle('active', b.dataset.size === s.size));
  }

  // --- Panel open/close ---
  const overlay = document.getElementById('settings-overlay');

  function openPanel() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    syncUI(loadSettings());
  }

  function closePanel() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('nav-settings-btn')?.addEventListener('click', openPanel);
  document.getElementById('sp-close').addEventListener('click', closePanel);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePanel(); });

  // --- Button interactions ---
  document.querySelectorAll('.sp-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = loadSettings();
      s.theme = btn.dataset.theme;
      saveSettings(s);
      applyTheme(s.theme);
      syncUI(s);
    });
  });

  document.querySelectorAll('.sp-font-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = loadSettings();
      s.font = btn.dataset.font;
      saveSettings(s);
      applyFont(s.font);
      syncUI(s);
    });
  });

  document.querySelectorAll('.sp-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = loadSettings();
      s.color = btn.dataset.color;
      saveSettings(s);
      applyColor(s.color);
      syncUI(s);
    });
  });

  document.querySelectorAll('.sp-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = loadSettings();
      s.size = btn.dataset.size;
      saveSettings(s);
      applySize(s.size);
      syncUI(s);
    });
  });

  document.getElementById('sp-reset').addEventListener('click', () => {
    saveSettings({ ...DEFAULTS });
    applyAll(DEFAULTS);
    syncUI(DEFAULTS);
  });

  // --- Init on page load ---
  const initial = loadSettings();
  applyAll(initial);

})();
