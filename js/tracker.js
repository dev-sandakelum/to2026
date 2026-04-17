/**
 * Tracker App — js/tracker.js
 * Disaster Management System — Sri Lanka Victim Tracker
 * Uses Leaflet.js (OpenStreetMap tiles, no API key needed)
 */

(function () {
  'use strict';

  // ── Timeline event types ───────────────────────────────────────────────────
  // type controls icon + color in the timeline
  // types: 'report' | 'team' | 'arrived' | 'rescued' | 'food' | 'medical' | 'shelter' | 'update' | 'alert'

  const EVENT_META = {
    report:   { icon: '📋', label: 'Incident Reported',    color: '#64748B' },
    team:     { icon: '🚁', label: 'Rescue Team Dispatched', color: '#2563EB' },
    arrived:  { icon: '📍', label: 'Team Arrived On-Site',  color: '#7C3AED' },
    rescued:  { icon: '✅', label: 'Victim Rescued',        color: '#059669' },
    food:     { icon: '🍱', label: 'Food Supply',           color: '#D97706' },
    medical:  { icon: '🏥', label: 'Medical Aid',           color: '#DC2626' },
    shelter:  { icon: '🏕️', label: 'Shelter Provided',     color: '#0891B2' },
    update:   { icon: '📡', label: 'Status Update',         color: '#64748B' },
    alert:    { icon: '⚠️', label: 'Alert / Warning',       color: '#EF4444' },
  };

  // ── Disaster victim data ───────────────────────────────────────────────────
  const INITIAL_TRACKERS = [
    {
      id: 1, lat: 6.9344, lng: 79.8428, status: 'active',
      name: 'Kamal Perera', age: 34, gender: 'Male',
      location: 'Colombo Fort', district: 'Colombo',
      disaster: 'Flash Flood', injury: 'Minor cuts',
      family: 3, rescued: true, contact: '+94 77 123 4567',
      timeline: [
        { type: 'report',  time: '2024-05-14 06:12', note: 'Victim reported trapped on rooftop due to flash flooding. Water level rising rapidly.' },
        { type: 'team',    time: '2024-05-14 06:45', note: 'Rescue team Alpha dispatched from Colombo Central Station. ETA 20 minutes.' },
        { type: 'arrived', time: '2024-05-14 07:08', note: 'Team Alpha arrived at Colombo Fort. Located victim on 3rd floor rooftop.' },
        { type: 'medical', time: '2024-05-14 07:22', note: 'First aid administered. Minor cuts treated on-site. Victim stable.' },
        { type: 'rescued', time: '2024-05-14 07:35', note: 'Victim successfully evacuated via inflatable boat. Family of 3 all accounted for.' },
        { type: 'food',    time: '2024-05-14 09:00', note: 'Emergency food package delivered to relief camp. Dry rations for 3 days.' },
        { type: 'shelter', time: '2024-05-14 10:30', note: 'Family relocated to Colombo District Relief Camp, Block C, Unit 14.' },
      ],
    },
    {
      id: 2, lat: 7.2906, lng: 80.6337, status: 'idle',
      name: 'Nimali Jayasinghe', age: 28, gender: 'Female',
      location: 'Kandy City', district: 'Kandy',
      disaster: 'Landslide', injury: 'Fractured arm',
      family: 5, rescued: false, contact: '+94 71 234 5678',
      timeline: [
        { type: 'report',  time: '2024-05-14 08:30', note: 'Landslide reported near Kandy City residential area. Multiple families affected.' },
        { type: 'alert',   time: '2024-05-14 08:35', note: 'Secondary landslide risk detected. Area marked as high danger zone.' },
        { type: 'team',    time: '2024-05-14 09:10', note: 'Rescue team Bravo dispatched. Road partially blocked — using alternate route.' },
        { type: 'arrived', time: '2024-05-14 10:05', note: 'Team Bravo arrived. Victim found with fractured arm under debris.' },
        { type: 'medical', time: '2024-05-14 10:20', note: 'Arm immobilised with splint. Victim requires hospital treatment. Ambulance requested.' },
        { type: 'food',    time: '2024-05-14 12:00', note: 'Food supply requested for family of 5. Awaiting delivery from Kandy relief depot.' },
        { type: 'update',  time: '2024-05-14 14:00', note: 'Victim transported to Kandy Teaching Hospital. Surgery scheduled. Family at relief camp.' },
      ],
    },
    {
      id: 3, lat: 6.0328, lng: 80.2170, status: 'active',
      name: 'Suresh Fernando', age: 52, gender: 'Male',
      location: 'Galle Fort', district: 'Galle',
      disaster: 'Coastal Flooding', injury: 'None',
      family: 4, rescued: true, contact: '+94 76 345 6789',
      timeline: [
        { type: 'report',  time: '2024-05-13 18:00', note: 'Coastal flooding alert issued for Galle Fort area. Victim requested evacuation assistance.' },
        { type: 'team',    time: '2024-05-13 18:30', note: 'Evacuation team dispatched from Galle District Office.' },
        { type: 'arrived', time: '2024-05-13 19:00', note: 'Team arrived. Victim and family of 4 located safely on upper floor.' },
        { type: 'rescued', time: '2024-05-13 19:20', note: 'All 4 family members evacuated safely. No injuries reported.' },
        { type: 'shelter', time: '2024-05-13 20:00', note: 'Family accommodated at Galle Kachcheri Relief Centre.' },
        { type: 'food',    time: '2024-05-14 07:00', note: 'Breakfast and dry rations distributed. Family confirmed safe and comfortable.' },
        { type: 'update',  time: '2024-05-14 15:00', note: 'Flood waters receding. Home inspection scheduled for tomorrow morning.' },
      ],
    },
    {
      id: 4, lat: 9.6615, lng: 80.0255, status: 'offline',
      name: 'Priya Krishnaswamy', age: 41, gender: 'Female',
      location: 'Jaffna Town', district: 'Jaffna',
      disaster: 'Cyclone', injury: 'Head trauma',
      family: 2, rescued: false, contact: 'Unknown',
      timeline: [
        { type: 'report',  time: '2024-05-14 04:15', note: 'Cyclone struck Jaffna overnight. Victim reported missing by neighbour. Last seen near market area.' },
        { type: 'alert',   time: '2024-05-14 04:20', note: 'CRITICAL: Head trauma suspected. Search and rescue priority elevated to Level 1.' },
        { type: 'team',    time: '2024-05-14 05:00', note: 'Search team Charlie deployed. Drone search initiated over Jaffna Town grid.' },
        { type: 'arrived', time: '2024-05-14 05:45', note: 'Team Charlie on-site. Victim located unconscious near collapsed structure.' },
        { type: 'medical', time: '2024-05-14 05:50', note: 'Emergency medical response. Head trauma confirmed. Airlifted to Jaffna Teaching Hospital.' },
        { type: 'alert',   time: '2024-05-14 08:00', note: 'Victim in ICU. Condition critical. Family contact still unknown.' },
        { type: 'update',  time: '2024-05-14 16:00', note: 'Victim stable but unconscious. Hospital social worker attempting to locate family.' },
      ],
    },
    {
      id: 5, lat: 8.5874, lng: 81.2152, status: 'idle',
      name: 'Rajan Selvam', age: 19, gender: 'Male',
      location: 'Trincomalee Port', district: 'Trincomalee',
      disaster: 'Flash Flood', injury: 'Hypothermia',
      family: 6, rescued: false, contact: '+94 75 456 7890',
      timeline: [
        { type: 'report',  time: '2024-05-14 07:00', note: 'Victim found in floodwater near Trincomalee Port. Showing signs of hypothermia.' },
        { type: 'team',    time: '2024-05-14 07:15', note: 'Medical rescue team dispatched. Thermal blankets and warming equipment loaded.' },
        { type: 'arrived', time: '2024-05-14 07:50', note: 'Team arrived. Victim conscious but shivering severely. Core temperature low.' },
        { type: 'medical', time: '2024-05-14 08:00', note: 'Warming treatment initiated. IV fluids administered. Monitoring vitals.' },
        { type: 'food',    time: '2024-05-14 09:30', note: 'Hot meals and warm beverages provided. Victim responding well to treatment.' },
        { type: 'food',    time: '2024-05-14 12:00', note: 'Food supply requested for family of 6. Request submitted to Trincomalee depot.' },
        { type: 'update',  time: '2024-05-14 15:00', note: 'Victim recovering. Temperature normalising. Awaiting full medical clearance.' },
      ],
    },
    {
      id: 6, lat: 7.2083, lng: 79.8358, status: 'active',
      name: 'Dilani Wickramasinghe', age: 36, gender: 'Female',
      location: 'Negombo Beach', district: 'Gampaha',
      disaster: 'Tsunami Warning', injury: 'None',
      family: 3, rescued: true, contact: '+94 70 567 8901',
      timeline: [
        { type: 'alert',   time: '2024-05-13 22:00', note: 'Tsunami warning issued for western coastal areas. Negombo Beach evacuation ordered.' },
        { type: 'report',  time: '2024-05-13 22:10', note: 'Victim called helpline requesting evacuation assistance for family of 3.' },
        { type: 'team',    time: '2024-05-13 22:20', note: 'Evacuation vehicle dispatched from Negombo Police Station.' },
        { type: 'rescued', time: '2024-05-13 22:45', note: 'Family of 3 evacuated to inland safe zone. All members uninjured.' },
        { type: 'shelter', time: '2024-05-13 23:15', note: 'Family checked into Negombo Evacuation Centre. Registered and assigned beds.' },
        { type: 'food',    time: '2024-05-14 07:00', note: 'Morning meals distributed. Family comfortable and safe.' },
        { type: 'update',  time: '2024-05-14 11:00', note: 'Tsunami warning lifted. Coastal inspection underway. Return home pending clearance.' },
      ],
    },
    {
      id: 7, lat: 8.3114, lng: 80.4037, status: 'idle',
      name: 'Chaminda Rathnayake', age: 47, gender: 'Male',
      location: 'Anuradhapura Sacred City', district: 'Anuradhapura',
      disaster: 'Drought & Heatwave', injury: 'Dehydration',
      family: 4, rescued: false, contact: '+94 72 678 9012',
      timeline: [
        { type: 'report',  time: '2024-05-12 14:00', note: 'Victim reported severe dehydration during heatwave. Unable to access clean water for 2 days.' },
        { type: 'team',    time: '2024-05-12 14:30', note: 'Aid team dispatched with water tanker and medical supplies.' },
        { type: 'arrived', time: '2024-05-12 15:20', note: 'Aid team arrived. Victim and family found in critical dehydration state.' },
        { type: 'medical', time: '2024-05-12 15:30', note: 'Oral rehydration salts administered. IV drip set up for victim. Family given water.' },
        { type: 'food',    time: '2024-05-12 16:00', note: 'Emergency food rations distributed. Water supply established for 3 days.' },
        { type: 'food',    time: '2024-05-14 08:00', note: 'Follow-up food and water delivery. Family still in drought-affected area.' },
        { type: 'update',  time: '2024-05-14 14:00', note: 'Victim recovering. Requesting relocation to area with stable water supply.' },
      ],
    },
    {
      id: 8, lat: 7.7170, lng: 81.6924, status: 'offline',
      name: 'Thilaga Murugesan', age: 23, gender: 'Female',
      location: 'Batticaloa Lagoon', district: 'Batticaloa',
      disaster: 'Flash Flood', injury: 'Missing — search ongoing',
      family: 1, rescued: false, contact: 'Unknown',
      timeline: [
        { type: 'report',  time: '2024-05-14 05:30', note: 'Victim reported missing after flash flood swept through Batticaloa Lagoon area.' },
        { type: 'alert',   time: '2024-05-14 05:35', note: 'MISSING PERSON ALERT issued. Last seen near lagoon bridge at 04:00.' },
        { type: 'team',    time: '2024-05-14 06:00', note: 'Search and rescue team Delta deployed. Boat search of lagoon initiated.' },
        { type: 'team',    time: '2024-05-14 07:00', note: 'Drone unit added to search. Covering 5km radius from last known location.' },
        { type: 'alert',   time: '2024-05-14 10:00', note: 'Search ongoing. No contact established. Family member (mother) registered at relief camp.' },
        { type: 'update',  time: '2024-05-14 14:00', note: 'Search area expanded. Navy vessel requested for deeper lagoon search.' },
        { type: 'update',  time: '2024-05-14 18:00', note: 'Search suspended due to darkness. Resumes at 05:30 tomorrow. All units on standby.' },
      ],
    },
    {
      id: 9, lat: 5.9549, lng: 80.5550, status: 'active',
      name: 'Asanka Bandara', age: 61, gender: 'Male',
      location: 'Matara Town', district: 'Matara',
      disaster: 'Coastal Erosion', injury: 'Bruising',
      family: 2, rescued: true, contact: '+94 78 789 0123',
      timeline: [
        { type: 'report',  time: '2024-05-13 16:00', note: 'Coastal erosion caused partial collapse of victim\'s home. Victim injured with bruising.' },
        { type: 'team',    time: '2024-05-13 16:30', note: 'Emergency response team dispatched from Matara District Office.' },
        { type: 'arrived', time: '2024-05-13 17:00', note: 'Team arrived. Structure assessed as unsafe. Immediate evacuation recommended.' },
        { type: 'medical', time: '2024-05-13 17:10', note: 'Bruising treated on-site. No fractures detected. Victim mobile.' },
        { type: 'rescued', time: '2024-05-13 17:30', note: 'Victim and spouse evacuated safely. Personal belongings retrieved where possible.' },
        { type: 'shelter', time: '2024-05-13 18:00', note: 'Couple accommodated at Matara Pradeshiya Sabha Hall temporary shelter.' },
        { type: 'food',    time: '2024-05-14 08:00', note: 'Daily meals provided. Victim in good spirits. Home damage assessment scheduled.' },
      ],
    },
    {
      id: 10, lat: 6.9497, lng: 80.7891, status: 'idle',
      name: 'Sandya Kumari', age: 31, gender: 'Female',
      location: 'Nuwara Eliya Hills', district: 'Nuwara Eliya',
      disaster: 'Landslide', injury: 'Leg fracture',
      family: 5, rescued: false, contact: '+94 77 890 1234',
      timeline: [
        { type: 'report',  time: '2024-05-14 09:00', note: 'Landslide reported in Nuwara Eliya Hills tea estate area. Victim trapped with leg injury.' },
        { type: 'alert',   time: '2024-05-14 09:05', note: 'Road to location blocked by debris. Helicopter access being assessed.' },
        { type: 'team',    time: '2024-05-14 09:30', note: 'Mountain rescue team Echo dispatched. Proceeding on foot through alternate trail.' },
        { type: 'arrived', time: '2024-05-14 11:00', note: 'Team Echo reached victim after 1.5hr trek. Leg fracture confirmed. Splint applied.' },
        { type: 'medical', time: '2024-05-14 11:15', note: 'Pain relief administered. Stretcher evacuation underway. Helicopter landing zone being cleared.' },
        { type: 'food',    time: '2024-05-14 11:20', note: 'Emergency rations provided to victim and 4 family members on-site.' },
        { type: 'update',  time: '2024-05-14 14:00', note: 'Victim airlifted to Nuwara Eliya General Hospital. Surgery required. Family escorted by ground team.' },
      ],
    },
  ];

  // ── State ─────────────────────────────────────────────────────────────────
  let trackers = INITIAL_TRACKERS.map(t => ({ ...t, timeline: [...(t.timeline || [])] }));
  let nextId        = 11;
  let map           = null;
  let markers       = {};
  let pickMode      = false;
  let activeTimeline  = null; // id of currently open timeline
  let activeMarkerId  = null; // id of currently highlighted map pin

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
  function makeIcon(status, selected) {
    const color = (STATUS_COLORS[status] || STATUS_COLORS.idle).pin;
    if (selected) {
      // Larger pin with outer pulse ring
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="48" viewBox="0 0 38 48">
          <!-- pulse ring -->
          <circle cx="19" cy="19" r="17" fill="${color}" fill-opacity="0.18" stroke="${color}" stroke-width="1.5" stroke-opacity="0.4"/>
          <!-- pin body -->
          <path d="M19 2C10.16 2 3 9.16 3 18c0 11.5 16 28 16 28S35 29.5 35 18C35 9.16 27.84 2 19 2z"
                fill="${color}" stroke="white" stroke-width="2.5"/>
          <!-- inner dot -->
          <circle cx="19" cy="18" r="6" fill="white"/>
          <circle cx="19" cy="18" r="3" fill="${color}"/>
        </svg>`;
      return L.divIcon({
        html: svg,
        className: '',
        iconSize:   [38, 48],
        iconAnchor: [19, 48],
        popupAnchor:[0, -50],
      });
    }
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

  // ── Highlight / de-highlight a map pin ───────────────────────────────────
  function setActiveMarker(id) {
    // Restore previous marker to normal icon
    if (activeMarkerId !== null && markers[activeMarkerId]) {
      const prev = trackers.find(t => t.id === activeMarkerId);
      if (prev) markers[activeMarkerId].setIcon(makeIcon(prev.status, false));
    }
    activeMarkerId = id;
    // Set new marker to selected icon
    if (id !== null && markers[id]) {
      const cur = trackers.find(t => t.id === id);
      if (cur) markers[id].setIcon(makeIcon(cur.status, true));
    }
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

    // ── Click: open / switch Victim Tracking drawer ──
    marker.on('click', function () {
      hideTooltip();
      setActiveMarker(t.id);
      // Highlight the sidebar item
      document.querySelectorAll('.tracker-item').forEach(el => el.classList.remove('highlighted'));
      const el = document.querySelector(`.tracker-item[data-id="${t.id}"]`);
      if (el) {
        el.classList.add('highlighted');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      // Open (or switch to) this victim's tracking drawer without closing it
      openTimeline(t.id);
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
          <button class="tracker-item-btn" data-action="track"  data-id="${t.id}">📋 Track</button>
          <button class="tracker-item-btn" data-action="focus"  data-id="${t.id}">📍 Focus</button>
          <button class="tracker-item-btn danger" data-action="remove" data-id="${t.id}">🗑</button>
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
      timeline: [
        { type: 'report', time: new Date().toISOString().slice(0,16).replace('T',' '), note: 'Victim record created and added to tracking system.' },
      ],
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

  // ── Timeline: open drawer ─────────────────────────────────────────────────
  function openTimeline(id) {
    const t = trackers.find(t => t.id === id);
    if (!t) return;
    activeTimeline = id;
    setActiveMarker(id);

    const c = STATUS_COLORS[t.status];
    const initials = t.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    // Build progress steps
    const steps = [
      { key: 'report',  label: 'Reported'  },
      { key: 'team',    label: 'Team Sent' },
      { key: 'arrived', label: 'Arrived'   },
      { key: 'rescued', label: 'Rescued'   },
    ];
    const doneKeys = new Set(t.timeline.map(e => e.type));
    const progressHtml = steps.map((s, i) => {
      const done = doneKeys.has(s.key);
      const meta = EVENT_META[s.key];
      return `
        <div class="tl-step ${done ? 'done' : 'pending'}">
          <div class="tl-step-icon">${done ? meta.icon : '○'}</div>
          <div class="tl-step-label">${s.label}</div>
          ${i < steps.length - 1 ? '<div class="tl-step-line"></div>' : ''}
        </div>`;
    }).join('');

    // Build supply chips
    const supplyTypes = ['food', 'medical', 'shelter'];
    const supplyHtml = supplyTypes.map(type => {
      const meta = EVENT_META[type];
      const done = doneKeys.has(type);
      return `<span class="tl-supply-chip ${done ? 'done' : ''}">${meta.icon} ${meta.label.replace(' Supply','').replace(' Aid','').replace(' Provided','')}</span>`;
    }).join('');

    // Build timeline events — shared renderer
    const buildEventHtml = (e, isLatest) => {
      const meta = EVENT_META[e.type] || EVENT_META.update;
      return `
        <div class="tl-event ${isLatest ? 'latest' : ''}">
          <div class="tl-event-left">
            <div class="tl-event-dot" style="background:${meta.color};box-shadow:0 0 0 3px ${meta.color}22;"></div>
            <div class="tl-event-line"></div>
          </div>
          <div class="tl-event-right">
            <div class="tl-event-header">
              <span class="tl-event-icon">${meta.icon}</span>
              <span class="tl-event-type">${meta.label}</span>
              ${isLatest ? '<span class="tl-event-latest-badge">Latest</span>' : ''}
              <span class="tl-event-time">${e.time}</span>
            </div>
            <div class="tl-event-note">${escHtml(e.note)}</div>
          </div>
        </div>`;
    };

    const reversed      = [...t.timeline].reverse();
    // Main drawer: only the latest event
    const latestEventHtml = t.timeline.length
      ? buildEventHtml(reversed[0], true)
      : '<p class="tl-empty">No events recorded yet.</p>';
    // Expanded panel: all events newest-first
    const allEventsHtml = reversed.length
      ? reversed.map((e, idx) => buildEventHtml(e, idx === 0)).join('')
      : '<p class="tl-empty">No events recorded yet.</p>';

    document.getElementById('tl-avatar').textContent       = initials;
    document.getElementById('tl-avatar').style.background  = c.pin;
    document.getElementById('tl-name').textContent         = t.name;
    document.getElementById('tl-meta').textContent         = `${t.gender}, ${t.age} yrs · ${t.district} · ${t.disaster}`;
    document.getElementById('tl-status-pill').textContent  = `${STATUS_EMOJI[t.status]} ${STATUS_LABEL[t.status]}`;
    document.getElementById('tl-status-pill').style.background   = c.bg;
    document.getElementById('tl-status-pill').style.color        = c.text;
    document.getElementById('tl-status-pill').style.borderColor  = c.border;
    document.getElementById('tl-progress').innerHTML       = progressHtml;
    document.getElementById('tl-supplies').innerHTML       = supplyHtml;
    document.getElementById('tl-events').innerHTML         = latestEventHtml;
    document.getElementById('tl-event-count').textContent  = t.timeline.length;

    // Open drawer (no-op if already open — content already swapped above)
    document.getElementById('tl-drawer').classList.add('open');

    // Sync expanded panel if it's open
    const panel = document.getElementById('tl-log-panel');
    if (panel.classList.contains('open')) {
      document.getElementById('tl-log-panel-name').textContent  = t.name + ' — Activity Log';
      document.getElementById('tl-log-panel-count').textContent = t.timeline.length;
      document.getElementById('tl-log-panel-events').innerHTML  = allEventsHtml;
    }
  }

  function closeTimeline() {
    document.getElementById('tl-drawer').classList.remove('open', 'log-expanded');
    document.getElementById('tl-log-panel').classList.remove('open');
    setActiveMarker(null);
    activeTimeline = null;
  }

  // ── Timeline: add new event ───────────────────────────────────────────────
  function addTimelineEvent() {
    if (!activeTimeline) return;
    const t    = trackers.find(t => t.id === activeTimeline);
    if (!t) return;

    const type = document.getElementById('tl-new-type').value;
    const note = document.getElementById('tl-new-note').value.trim();
    if (!note) { document.getElementById('tl-new-note').focus(); return; }

    const now = new Date();
    const time = now.getFullYear() + '-' +
      String(now.getMonth()+1).padStart(2,'0') + '-' +
      String(now.getDate()).padStart(2,'0') + ' ' +
      String(now.getHours()).padStart(2,'0') + ':' +
      String(now.getMinutes()).padStart(2,'0');

    t.timeline.push({ type, time, note });
    document.getElementById('tl-new-note').value = '';

    // Refresh drawer
    openTimeline(activeTimeline);
  }

  // ── Timeline: toggle expanded log panel ──────────────────────────────────
  function toggleLogExpand() {
    const panel   = document.getElementById('tl-log-panel');
    const drawer  = document.getElementById('tl-drawer');
    const isOpen  = panel.classList.contains('open');

    if (isOpen) {
      panel.classList.remove('open');
      drawer.classList.remove('log-expanded');
    } else {
      const t = trackers.find(t => t.id === activeTimeline);
      if (!t) return;

      // Build all events newest-first for the expanded panel
      const reversed = [...t.timeline].reverse();
      const allEventsHtml = reversed.length
        ? reversed.map((e, idx) => {
            const meta = EVENT_META[e.type] || EVENT_META.update;
            const isLatest = idx === 0;
            return `
              <div class="tl-event ${isLatest ? 'latest' : ''}">
                <div class="tl-event-left">
                  <div class="tl-event-dot" style="background:${meta.color};box-shadow:0 0 0 3px ${meta.color}22;"></div>
                  <div class="tl-event-line"></div>
                </div>
                <div class="tl-event-right">
                  <div class="tl-event-header">
                    <span class="tl-event-icon">${meta.icon}</span>
                    <span class="tl-event-type">${meta.label}</span>
                    ${isLatest ? '<span class="tl-event-latest-badge">Latest</span>' : ''}
                    <span class="tl-event-time">${e.time}</span>
                  </div>
                  <div class="tl-event-note">${escHtml(e.note)}</div>
                </div>
              </div>`;
          }).join('')
        : '<p class="tl-empty">No events recorded yet.</p>';

      document.getElementById('tl-log-panel-name').textContent  = t.name + ' — Activity Log';
      document.getElementById('tl-log-panel-count').textContent = t.timeline.length;
      document.getElementById('tl-log-panel-events').innerHTML  = allEventsHtml;
      panel.classList.add('open');
      drawer.classList.add('log-expanded');
    }
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
      if (action === 'track')  openTimeline(id);
      if (action === 'focus')  focusTracker(id);
      if (action === 'remove') {
        if (confirm('Remove this victim record?')) removeTracker(id);
      }
    });

    // Timeline drawer close
    document.getElementById('tl-close').addEventListener('click', closeTimeline);
    document.getElementById('tl-overlay').addEventListener('click', closeTimeline);

    // Focus button in drawer header
    document.getElementById('tl-focus-btn').addEventListener('click', function () {
      if (activeTimeline) focusTracker(activeTimeline);
    });

    // Expand / collapse activity log panel
    document.getElementById('tl-expand-btn').addEventListener('click', toggleLogExpand);
    document.getElementById('tl-collapse-btn').addEventListener('click', toggleLogExpand);

    // Add timeline event
    document.getElementById('tl-add-btn').addEventListener('click', addTimelineEvent);
    document.getElementById('tl-new-note').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addTimelineEvent();
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
