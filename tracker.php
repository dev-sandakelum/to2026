<?php
$page_title    = 'Tracker';
$active_page   = 'apps';
$extra_css     = ['css/tracker.css'];
$extra_scripts = ['js/tracker.js'];
include 'components/head.php';
?>
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</head>
<body class="tracker-page">
<?php include 'components/navbar.php'; ?>
<?php include 'components/modal-profile.php'; ?>

<main class="tracker-main">

  <!-- ── Header ── -->
  <div class="tracker-header">
    <div>
      <h1 class="tracker-title">📍 Tracker</h1>
      <p class="tracker-sub">Disaster Management System — Sri Lanka</p>
    </div>
    <button class="btn primary" id="btn-add-tracker">+ Add Victim</button>
  </div>

  <!-- ── Layout: Map + Sidebar ── -->
  <div class="tracker-layout">

    <!-- Map -->
    <div class="tracker-map-wrap">
      <div id="tracker-map"></div>
      <div class="map-badge" id="map-count">10 trackers</div>
    </div>

    <!-- Sidebar: tracker list -->
    <aside class="tracker-sidebar">
      <div class="tracker-sidebar-head">
        <span class="section-title" style="margin:0;padding:0;border:none;">Victim Records</span>
        <span class="tracker-count-badge" id="sidebar-count">10</span>
      </div>

      <div class="tracker-list" id="tracker-list">
        <!-- populated by JS -->
      </div>
    </aside>

  </div>

</main>

<!-- ── Add Tracker Modal ── -->
<div class="modal-overlay" id="modal-add-tracker">
  <div class="modal-box" style="width:420px">
    <div class="modal-header">
      <h3 class="modal-title">Add Victim Record</h3>
      <button class="modal-close" data-modal-close="modal-add-tracker">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>Victim Name</label>
        <input type="text" id="input-label" placeholder="e.g. Kamal Perera" maxlength="60" />
      </div>
      <div class="form-group">
        <label>Latitude</label>
        <input type="number" id="input-lat" placeholder="e.g. 40.7128" step="any" />
      </div>
      <div class="form-group">
        <label>Longitude</label>
        <input type="number" id="input-lng" placeholder="e.g. -74.0060" step="any" />
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="input-status">
          <option value="active">🟢 Rescued / Safe</option>
          <option value="idle">🟡 Needs Aid</option>
          <option value="offline">🔴 Critical / Missing</option>
        </select>
      </div>
      <p class="modal-hint">💡 Or click anywhere on the map to auto-fill coordinates.</p>
    </div>
    <div class="modal-footer">
      <button class="btn" data-modal-close="modal-add-tracker">Cancel</button>
      <button class="btn primary" id="btn-confirm-add">Add Victim</button>
    </div>
  </div>
</div>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<?php include 'components/scripts.php'; ?>
</body>
</html>
