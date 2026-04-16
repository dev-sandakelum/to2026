<?php
$page_title  = 'Notes';
$active_page = 'notes';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>
  <section class="section">
    <div class="section-title">Notes</div>

    <!-- Search -->
    <div class="search-bar">
      <input type="text" placeholder="[ Search notes... ]" />
      <button class="btn">[ Search ]</button>
    </div>

    <!-- Filter -->
    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">[ All ]</button>
      <button class="filter-btn" data-filter="dev">[ Dev ]</button>
      <button class="filter-btn" data-filter="design">[ Design ]</button>
      <button class="filter-btn" data-filter="ideas">[ Ideas ]</button>
    </div>

    <!-- Notes List -->
    <div class="notes-list">
      <a href="note.php" style="text-decoration:none;">
        <div class="note-card" data-category="dev">
          <div class="note-card-title">[ Note Title 1 ]</div>
          <div class="card-tags" style="margin:6px 0;"><span class="tag">[ Dev ]</span><span class="tag">[ Tag ]</span></div>
          <div class="note-card-preview">[ Short preview of the note content. First few lines of the note... ]</div>
        </div>
      </a>
      <a href="note.php" style="text-decoration:none;">
        <div class="note-card" data-category="design">
          <div class="note-card-title">[ Note Title 2 ]</div>
          <div class="card-tags" style="margin:6px 0;"><span class="tag">[ Design ]</span><span class="tag">[ Tag ]</span></div>
          <div class="note-card-preview">[ Short preview of the note content. First few lines of the note... ]</div>
        </div>
      </a>
      <a href="note.php" style="text-decoration:none;">
        <div class="note-card" data-category="ideas">
          <div class="note-card-title">[ Note Title 3 ]</div>
          <div class="card-tags" style="margin:6px 0;"><span class="tag">[ Ideas ]</span><span class="tag">[ Tag ]</span></div>
          <div class="note-card-preview">[ Short preview of the note content. First few lines of the note... ]</div>
        </div>
      </a>
      <a href="note.php" style="text-decoration:none;">
        <div class="note-card" data-category="dev">
          <div class="note-card-title">[ Note Title 4 ]</div>
          <div class="card-tags" style="margin:6px 0;"><span class="tag">[ Dev ]</span></div>
          <div class="note-card-preview">[ Short preview of the note content. First few lines of the note... ]</div>
        </div>
      </a>
      <a href="note.php" style="text-decoration:none;">
        <div class="note-card" data-category="design">
          <div class="note-card-title">[ Note Title 5 ]</div>
          <div class="card-tags" style="margin:6px 0;"><span class="tag">[ Design ]</span></div>
          <div class="note-card-preview">[ Short preview of the note content. First few lines of the note... ]</div>
        </div>
      </a>
    </div>
  </section>
</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
</body>
</html>
