<?php
$page_title  = 'Blog';
$active_page = 'blog';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>
  <section class="section">
    <div class="section-title">Blog</div>

    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">[ All ]</button>
      <button class="filter-btn" data-filter="tech">[ Tech ]</button>
      <button class="filter-btn" data-filter="design">[ Design ]</button>
      <button class="filter-btn" data-filter="life">[ Life ]</button>
    </div>

    <div class="blog-grid">

      <div class="blog-card" data-category="tech" data-post-id="post-1">
        <div class="placeholder-img md">[ Post Image ]</div>
        <div class="card-body">
          <div class="blog-meta">[ Jan 1, 2024 ] · [ 5 min read ]</div>
          <div class="card-title">[ Blog Post Title ]</div>
          <p class="card-text">[ Short excerpt from the blog post. A couple of sentences to give the reader a preview. ]</p>
          <div class="card-tags"><span class="tag">[ Tech ]</span></div>
          <a href="post.php"><button class="btn sm" style="margin-top:10px;">[ Read More ]</button></a>
          <div class="react-bar">
            <button class="react-btn" data-react="like" data-base-count="12"><span class="react-emoji">👍</span><span class="react-count">12</span></button>
            <button class="react-btn" data-react="love" data-base-count="5"><span class="react-emoji">❤️</span><span class="react-count">5</span></button>
            <button class="react-btn" data-react="insightful" data-base-count="3"><span class="react-emoji">💡</span><span class="react-count">3</span></button>
          </div>
        </div>
      </div>

      <div class="blog-card" data-category="design" data-post-id="post-2">
        <div class="placeholder-img md">[ Post Image ]</div>
        <div class="card-body">
          <div class="blog-meta">[ Feb 10, 2024 ] · [ 3 min read ]</div>
          <div class="card-title">[ Blog Post Title ]</div>
          <p class="card-text">[ Short excerpt from the blog post. A couple of sentences to give the reader a preview. ]</p>
          <div class="card-tags"><span class="tag">[ Design ]</span></div>
          <a href="post.php"><button class="btn sm" style="margin-top:10px;">[ Read More ]</button></a>
          <div class="react-bar">
            <button class="react-btn" data-react="like" data-base-count="8"><span class="react-emoji">👍</span><span class="react-count">8</span></button>
            <button class="react-btn" data-react="love" data-base-count="14"><span class="react-emoji">❤️</span><span class="react-count">14</span></button>
            <button class="react-btn" data-react="insightful" data-base-count="6"><span class="react-emoji">💡</span><span class="react-count">6</span></button>
          </div>
        </div>
      </div>

      <div class="blog-card" data-category="life" data-post-id="post-3">
        <div class="placeholder-img md">[ Post Image ]</div>
        <div class="card-body">
          <div class="blog-meta">[ Mar 5, 2024 ] · [ 7 min read ]</div>
          <div class="card-title">[ Blog Post Title ]</div>
          <p class="card-text">[ Short excerpt from the blog post. A couple of sentences to give the reader a preview. ]</p>
          <div class="card-tags"><span class="tag">[ Life ]</span></div>
          <a href="post.php"><button class="btn sm" style="margin-top:10px;">[ Read More ]</button></a>
          <div class="react-bar">
            <button class="react-btn" data-react="like" data-base-count="20"><span class="react-emoji">👍</span><span class="react-count">20</span></button>
            <button class="react-btn" data-react="love" data-base-count="9"><span class="react-emoji">❤️</span><span class="react-count">9</span></button>
            <button class="react-btn" data-react="insightful" data-base-count="4"><span class="react-emoji">💡</span><span class="react-count">4</span></button>
          </div>
        </div>
      </div>

      <div class="blog-card" data-category="tech" data-post-id="post-4">
        <div class="placeholder-img md">[ Post Image ]</div>
        <div class="card-body">
          <div class="blog-meta">[ Apr 20, 2024 ] · [ 4 min read ]</div>
          <div class="card-title">[ Blog Post Title ]</div>
          <p class="card-text">[ Short excerpt from the blog post. A couple of sentences to give the reader a preview. ]</p>
          <div class="card-tags"><span class="tag">[ Tech ]</span></div>
          <a href="post.php"><button class="btn sm" style="margin-top:10px;">[ Read More ]</button></a>
          <div class="react-bar">
            <button class="react-btn" data-react="like" data-base-count="7"><span class="react-emoji">👍</span><span class="react-count">7</span></button>
            <button class="react-btn" data-react="love" data-base-count="4"><span class="react-emoji">❤️</span><span class="react-count">4</span></button>
            <button class="react-btn" data-react="insightful" data-base-count="11"><span class="react-emoji">💡</span><span class="react-count">11</span></button>
          </div>
        </div>
      </div>

      <div class="blog-card" data-category="design" data-post-id="post-5">
        <div class="placeholder-img md">[ Post Image ]</div>
        <div class="card-body">
          <div class="blog-meta">[ May 15, 2024 ] · [ 6 min read ]</div>
          <div class="card-title">[ Blog Post Title ]</div>
          <p class="card-text">[ Short excerpt from the blog post. A couple of sentences to give the reader a preview. ]</p>
          <div class="card-tags"><span class="tag">[ Design ]</span></div>
          <a href="post.php"><button class="btn sm" style="margin-top:10px;">[ Read More ]</button></a>
          <div class="react-bar">
            <button class="react-btn" data-react="like" data-base-count="15"><span class="react-emoji">👍</span><span class="react-count">15</span></button>
            <button class="react-btn" data-react="love" data-base-count="7"><span class="react-emoji">❤️</span><span class="react-count">7</span></button>
            <button class="react-btn" data-react="insightful" data-base-count="5"><span class="react-emoji">💡</span><span class="react-count">5</span></button>
          </div>
        </div>
      </div>

      <div class="blog-card" data-category="life" data-post-id="post-6">
        <div class="placeholder-img md">[ Post Image ]</div>
        <div class="card-body">
          <div class="blog-meta">[ Jun 1, 2024 ] · [ 2 min read ]</div>
          <div class="card-title">[ Blog Post Title ]</div>
          <p class="card-text">[ Short excerpt from the blog post. A couple of sentences to give the reader a preview. ]</p>
          <div class="card-tags"><span class="tag">[ Life ]</span></div>
          <a href="post.php"><button class="btn sm" style="margin-top:10px;">[ Read More ]</button></a>
          <div class="react-bar">
            <button class="react-btn" data-react="like" data-base-count="10"><span class="react-emoji">👍</span><span class="react-count">10</span></button>
            <button class="react-btn" data-react="love" data-base-count="6"><span class="react-emoji">❤️</span><span class="react-count">6</span></button>
            <button class="react-btn" data-react="insightful" data-base-count="4"><span class="react-emoji">💡</span><span class="react-count">4</span></button>
          </div>
        </div>
      </div>

    </div>
  </section>
</main>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
</body>
</html>
