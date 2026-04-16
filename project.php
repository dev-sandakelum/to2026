<?php
$page_title  = 'Project';
$active_page = 'works';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>

  <!-- Hero Image -->
  <section class="section" style="padding:0;overflow:hidden;margin-bottom:24px;">
    <div class="placeholder-img xl" style="border:none;border-radius:4px;">[ Hero Project Image ]</div>
  </section>

  <!-- Title + Intro -->
  <section class="section">
    <div class="section-title">Project</div>
    <h1 style="font-size:22px;margin-bottom:8px;">[ Project Title ]</h1>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;line-height:1.6;">[ Short intro paragraph about the project. What it is, who it's for, and why it was built. ]</p>
    <div class="card-tags">
      <span class="tag">[ Tag 1 ]</span>
      <span class="tag">[ Tag 2 ]</span>
      <span class="tag">[ Tag 3 ]</span>
    </div>
  </section>

  <!-- Problem / Solution / Result -->
  <div class="project-blocks">
    <div class="project-block">
      <h3>Problem</h3>
      <p>[ Describe the problem this project solves. What was the challenge or pain point? ]</p>
    </div>
    <div class="project-block">
      <h3>Solution</h3>
      <p>[ Describe the approach taken. How was the problem addressed? What decisions were made? ]</p>
    </div>
    <div class="project-block">
      <h3>Result</h3>
      <p>[ Describe the outcome. What was achieved? Any metrics or impact? ]</p>
    </div>
  </div>

  <!-- Gallery -->
  <section class="section">
    <div class="section-title">Gallery</div>
    <div class="gallery-grid">
      <div class="placeholder-img md">[ Screenshot 1 ]</div>
      <div class="placeholder-img md">[ Screenshot 2 ]</div>
      <div class="placeholder-img md">[ Screenshot 3 ]</div>
      <div class="placeholder-img md">[ Screenshot 4 ]</div>
      <div class="placeholder-img md">[ Screenshot 5 ]</div>
      <div class="placeholder-img md">[ Screenshot 6 ]</div>
    </div>
  </section>

  <div style="margin-top:8px;">
    <a href="works.php"><button class="btn">← [ Back to Works ]</button></a>
  </div>

</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
</body>
</html>
