<?php
$page_title  = 'Quiz';
$active_page = 'quiz';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>

  <!-- Hero Banner -->
  <section class="section quiz-hero">
    <div class="quiz-hero-text">
      <div class="section-title">Quiz Hub</div>
      <h1 style="font-size:22px;margin-bottom:8px;">[ Test Your Knowledge ]</h1>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.6;max-width:480px;">[ Pick a category below and start a quiz. Track your score, challenge yourself, and explore different topics. ]</p>
    </div>
    <div class="quiz-hero-stats">
      <div class="quiz-stat-box"><span class="quiz-stat-num">[ 6 ]</span><span class="quiz-stat-label">[ Categories ]</span></div>
      <div class="quiz-stat-box"><span class="quiz-stat-num">[ 120 ]</span><span class="quiz-stat-label">[ Questions ]</span></div>
      <div class="quiz-stat-box"><span class="quiz-stat-num">[ 0 ]</span><span class="quiz-stat-label">[ Completed ]</span></div>
    </div>
  </section>

  <!-- Filter -->
  <section class="section">
    <div class="section-title">Categories</div>

    <div class="filter-bar" style="margin-bottom:20px;">
      <button class="filter-btn active" data-filter="all">[ All ]</button>
      <button class="filter-btn" data-filter="tech">[ Tech ]</button>
      <button class="filter-btn" data-filter="science">[ Science ]</button>
      <button class="filter-btn" data-filter="math">[ Math ]</button>
      <button class="filter-btn" data-filter="language">[ Language ]</button>
      <button class="filter-btn" data-filter="general">[ General ]</button>
    </div>

    <!-- Category Cards Grid -->
    <div class="quiz-cat-grid" id="quiz-cat-grid">

      <div class="quiz-cat-card" data-category="tech">
        <div class="quiz-cat-icon">[ 💻 ]</div>
        <div class="quiz-cat-body">
          <div class="quiz-cat-title">[ Web Development ]</div>
          <div class="quiz-cat-meta">[ 20 questions ] · [ Medium ]</div>
          <p class="quiz-cat-desc">[ HTML, CSS, JavaScript, and web fundamentals. ]</p>
          <div class="quiz-cat-tags"><span class="tag">[ Tech ]</span><span class="tag">[ Medium ]</span></div>
        </div>
        <div class="quiz-cat-footer">
          <div class="quiz-cat-progress-wrap"><div class="quiz-cat-progress-bar" style="width:0%"></div></div>
          <span class="quiz-cat-progress-label">[ 0 / 20 ]</span>
          <a href="quiz-play.php?cat=web-dev"><button class="btn primary sm">[ Start Quiz ]</button></a>
        </div>
      </div>

      <div class="quiz-cat-card" data-category="tech">
        <div class="quiz-cat-icon">[ 🐍 ]</div>
        <div class="quiz-cat-body">
          <div class="quiz-cat-title">[ Python Basics ]</div>
          <div class="quiz-cat-meta">[ 15 questions ] · [ Easy ]</div>
          <p class="quiz-cat-desc">[ Variables, loops, functions, and data structures. ]</p>
          <div class="quiz-cat-tags"><span class="tag">[ Tech ]</span><span class="tag">[ Easy ]</span></div>
        </div>
        <div class="quiz-cat-footer">
          <div class="quiz-cat-progress-wrap"><div class="quiz-cat-progress-bar" style="width:40%"></div></div>
          <span class="quiz-cat-progress-label">[ 6 / 15 ]</span>
          <a href="quiz-play.php?cat=python"><button class="btn sm">[ Continue ]</button></a>
        </div>
      </div>

      <div class="quiz-cat-card" data-category="science">
        <div class="quiz-cat-icon">[ 🔬 ]</div>
        <div class="quiz-cat-body">
          <div class="quiz-cat-title">[ Biology ]</div>
          <div class="quiz-cat-meta">[ 25 questions ] · [ Hard ]</div>
          <p class="quiz-cat-desc">[ Cells, genetics, ecosystems, and human biology. ]</p>
          <div class="quiz-cat-tags"><span class="tag">[ Science ]</span><span class="tag">[ Hard ]</span></div>
        </div>
        <div class="quiz-cat-footer">
          <div class="quiz-cat-progress-wrap"><div class="quiz-cat-progress-bar" style="width:0%"></div></div>
          <span class="quiz-cat-progress-label">[ 0 / 25 ]</span>
          <a href="quiz-play.php?cat=biology"><button class="btn primary sm">[ Start Quiz ]</button></a>
        </div>
      </div>

      <div class="quiz-cat-card" data-category="science">
        <div class="quiz-cat-icon">[ ⚗️ ]</div>
        <div class="quiz-cat-body">
          <div class="quiz-cat-title">[ Chemistry ]</div>
          <div class="quiz-cat-meta">[ 20 questions ] · [ Medium ]</div>
          <p class="quiz-cat-desc">[ Periodic table, reactions, and chemical bonds. ]</p>
          <div class="quiz-cat-tags"><span class="tag">[ Science ]</span><span class="tag">[ Medium ]</span></div>
        </div>
        <div class="quiz-cat-footer">
          <div class="quiz-cat-progress-wrap"><div class="quiz-cat-progress-bar" style="width:100%"></div></div>
          <span class="quiz-cat-progress-label">[ ✓ Done ]</span>
          <a href="quiz-play.php?cat=chemistry"><button class="btn sm">[ Retry ]</button></a>
        </div>
      </div>

      <div class="quiz-cat-card" data-category="math">
        <div class="quiz-cat-icon">[ ➗ ]</div>
        <div class="quiz-cat-body">
          <div class="quiz-cat-title">[ Algebra ]</div>
          <div class="quiz-cat-meta">[ 18 questions ] · [ Medium ]</div>
          <p class="quiz-cat-desc">[ Equations, inequalities, and algebraic expressions. ]</p>
          <div class="quiz-cat-tags"><span class="tag">[ Math ]</span><span class="tag">[ Medium ]</span></div>
        </div>
        <div class="quiz-cat-footer">
          <div class="quiz-cat-progress-wrap"><div class="quiz-cat-progress-bar" style="width:0%"></div></div>
          <span class="quiz-cat-progress-label">[ 0 / 18 ]</span>
          <a href="quiz-play.php?cat=algebra"><button class="btn primary sm">[ Start Quiz ]</button></a>
        </div>
      </div>

      <div class="quiz-cat-card" data-category="math">
        <div class="quiz-cat-icon">[ 📐 ]</div>
        <div class="quiz-cat-body">
          <div class="quiz-cat-title">[ Geometry ]</div>
          <div class="quiz-cat-meta">[ 15 questions ] · [ Easy ]</div>
          <p class="quiz-cat-desc">[ Shapes, angles, area, and volume calculations. ]</p>
          <div class="quiz-cat-tags"><span class="tag">[ Math ]</span><span class="tag">[ Easy ]</span></div>
        </div>
        <div class="quiz-cat-footer">
          <div class="quiz-cat-progress-wrap"><div class="quiz-cat-progress-bar" style="width:20%"></div></div>
          <span class="quiz-cat-progress-label">[ 3 / 15 ]</span>
          <a href="quiz-play.php?cat=geometry"><button class="btn sm">[ Continue ]</button></a>
        </div>
      </div>

      <div class="quiz-cat-card" data-category="language">
        <div class="quiz-cat-icon">[ 📖 ]</div>
        <div class="quiz-cat-body">
          <div class="quiz-cat-title">[ English Grammar ]</div>
          <div class="quiz-cat-meta">[ 20 questions ] · [ Easy ]</div>
          <p class="quiz-cat-desc">[ Tenses, punctuation, vocabulary, and sentence structure. ]</p>
          <div class="quiz-cat-tags"><span class="tag">[ Language ]</span><span class="tag">[ Easy ]</span></div>
        </div>
        <div class="quiz-cat-footer">
          <div class="quiz-cat-progress-wrap"><div class="quiz-cat-progress-bar" style="width:0%"></div></div>
          <span class="quiz-cat-progress-label">[ 0 / 20 ]</span>
          <a href="quiz-play.php?cat=grammar"><button class="btn primary sm">[ Start Quiz ]</button></a>
        </div>
      </div>

      <div class="quiz-cat-card" data-category="general">
        <div class="quiz-cat-icon">[ 🌍 ]</div>
        <div class="quiz-cat-body">
          <div class="quiz-cat-title">[ General Knowledge ]</div>
          <div class="quiz-cat-meta">[ 30 questions ] · [ Mixed ]</div>
          <p class="quiz-cat-desc">[ History, geography, culture, and current events. ]</p>
          <div class="quiz-cat-tags"><span class="tag">[ General ]</span><span class="tag">[ Mixed ]</span></div>
        </div>
        <div class="quiz-cat-footer">
          <div class="quiz-cat-progress-wrap"><div class="quiz-cat-progress-bar" style="width:0%"></div></div>
          <span class="quiz-cat-progress-label">[ 0 / 30 ]</span>
          <a href="quiz-play.php?cat=general"><button class="btn primary sm">[ Start Quiz ]</button></a>
        </div>
      </div>

    </div>
  </section>

  <!-- Recent Results -->
  <section class="section">
    <div class="section-title">Recent Results</div>
    <table class="data-table">
      <thead>
        <tr><th>[ Quiz ]</th><th>[ Score ]</th><th>[ Date ]</th><th>[ Action ]</th></tr>
      </thead>
      <tbody>
        <tr><td>[ Chemistry ]</td><td>[ 18 / 20 ]</td><td>[ Jan 5, 2024 ]</td><td><a href="quiz-play.php"><button class="btn sm">[ Retry ]</button></a></td></tr>
        <tr><td>[ Python Basics ]</td><td>[ 6 / 15 — In Progress ]</td><td>[ Jan 3, 2024 ]</td><td><a href="quiz-play.php"><button class="btn sm">[ Continue ]</button></a></td></tr>
        <tr><td>[ Geometry ]</td><td>[ 3 / 15 — In Progress ]</td><td>[ Jan 1, 2024 ]</td><td><a href="quiz-play.php"><button class="btn sm">[ Continue ]</button></a></td></tr>
      </tbody>
    </table>
  </section>

</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
<script>
  // Category filter for quiz cards
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.quiz-cat-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });
</script>
</body>
</html>
