<?php
/**
 * Navbar Component
 *
 * Variables (set before including):
 *   $active_page — 'home' | 'works' | 'apps' | 'notes' | 'quiz' | 'blog' | 'working' | 'admin'
 *   $nav_right   — (optional) override the sign-in slot HTML
 */

$active_page = $active_page ?? '';
$nav_right   = $nav_right   ?? null;

$nav_links = [
  'home'    => ['href' => 'index.php',   'label' => 'Home',    'icon' => '🏠'],
  'works'   => ['href' => 'works.php',   'label' => 'Works',   'icon' => '🗂️'],
  'apps'    => ['href' => 'apps.php',    'label' => 'Apps',    'icon' => '🧩'],
  'notes'   => ['href' => 'notes.php',   'label' => 'Notes',   'icon' => '📝'],
  'quiz'    => ['href' => 'quiz.php',    'label' => 'Quiz',    'icon' => '🧠'],
  'blog'    => ['href' => 'blog.php',    'label' => 'Blog',    'icon' => '✍️'],
  'working' => ['href' => 'working.php', 'label' => 'Working', 'icon' => '⚡'],
];

$tab_bar_links = ['home', 'works', 'apps', 'notes', 'blog'];

$settings_icon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
?>

<!-- ===== NAVBAR ===== -->
<nav class="navbar">

  <!-- LEFT: Logo -->
  <a href="index.php" class="nav-logo">[ Logo ]</a>

  <!-- CENTER: Desktop nav links -->
  <ul class="nav-links">
    <?php foreach ($nav_links as $key => $link): ?>
      <li>
        <a href="<?= $link['href'] ?>"
           <?= $active_page === $key ? 'class="active"' : '' ?>>
          <?= $link['label'] ?>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>

  <!-- RIGHT: Settings · Sign-in · Divider · Hamburger -->
  <div class="nav-actions">

    <!-- Settings (desktop + mobile) -->
    <button class="nav-icon-btn" id="nav-settings-btn" aria-label="Settings">
      <?= $settings_icon ?>
    </button>

    <!-- Sign-in / Profile (desktop + mobile) -->
    <?php if ($nav_right): ?>
      <?= $nav_right ?>
    <?php else: ?>
      <div class="nav-right" data-modal-open="modal-profile">Sign in</div>
    <?php endif; ?>

    <!-- Divider + Hamburger (mobile only) -->
    <div class="nav-divider"></div>
    <button class="nav-toggle" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>

  </div>

</nav>

<!-- ===== MOBILE SIDE DRAWER ===== -->
<div class="nav-drawer">
  <div class="nav-drawer-overlay"></div>
  <div class="nav-drawer-panel">

    <div class="nav-drawer-header">
      <a href="index.php" class="nav-drawer-logo">[ Logo ]</a>
      <button class="nav-drawer-close" aria-label="Close menu">✕</button>
    </div>

    <nav class="nav-drawer-links">
      <?php foreach ($nav_links as $key => $link): ?>
        <a href="<?= $link['href'] ?>"
           <?= $active_page === $key ? 'class="active"' : '' ?>>
          <span class="nav-drawer-icon"><?= $link['icon'] ?></span>
          <?= $link['label'] ?>
        </a>
      <?php endforeach; ?>
    </nav>

    <div class="nav-drawer-footer">
      <?php if ($active_page === 'admin'): ?>
        <button class="nav-drawer-profile admin-badge">⚙ Admin Panel</button>
      <?php else: ?>
        <button class="nav-drawer-profile" data-modal-open="modal-profile">[ Profile / Admin ]</button>
      <?php endif; ?>
    </div>

  </div>
</div>

<!-- ===== BOTTOM TAB BAR (mobile) ===== -->
<nav class="bottom-tab-bar" aria-label="Primary navigation">
  <?php foreach ($tab_bar_links as $key):
    $link = $nav_links[$key]; ?>
    <a href="<?= $link['href'] ?>"
       class="tab-bar-item<?= $active_page === $key ? ' active' : '' ?>"
       aria-label="<?= $link['label'] ?>">
      <span class="tab-bar-icon"><?= $link['icon'] ?></span>
      <span class="tab-bar-label"><?= $link['label'] ?></span>
    </a>
  <?php endforeach; ?>
  <button class="tab-bar-item nav-toggle" aria-label="More">
    <span class="tab-bar-icon">☰</span>
    <span class="tab-bar-label">More</span>
  </button>
</nav>
