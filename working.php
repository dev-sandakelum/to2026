<?php
$page_title  = 'Working';
$active_page = 'working';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>

  <!-- Kanban Board -->
  <section class="section">
    <div class="section-title">Kanban Board</div>
    <div class="kanban">

      <div class="kanban-col">
        <div class="kanban-col-header">[ To Do ]</div>
        <div class="kanban-items">
          <div class="kanban-item">[ Task item placeholder ]</div>
          <div class="kanban-item">[ Task item placeholder ]</div>
          <div class="kanban-item">[ Task item placeholder ]</div>
          <div class="kanban-item">[ Task item placeholder ]</div>
        </div>
      </div>

      <div class="kanban-col">
        <div class="kanban-col-header">[ In Progress ]</div>
        <div class="kanban-items">
          <div class="kanban-item">[ Task item placeholder ]</div>
          <div class="kanban-item">[ Task item placeholder ]</div>
        </div>
      </div>

      <div class="kanban-col">
        <div class="kanban-col-header">[ Done ]</div>
        <div class="kanban-items">
          <div class="kanban-item">[ Task item placeholder ]</div>
          <div class="kanban-item">[ Task item placeholder ]</div>
          <div class="kanban-item">[ Task item placeholder ]</div>
        </div>
      </div>

    </div>
  </section>

  <!-- Logs -->
  <section class="section">
    <div class="section-title">Logs</div>
    <div class="log-list">
      <div class="log-item"><span class="log-time">[ 09:00 ]</span><span>[ Log entry placeholder text ]</span></div>
      <div class="log-item"><span class="log-time">[ 10:30 ]</span><span>[ Log entry placeholder text ]</span></div>
      <div class="log-item"><span class="log-time">[ 11:15 ]</span><span>[ Log entry placeholder text ]</span></div>
      <div class="log-item"><span class="log-time">[ 13:00 ]</span><span>[ Log entry placeholder text ]</span></div>
      <div class="log-item"><span class="log-time">[ 14:45 ]</span><span>[ Log entry placeholder text ]</span></div>
      <div class="log-item"><span class="log-time">[ 16:00 ]</span><span>[ Log entry placeholder text ]</span></div>
    </div>
  </section>

  <!-- Reading List -->
  <section class="section">
    <div class="section-title">Reading List</div>
    <div class="reading-list">
      <div class="reading-item">
        <span>[ Article / Book Title ]</span>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="tag">[ Reading ]</span>
          <button class="btn sm">[ Done ]</button>
        </div>
      </div>
      <div class="reading-item">
        <span>[ Article / Book Title ]</span>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="tag">[ Queue ]</span>
          <button class="btn sm">[ Done ]</button>
        </div>
      </div>
      <div class="reading-item">
        <span>[ Article / Book Title ]</span>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="tag">[ Done ]</span>
          <button class="btn sm">[ Remove ]</button>
        </div>
      </div>
      <div class="reading-item">
        <span>[ Article / Book Title ]</span>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="tag">[ Queue ]</span>
          <button class="btn sm">[ Done ]</button>
        </div>
      </div>
    </div>
  </section>

</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
</body>
</html>
