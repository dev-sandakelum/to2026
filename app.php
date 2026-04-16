<?php
$page_title  = 'App';
$active_page = 'apps';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>

  <section class="section">
    <div class="section-title">App</div>
    <h1 style="font-size:20px;margin-bottom:6px;">[ App Title ]</h1>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">[ Description of what this app does and how to use it. ]</p>

    <div class="app-container">
      <div class="app-inputs">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;color:var(--text-muted);">[ Input ]</div>
        <div class="form-group">
          <label>[ Field 1 ]</label>
          <input type="text" placeholder="[ Enter value ]" />
        </div>
        <div class="form-group">
          <label>[ Field 2 ]</label>
          <input type="text" placeholder="[ Enter value ]" />
        </div>
        <div class="form-group">
          <label>[ Field 3 ]</label>
          <input type="text" placeholder="[ Enter value ]" />
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button class="btn primary">[ Run ]</button>
          <button class="btn">[ Reset ]</button>
        </div>
      </div>

      <div class="app-output">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;color:var(--text-muted);">[ Output ]</div>
        <div class="app-output-box">[ Result will appear here ]</div>
        <div style="margin-top:12px;font-size:12px;color:var(--text-muted);">[ Additional output info or logs ]</div>
      </div>
    </div>
  </section>

  <!-- Tabs -->
  <section class="section">
    <div class="section-title">Details</div>
    <div class="tabs">
      <div class="tab-list">
        <button class="tab-btn active" data-tab="how">[ How to Use ]</button>
        <button class="tab-btn" data-tab="about">[ About ]</button>
        <button class="tab-btn" data-tab="changelog">[ Changelog ]</button>
      </div>
      <div class="tab-panel active" data-panel="how">
        <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">[ Instructions on how to use this app. Step by step guide placeholder. ]</p>
      </div>
      <div class="tab-panel" data-panel="about">
        <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">[ About this app. What it does, why it was built, tech used. ]</p>
      </div>
      <div class="tab-panel" data-panel="changelog">
        <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">[ v1.0 — Initial release. v1.1 — Bug fixes. v1.2 — New features. ]</p>
      </div>
    </div>
  </section>

  <a href="apps.php"><button class="btn">← [ Back to Apps ]</button></a>

</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
</body>
</html>
