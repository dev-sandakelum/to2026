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

<!-- ── Timeline Drawer ── -->
<div class="tl-overlay" id="tl-overlay"></div>
<div class="tl-drawer" id="tl-drawer">

  <!-- Drawer Header -->
  <div class="tl-drawer-header">
    <div class="tl-drawer-title">
      <span class="tl-drawer-icon">📋</span>
      <span>Victim Tracking</span>
    </div>
    <div class="tl-drawer-actions">
      <button class="tl-focus-btn" id="tl-focus-btn" title="Focus map on this victim">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
          <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>
        </svg>
        Focus
      </button>
      <button class="tl-close" id="tl-close" aria-label="Close">✕</button>
    </div>
  </div>

  <!-- Victim Identity Bar -->
  <div class="tl-identity">
    <div class="tl-avatar" id="tl-avatar">KP</div>
    <div class="tl-identity-info">
      <div class="tl-identity-name" id="tl-name">—</div>
      <div class="tl-identity-meta" id="tl-meta">—</div>
    </div>
    <span class="tl-status-pill" id="tl-status-pill">—</span>
  </div>

  <!-- Progress Steps -->
  <div class="tl-section">
    <div class="tl-section-label">Rescue Progress</div>
    <div class="tl-progress" id="tl-progress"></div>
  </div>

  <!-- Supply Status -->
  <div class="tl-section">
    <div class="tl-section-label">Aid & Supplies</div>
    <div class="tl-supplies" id="tl-supplies"></div>
  </div>

  <!-- Events Feed -->
  <div class="tl-section tl-events-section">
    <div class="tl-section-label">
      Activity Log
      <span class="tl-event-count-badge" id="tl-event-count">0</span>
      <button class="tl-expand-btn" id="tl-expand-btn" title="Expand activity log">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
          <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
        </svg>
      </button>
    </div>
    <div class="tl-events" id="tl-events"></div>
  </div>

  <!-- Add Event -->
  <div class="tl-add-event">
    <div class="tl-add-event-title">Add Update</div>
    <div class="tl-add-row">
      <select class="tl-type-select" id="tl-new-type">
        <option value="update">📡 Status Update</option>
        <option value="team">🚁 Rescue Team Dispatched</option>
        <option value="arrived">📍 Team Arrived</option>
        <option value="rescued">✅ Victim Rescued</option>
        <option value="food">🍱 Food Supply</option>
        <option value="medical">🏥 Medical Aid</option>
        <option value="shelter">🏕️ Shelter Provided</option>
        <option value="alert">⚠️ Alert / Warning</option>
        <option value="report">📋 Incident Report</option>
      </select>
    </div>
    <div class="tl-add-row">
      <textarea class="tl-note-input" id="tl-new-note" placeholder="Describe what happened… (Ctrl+Enter to submit)" rows="3"></textarea>
    </div>
    <button class="tl-add-btn" id="tl-add-btn">+ Add Update</button>
  </div>

</div>

<!-- ── Expanded Activity Log Panel (slides behind main drawer) ── -->
<div class="tl-log-panel" id="tl-log-panel">
  <div class="tl-log-panel-header">
    <div class="tl-log-panel-title">
      <span>📋</span>
      <span id="tl-log-panel-name">Activity Log</span>
      <span class="tl-event-count-badge" id="tl-log-panel-count">0</span>
    </div>
    <button class="tl-expand-btn active" id="tl-collapse-btn" title="Collapse">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>
        <line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>
      </svg>
    </button>
  </div>
  <div class="tl-log-panel-events" id="tl-log-panel-events"></div>
</div>

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
