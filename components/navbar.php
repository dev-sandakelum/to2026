<?php
/**
 * Navbar Component
 *
 * Usage: include 'components/navbar.php';
 *
 * Variables (set before including):
 *   $active_page  — one of: 'home', 'works', 'apps', 'notes', 'quiz', 'blog', 'working', 'admin'
 *   $nav_right    — (optional) override the right-slot HTML entirely
 *                   e.g. '<div class="nav-right admin-badge">[ Admin ]</div>'
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

// Bottom tab bar shows 5 primary items (most important)
$tab_bar_links = ['home', 'works', 'apps', 'notes', 'blog'];
?>

<!-- ===== DESKTOP / TABLET NAVBAR ===== -->
<nav class="navbar">

  <!-- Left: Logo -->
  <a href="index.php" class="nav-logo">[ Logo ]</a>

  <!-- Center: Nav links -->
  <ul class="nav-links">
    <?php foreach ($nav_links as $key => $link): ?>
      <li>
        <a href="<?= $link['href'] ?>"<?= $active_page === $key ? ' class="active"' : '' ?>>
          <?= $link['label'] ?>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>

  <!-- Right: actions -->
  <div class="nav-actions">
    <?php if ($nav_right): ?>
      <?= $nav_right ?>
    <?php else: ?>
      <div class="nav-right" data-modal-open="modal-profile">[ Profile ]</div>
    <?php endif; ?>
    <!-- Hamburger — mobile only -->
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
        <a href="<?= $link['href'] ?>"<?= $active_page === $key ? ' class="active"' : '' ?>>
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

<!-- ===== BOTTOM TAB BAR (mobile primary nav) ===== -->
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
  <!-- More → opens drawer -->
  <button class="tab-bar-item nav-toggle" aria-label="More">
    <span class="tab-bar-icon">☰</span>
    <span class="tab-bar-label">More</span>
  </button>
</nav>
