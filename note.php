<?php
$page_title  = 'Note';
$active_page = 'notes';
include 'components/head.php';
?>
<body class="page-note">

<?php include 'components/navbar.php'; ?>

<main>
  <div class="note-layout">

    <!-- Desktop Sidebar TOC -->
    <aside class="note-sidebar">
      <h4>[ Contents ]</h4>
      <a href="#sec1">[ Section 1 ]</a>
      <a href="#sec2">[ Section 2 ]</a>
      <a href="#sec3">[ Section 3 ]</a>
      <a href="#sec4">[ Section 4 ]</a>
      <a href="#sec5">[ Section 5 ]</a>
      <div style="margin-top:16px;">
        <a href="notes.php"><button class="btn sm" style="width:100%;">← [ Back ]</button></a>
      </div>
    </aside>

    <!-- Content -->
    <div class="note-content">
      <div class="section">
        <div class="section-title">Note</div>
        <h2>[ Note Title ]</h2>
        <div class="card-tags" style="margin-bottom:16px;"><span class="tag">[ Tag 1 ]</span><span class="tag">[ Tag 2 ]</span></div>

        <div class="content-block" id="sec1">
          <h3>[ Section 1 Heading ]</h3>
          <p>[ Section 1 content placeholder. This is where the note body text goes. Multiple paragraphs of content describing the topic in detail. ]</p>
        </div>

        <div class="content-block" id="sec2">
          <h3>[ Section 2 Heading ]</h3>
          <p>[ Section 2 content placeholder. More detailed information about this subtopic. Can include lists, code snippets, or other content. ]</p>
        </div>

        <div class="content-block" id="sec3">
          <h3>[ Section 3 Heading ]</h3>
          <p>[ Section 3 content placeholder. Continuing the note with additional context and information. ]</p>
        </div>

        <div class="content-block" id="sec4">
          <h3>[ Section 4 Heading ]</h3>
          <p>[ Section 4 content placeholder. Final thoughts, summary, or additional resources. ]</p>
        </div>

        <div class="content-block" id="sec5">
          <h3>[ Section 5 Heading ]</h3>
          <p>[ Section 5 content placeholder. Additional notes, references, or supplementary material. ]</p>
        </div>
      </div>
    </div>

  </div>
</main>

<!-- Mobile TOC Drawer (right side) -->
<div class="toc-drawer" id="toc-drawer">
  <div class="toc-drawer-overlay" id="toc-overlay"></div>
  <div class="toc-drawer-panel">
    <div class="toc-drawer-header">
      <span class="toc-drawer-title">[ Contents ]</span>
      <button class="toc-drawer-close" id="toc-close" aria-label="Close contents">✕</button>
    </div>
    <nav class="toc-drawer-links">
      <a href="#sec1">[ Section 1 ]</a>
      <a href="#sec2">[ Section 2 ]</a>
      <a href="#sec3">[ Section 3 ]</a>
      <a href="#sec4">[ Section 4 ]</a>
      <a href="#sec5">[ Section 5 ]</a>
    </nav>
    <div class="toc-drawer-footer">
      <a href="notes.php"><button class="btn sm" style="width:100%;">← [ Back to Notes ]</button></a>
    </div>
  </div>
</div>

<!-- Floating TOC trigger (mobile only) -->
<button class="toc-fab" id="toc-fab" aria-label="Open contents">
  <span class="toc-fab-icon">☰</span>
  <span class="toc-fab-label">[ Contents ]</span>
</button>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
<script>
  const tocDrawer  = document.getElementById('toc-drawer');
  const tocOverlay = document.getElementById('toc-overlay');
  const tocClose   = document.getElementById('toc-close');
  const tocFab     = document.getElementById('toc-fab');

  function openToc() {
    tocDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeToc() {
    tocDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  tocFab.addEventListener('click', openToc);
  tocClose.addEventListener('click', closeToc);
  tocOverlay.addEventListener('click', closeToc);

  // close on link tap so user lands on section
  document.querySelectorAll('.toc-drawer-links a').forEach(a => {
    a.addEventListener('click', closeToc);
  });
</script>
</body>
</html>
