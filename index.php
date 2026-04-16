<?php
$page_title  = 'Home';
$active_page = 'home';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>

  <!-- HERO -->
  <section class="section">
    <div class="section-title">Hero</div>
    <div class="hero-grid">
      <div class="hero-text">
        <h1>[ Full Name ]</h1>
        <div class="role">[ Role / Title ]</div>
        <p class="bio">[ Short bio placeholder. A few sentences describing who you are, what you do, and what you're passionate about. ]</p>
        <div class="hero-btns">
          <button class="btn primary">[ View Work ]</button>
          <button class="btn">[ Contact Me ]</button>
        </div>
      </div>
      <div class="placeholder-img xl">[ Profile Image ]</div>
    </div>
  </section>

  <!-- SKILLS -->
  <section class="section">
    <div class="section-title">Skills</div>
    <div class="skills-grid">
      <div class="skill-item">[ Skill 1 ]</div>
      <div class="skill-item">[ Skill 2 ]</div>
      <div class="skill-item">[ Skill 3 ]</div>
      <div class="skill-item">[ Skill 4 ]</div>
      <div class="skill-item">[ Skill 5 ]</div>
      <div class="skill-item">[ Skill 6 ]</div>
      <div class="skill-item">[ Skill 7 ]</div>
      <div class="skill-item">[ Skill 8 ]</div>
      <div class="skill-item">[ Skill 9 ]</div>
      <div class="skill-item">[ Skill 10 ]</div>
      <div class="skill-item">[ Skill 11 ]</div>
      <div class="skill-item">[ Skill 12 ]</div>
    </div>
  </section>

  <!-- FEATURED PROJECTS -->
  <section class="section">
    <div class="section-title">Featured Projects</div>
    <div class="cards-grid">
      <div class="card" data-category="web">
        <div class="placeholder-img md">[ Project Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short project description placeholder text. ]</p>
          <div class="card-tags"><span class="tag">[ Tag ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View Project ]</button></a>
        </div>
      </div>
      <div class="card" data-category="app">
        <div class="placeholder-img md">[ Project Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short project description placeholder text. ]</p>
          <div class="card-tags"><span class="tag">[ Tag ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View Project ]</button></a>
        </div>
      </div>
      <div class="card" data-category="design">
        <div class="placeholder-img md">[ Project Image ]</div>
        <div class="card-body">
          <div class="card-title">[ Project Title ]</div>
          <p class="card-text">[ Short project description placeholder text. ]</p>
          <div class="card-tags"><span class="tag">[ Tag ]</span><span class="tag">[ Tag ]</span></div>
          <a href="project.php"><button class="btn sm">[ View Project ]</button></a>
        </div>
      </div>
    </div>
  </section>

  <!-- EXPERIENCE TIMELINE -->
  <section class="section">
    <div class="section-title">Experience</div>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-date">[ 2023 — Present ]</div>
        <div class="timeline-title">[ Job Title ]</div>
        <div class="timeline-sub">[ Company Name ] · [ Location ]</div>
      </div>
      <div class="timeline-item">
        <div class="timeline-date">[ 2021 — 2023 ]</div>
        <div class="timeline-title">[ Job Title ]</div>
        <div class="timeline-sub">[ Company Name ] · [ Location ]</div>
      </div>
      <div class="timeline-item">
        <div class="timeline-date">[ 2019 — 2021 ]</div>
        <div class="timeline-title">[ Job Title ]</div>
        <div class="timeline-sub">[ Company Name ] · [ Location ]</div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="section">
    <div class="section-title">Contact</div>
    <div style="max-width: 480px;">
      <div class="form-group">
        <label>[ Name ]</label>
        <input type="text" placeholder="[ Your name ]" />
      </div>
      <div class="form-group">
        <label>[ Email ]</label>
        <input type="email" placeholder="[ Your email ]" />
      </div>
      <div class="form-group">
        <label>[ Message ]</label>
        <textarea rows="4" placeholder="[ Your message ]"></textarea>
      </div>
      <button class="btn primary">[ Send Message ]</button>
    </div>
  </section>

</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
</body>
</html>
