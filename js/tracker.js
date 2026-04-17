/**
 * Tracker App — js/tracker.js
 * Disaster Management System — Sri Lanka Victim Tracker
 * Uses Leaflet.js (OpenStreetMap tiles, no API key needed)
 */

(function () {
  'use strict';

  // ── Disaster victim data ───────────────────────────────────────────────────
  // status: 'active' = rescued/safe  |  'idle' = needs aid  |  'offline' = critical/missing
  const INITIAL_TRACKERS = [
    {
      id: 1, lat: 6.9344, lng: 79.8428, status: 'active',
      name: 'Kamal Perera', age: 34, gender: 'Male',
      location: 'Colombo Fort', district: 'Colombo',
      disaster: 'Flash Flood', injury: 'Minor cuts',
      family: 3, rescued: true, contact: '+94 77 123 4567',
    },
    {
      id: 2, lat: 7.2906, lng: 80.6337, status: 'idle',
      name: 'Nimali Jayasinghe', age: 28, gender: 'Female',
      location: 'Kandy City', district: 'Kandy',
      disaster: 'Landslide', injury: 'Fractured arm',
      family: 5, rescued: false, contact: '+94 71 234 5678',
    },
    {
      id: 3, lat: 6.0328, lng: 80.2170, status: 'active',
      name: 'Suresh Fernando', age: 52, gender: 'Male',
      location: 'Galle Fort', district: 'Galle',
      disaster: 'Coastal Flooding', injury: 'None',
      family: 4, rescued: true, contact: '+94 76 345 6789',
    },
    {
      id: 4, lat: 9.6615, lng: 80.0255, status: 'offline',
      name: 'Priya Krishnaswamy', age: 41, gender: 'Female',
      location: 'Jaffna Town', district: 'Jaffna',
      disaster: 'Cyclone', injury: 'Head trauma',
      family: 2, rescued: false, contact: 'Unknown',
    },
    {
      id: 5, lat: 8.5874, lng: 81.2152, status: 'idle',
      name: 'Rajan Selvam', age: 19, gender: 'Male',
      location: 'Trincomalee Port', district: 'Trincomalee',
      disaster: 'Flash Flood', injury: 'Hypothermia',
      family: 6, rescued: false, contact: '+94 75 456 7890',
    },
    {
      id: 6, lat: 7.2083, lng: 79.8358, status: 'active',
      name: 'Dilani Wickramasinghe', age: 36, gender: 'Female',
      location: 'Negombo Beach', district: 'Gampaha',
      disaster: 'Tsunami Warning', injury: 'None',
      family: 3, rescued: true, contact: '+94 70 567 8901',
    },
    {
      id: 7, lat: 8.3114, lng: 80.4037, status: 'idle',
      name: 'Chaminda Rathnayake', age: 47, gender: 'Male',
      location: 'Anuradhapura Sacred City', district: 'Anuradhapura',
      disaster: 'Drought & Heatwave', injury: 'Dehydration',
      family: 4, rescued: false, contact: '+94 72 678 9012',
    },
    {
      id: 8, lat: 7.7170, lng: 81.6924, status: 'offline',
      name: 'Thilaga Murugesan', age: 23, gender: 'Female',
      location: 'Batticaloa Lagoon', district: 'Batticaloa',
      disaster: 'Flash Flood', injury: 'Missing — search ongoing',
      family: 1, rescued: false, contact: 'Unknown',
    },
    {
      id: 9, lat: 5.9549, lng: 80.5550, status: 'active',
      name: 'Asanka Bandara', age: 61, gender: 'Male',
      location: 'Matara Town', district: 'Matara',
      disaster: 'Coastal Erosion', injury: 'Bruising',
      family: 2, rescued: true, contact: '+94 78 789 0123',
    },
    {
      id: 10, lat: 6.9497, lng: 80.7891, status: 'idle',
      name: 'Sandya Kumari', age: 31, gender: 'Female',
      location: 'Nuwara Eliya Hills', district: 'Nuwara Eliya',
      disaster: 'Landslide', injury: 'Leg fracture',
      family: 5, rescued: false, contact: '+94 77 890 1234',
    },
  ];

  // ── State ─────────────────────────────────────────────────────────────────
  let trackers = INITIAL_TRACKERS.map(t => ({ ...t }));
  let nextId   = 11;
  let map      = null;
  let markers  = {};    // id → Leaflet marker
  let pickMode = false; // true when user clicks map to pick coords

  // ── Status config ─────────────────────────────────────────────────────────
  const STATUS_EMOJI  = { active: '🟢', idle: '🟡', offline: '🔴' };
  const STATUS_LABEL  = { active: 'Rescued / Safe', idle: 'Needs Aid', offline: 'Critical / Missing' };
  const STATUS_COLORS = {
    active:  { bg: '#D1FAE5', text: '#059669', border: '#6EE7B7', pin: '#10B981' },
    idle:    { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D', pin: '#F59E0B' },
    offline: { bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5', pin: '#EF4444' },
  };

  // ── Hover tooltip (floating card) ─────────────────────────────────────────
  let tooltip = null;

  function createTooltip() {
    tooltip = document.createElement('div');
    tooltip.id = 'victim-tooltip';
    tooltip.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s ease, transform 0.15s ease;
      transform: translateY(6px);
    `;
    document.body.appendChild(tooltip);
  }

  function showTooltip(t, x, y) {
    const c = STATUS_COLORS[t.status];
    
    // Generate initials from name
    const initials = t.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    
    tooltip.innerHTML = `
      <div class="victim-card" style="--vc-accent:${c.pin};">
        <div class="victim-card-accent-bar"></div>
        
        <div class="victim-card-header">
          <div class="victim-card-avatar">${initials}</div>
          <div class="victim-card-header-info">
            <div class="victim-card-name">${escHtml(t.name)}</div>
            <div class="victim-card-age-gender">${escHtml(t.gender)}, ${t.age} years</div>
          </div>
          <span class="victim-card-status-pill" style="background:${c.bg};color:${c.text};border-color:${c.border};">
            ${STATUS_EMOJI[t.status]}
          </span>
        </div>
        
        <div class="victim-card-body">
          <div class="victim-card-grid">
            <div class="victim-card-field">
              <div class="victim-card-field-label">📍 Location</div>
              <div class="victim-card-field-value">${escHtml(t.location)}</div>
            </div>
            <div class="victim-card-field">
              <div class="victim-card-field-label">🗺️ District</div>
              <div class="victim-card-field-value">${escHtml(t.district)}</div>
            </div>
            <div class="victim-card-field full">
              <div class="victim-card-field-label">⚠️ Disaster Type</div>
              <div class="victim-card-field-value">${escHtml(t.disaster)}</div>
            </div>
            <div class="victim-card-field full">
              <div class="victim-card-field-label">🩹 Injury Status</div>
              <div class="victim-card-field-value ${t.injury.toLowerCase().includes('missing') || t.injury.toLowerCase().includes('trauma') ? 'danger' : ''}">${escHtml(t.injury)}</div>
            </div>
            <div class="victim-card-field">
              <div class="victim-card-field-label">👨‍👩‍👧 Family</div>
              <div class="victim-card-field-value">${t.family} member${t.family !== 1 ? 's' : ''}</div>
            </div>
            <div class="victim-card-field">
              <div class="victim-card-field-label">📞 Contact</div>
              <div class="victim-card-field-value">${escHtml(t.contact)}</div>
            </div>
          </div>
          
          <div class="victim-card-footer">
            <div class="victim-card-coords">${t.lat.toFixed(4)}, ${t.lng.toFixed(4)}</div>
            <div class="victim-card-id-badge">ID ${String(t.id).padStart(3, '0')}</div>
          </div>
        </div>
      </div>
    `;
    positionTooltip(x, y);
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(0)';
  }

  function positionTooltip(x, y) {
    const tw = 300;
    const th = 310; // approx card height
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = x + 16;
    let top  = y - 20;
    if (left + tw > vw - 10) left = x - tw - 16;
    if (top + th > vh - 10)  top  = vh - th - 10;
    if (top < 10)             top  = 10;
    tooltip.style.left = left + 'px';
    tooltip.style.top  = top  + 'px';
  }

  function hideTooltip() {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(6px)';
  }

  // ── Custom marker icon ────────────────────────────────────────────────────
  function makeIcon(status) {
    const color = (STATUS_COLORS[status] || STATUS_COLORS.idle).pin;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
        <path d="M14 0C6.27 0 0 6.27 0 14c0 9.33 14 22 14 22S28 23.33 28 14C28 6.27 21.73 0 14 0z"
              fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>`;
    return L.divIcon({
      html: svg,
      className: '',
      iconSize:   [28, 36],
      iconAnchor: [14, 36],
      popupAnchor:[0, -40],
    });
  }

  // ── Escape HTML ───────────────────────────────────────────────────────────
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Init Leaflet map ──────────────────────────────────────────────────────
  function initMap() {
    map = L.map('tracker-map', {
      center: [7.8731, 80.7718],
      zoom:   8,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Click on map → pick coords for new tracker
    map.on('click', function (e) {
      if (!pickMode) return;
      document.getElementById('input-lat').value = e.latlng.lat.toFixed(6);
      document.getElementById('input-lng').value = e.latlng.lng.toFixed(6);
      pickMode = false;
      map.getContainer().style.cursor = '';
    });
  }

  // ── Add a marker to the map ───────────────────────────────────────────────
  function addMarker(t) {
    const marker = L.marker([t.lat, t.lng], { icon: makeIcon(t.status) }).addTo(map);

    // ── Hover: show floating tooltip ──
    marker.on('mouseover', function (e) {
      showTooltip(t, e.originalEvent.clientX, e.originalEvent.clientY);
    });
    marker.on('mousemove', function (e) {
      positionTooltip(e.originalEvent.clientX, e.originalEvent.clientY);
    });
    marker.on('mouseout', function () {
      hideTooltip();
    });

    // ── Click: highlight sidebar ──
    marker.on('click', function () {
      hideTooltip();
      document.querySelectorAll('.tracker-item').forEach(el => el.classList.remove('highlighted'));
      const el = document.querySelector(`.tracker-item[data-id="${t.id}"]`);
      if (el) {
        el.classList.add('highlighted');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    markers[t.id] = marker;
  }

  // ── Remove a marker from the map ─────────────────────────────────────────
  function removeMarker(id) {
    if (markers[id]) {
      map.removeLayer(markers[id]);
      delete markers[id];
    }
  }

  // ── Render sidebar list ───────────────────────────────────────────────────
  function renderList() {
    const list = document.getElementById('tracker-list');
    list.innerHTML = '';

    trackers.forEach(t => {
      const item = document.createElement('div');
      item.className = 'tracker-item';
      item.dataset.id = t.id;
      item.innerHTML = `
        <div class="tracker-item-top">
          <span class="tracker-item-label">${escHtml(t.name)}</span>
          <span class="tracker-item-status ${t.status}">
            ${STATUS_EMOJI[t.status]}
          </span>
        </div>
        <div class="tracker-item-meta">
          <span>⚠️ ${escHtml(t.disaster)}</span>
          <span>📍 ${escHtml(t.district)}</span>
        </div>
        <div class="tracker-item-coords">${t.lat.toFixed(4)}, ${t.lng.toFixed(4)}</div>
        <div class="tracker-item-actions">
          <button class="tracker-item-btn" data-action="focus" data-id="${t.id}">📍 Focus</button>
          <button class="tracker-item-btn danger" data-action="remove" data-id="${t.id}">🗑 Remove</button>
        </div>
      `;
      list.appendChild(item);
    });

    updateCounts();
  }

  // ── Update count badges ───────────────────────────────────────────────────
  function updateCounts() {
    const n = trackers.length;
    const mapBadge     = document.getElementById('map-count');
    const sidebarCount = document.getElementById('sidebar-count');
    if (mapBadge)     mapBadge.textContent     = `${n} victim${n !== 1 ? 's' : ''} tracked`;
    if (sidebarCount) sidebarCount.textContent = n;
  }

  // ── Add tracker ───────────────────────────────────────────────────────────
  function addTracker(name, lat, lng, status) {
    const t = {
      id: nextId++, lat, lng, status,
      name,
      age: '—', gender: '—',
      location: 'Unknown', district: 'Unknown',
      disaster: 'Unknown', injury: 'Unknown',
      family: 0, rescued: status === 'active',
      contact: 'Unknown',
    };
    trackers.push(t);
    addMarker(t);
    renderList();
  }

  // ── Remove tracker ────────────────────────────────────────────────────────
  function removeTracker(id) {
    trackers = trackers.filter(t => t.id !== id);
    removeMarker(id);
    renderList();
  }

  // ── Focus map on tracker ──────────────────────────────────────────────────
  function focusTracker(id) {
    const t = trackers.find(t => t.id === id);
    if (!t) return;
    map.flyTo([t.lat, t.lng], 13, { duration: 1.2 });
  }

  // ── Modal helpers ─────────────────────────────────────────────────────────
  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  }

  // ── Wire up events ────────────────────────────────────────────────────────
  function bindEvents() {
    document.getElementById('btn-add-tracker').addEventListener('click', function () {
      document.getElementById('input-label').value  = '';
      document.getElementById('input-lat').value    = '';
      document.getElementById('input-lng').value    = '';
      document.getElementById('input-status').value = 'active';
      openModal('modal-add-tracker');
      pickMode = true;
      map.getContainer().style.cursor = 'crosshair';
    });

    document.getElementById('btn-confirm-add').addEventListener('click', function () {
      const name   = document.getElementById('input-label').value.trim();
      const lat    = parseFloat(document.getElementById('input-lat').value);
      const lng    = parseFloat(document.getElementById('input-lng').value);
      const status = document.getElementById('input-status').value;

      if (!name) { alert('Please enter the victim\'s name.'); return; }
      if (isNaN(lat) || lat < -90  || lat > 90)   { alert('Please enter a valid latitude (−90 to 90).'); return; }
      if (isNaN(lng) || lng < -180 || lng > 180)  { alert('Please enter a valid longitude (−180 to 180).'); return; }

      addTracker(name, lat, lng, status);
      closeModal('modal-add-tracker');
      pickMode = false;
      map.getContainer().style.cursor = '';
      focusTracker(trackers[trackers.length - 1].id);
    });

    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', function () {
        closeModal(this.dataset.modalClose);
        pickMode = false;
        if (map) map.getContainer().style.cursor = '';
      });
    });

    document.getElementById('modal-add-tracker').addEventListener('click', function (e) {
      if (e.target === this) {
        closeModal('modal-add-tracker');
        pickMode = false;
        map.getContainer().style.cursor = '';
      }
    });

    document.getElementById('tracker-list').addEventListener('click', function (e) {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const id     = parseInt(btn.dataset.id, 10);
      const action = btn.dataset.action;
      if (action === 'focus')  focusTracker(id);
      if (action === 'remove') {
        if (confirm('Remove this victim record?')) removeTracker(id);
      }
    });
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  function init() {
    createTooltip();
    initMap();
    trackers.forEach(t => addMarker(t));
    renderList();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
