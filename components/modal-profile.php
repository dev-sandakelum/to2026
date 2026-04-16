<?php
/**
 * Profile Modal Component
 *
 * Usage: include 'components/modal-profile.php';
 *
 * Renders the profile modal triggered by data-modal-open="modal-profile".
 */
?>

<!-- MODAL: Profile -->
<div class="modal-overlay" id="modal-profile">
  <div class="modal-box">
    <div class="modal-header">
      <strong>[ Profile ]</strong>
      <button class="modal-close">✕</button>
    </div>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">[ User profile placeholder. Name, role, settings link. ]</p>
    <a href="admin.php"><button class="btn sm">[ Admin Panel ]</button></a>
  </div>
</div>
