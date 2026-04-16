<?php
$page_title  = 'Works';
$active_page = 'works';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>
  <section class="section">
    <div class="section-title">Works</div>

    <!-- Filter Bar -->
    <div class="filter-bar" data-target=".cards-grid">
      <button class="filter-btn active" data-filter="all">[ All ]</button>
      <button class="filter-btn" data-filter="web">[ Web ]</button>
      <button class="filter-btn" data-filter="app">[ App ]</button>
      <button class="filter-btn" data-filter="design">[ Design ]</button>
      <button class="filter-btn" data-filter="other">[ Other ]</button>
    </div>

    <!-- Cards Grid -->
    <div class="cards-grid">
      <div class="card" data-category="web">
        <div class="placeholder-img md">[ Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short description of the project. ]</p>
          <div class="card-tags"><span class="tag">[ Web ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View ]</button></a>
        </div>
      </div>
      <div class="card" data-category="app">
        <div class="placeholder-img md">[ Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short description of the project. ]</p>
          <div class="card-tags"><span class="tag">[ App ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View ]</button></a>
        </div>
      </div>
      <div class="card" data-category="design">
        <div class="placeholder-img md">[ Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short description of the project. ]</p>
          <div class="card-tags"><span class="tag">[ Design ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View ]</button></a>
        </div>
      </div>
      <div class="card" data-category="web">
        <div class="placeholder-img md">[ Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short description of the project. ]</p>
          <div class="card-tags"><span class="tag">[ Web ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View ]</button></a>
        </div>
      </div>
      <div class="card" data-category="other">
        <div class="placeholder-img md">[ Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short description of the project. ]</p>
          <div class="card-tags"><span class="tag">[ Other ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View ]</button></a>
        </div>
      </div>
      <div class="card" data-category="app">
        <div class="placeholder-img md">[ Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short description of the project. ]</p>
          <div class="card-tags"><span class="tag">[ App ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View ]</button></a>
        </div>
      </div>
    </div>
  </section>
</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
</body>
</html>
