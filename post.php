<?php
$page_title  = 'Blog Post Title';
$active_page = 'blog';
include 'components/head.php';
?>
<body class="page-post">

<?php include 'components/navbar.php'; ?>

<main>
  <article class="post-article" data-post-id="post-1">

    <!-- Cover image — full width, no side padding -->
    <div class="post-cover">
      <div class="placeholder-img post-cover-img">[ Cover Image ]</div>
    </div>

    <!-- Post body -->
    <div class="post-body">

      <!-- Meta row -->
      <div class="post-meta-row">
        <span class="tag">[ Category ]</span>
        <span class="post-meta-dot">·</span>
        <span class="post-date">[ Jan 1, 2024 ]</span>
        <span class="post-meta-dot">·</span>
        <span class="post-read-time">[ 5 min read ]</span>
      </div>

      <!-- Title -->
      <h1 class="post-title">[ Blog Post Title ]</h1>

      <!-- Content -->
      <div class="post-content">
        <p>[ Introduction paragraph. Set the scene, introduce the topic, and hook the reader. This is placeholder text for the opening of the blog post. ]</p>
        <p>[ Second paragraph. Dive deeper into the topic. Provide context, background, or supporting information. ]</p>
        <p>[ Third paragraph. Main content section. This is where the core argument or information is presented. ]</p>
        <p>[ Fourth paragraph. Supporting details, examples, or case studies. ]</p>
        <p>[ Conclusion paragraph. Wrap up the post, summarize key points, and provide a call to action or closing thought. ]</p>
      </div>

      <!-- Action bar -->
      <div class="post-actions">
        <a href="blog.php" class="btn">← Back to Blog</a>
        <button class="btn primary" id="share-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Share
        </button>
        <div class="react-bar" style="border-top:none;padding-top:0;margin-top:0;">
          <button class="react-btn" data-react="like" data-base-count="24"><span class="react-emoji">👍</span><span class="react-count">24</span></button>
          <button class="react-btn" data-react="love" data-base-count="11"><span class="react-emoji">❤️</span><span class="react-count">11</span></button>
          <button class="react-btn" data-react="insightful" data-base-count="8"><span class="react-emoji">💡</span><span class="react-count">8</span></button>
          <button class="react-btn" data-react="bookmark" data-base-count="6"><span class="react-emoji">🔖</span><span class="react-count">6</span></button>
        </div>
      </div>

      <!-- Share feedback (shown briefly after copy) -->
      <div class="post-share-toast" id="share-toast">✓ Link copied to clipboard</div>

    </div>
  </article>
</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
<script>
  // Share button — copies current URL to clipboard
  document.getElementById('share-btn').addEventListener('click', async () => {
    const url = window.location.href;
    const toast = document.getElementById('share-toast');

    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2400);
      }
    } catch {
      const inp = document.createElement('input');
      inp.value = url;
      document.body.appendChild(inp);
      inp.select();
      document.execCommand('copy');
      document.body.removeChild(inp);
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2400);
    }
  });
</script>
</body>
</html>
