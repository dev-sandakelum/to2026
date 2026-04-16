<?php
$page_title  = 'Quiz Play';
$active_page = 'quiz';
include 'components/head.php';
?>
<body>

<?php include 'components/navbar.php'; ?>

<main>
  <div class="quiz-play-layout">

    <!-- LEFT: Quiz Panel -->
    <div class="quiz-play-main">

      <!-- Quiz Header -->
      <div class="quiz-play-header section">
        <div class="quiz-play-breadcrumb">
          <a href="quiz.php">[ ← All Quizzes ]</a>
          <span class="quiz-play-sep">/</span>
          <span id="play-cat-name">[ Web Development ]</span>
        </div>
        <div class="quiz-play-meta">
          <span class="tag" id="play-difficulty">[ Medium ]</span>
          <span style="font-size:12px;color:var(--text-muted);" id="play-total-q">[ 20 Questions ]</span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="quiz-play-progress-wrap section" style="padding:16px 24px;">
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:6px;">
          <span id="q-counter">[ Question 1 of 5 ]</span>
          <span id="q-score">[ Score: 0 ]</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" id="progress-fill" style="width:20%;"></div>
        </div>
        <div class="quiz-step-dots" id="step-dots"></div>
      </div>

      <!-- Question Card -->
      <div class="section quiz-question-card">
        <div class="quiz-q-num" id="q-num">[ Q1 ]</div>
        <div class="question-box" id="question-text">[ Question placeholder text goes here? ]</div>

        <ul class="options-list" id="options-list">
          <li class="option-item" data-idx="0">[ Option A ]</li>
          <li class="option-item" data-idx="1">[ Option B ]</li>
          <li class="option-item" data-idx="2">[ Option C ]</li>
          <li class="option-item" data-idx="3">[ Option D ]</li>
        </ul>

        <!-- Feedback -->
        <div class="quiz-feedback" id="quiz-feedback" style="display:none;"></div>

        <!-- Controls -->
        <div class="quiz-controls">
          <button class="btn" id="skip-btn">[ Skip ]</button>
          <button class="btn primary" id="next-btn" disabled>[ Next Question ]</button>
        </div>
      </div>

    </div>

    <!-- RIGHT: Sidebar -->
    <aside class="quiz-play-sidebar">

      <!-- Score Card -->
      <div class="section quiz-score-card">
        <div class="section-title">[ Score ]</div>
        <div class="quiz-score-row">
          <span class="quiz-score-label">[ Correct ]</span>
          <span class="quiz-score-val correct" id="score-correct">0</span>
        </div>
        <div class="quiz-score-row">
          <span class="quiz-score-label">[ Wrong ]</span>
          <span class="quiz-score-val wrong" id="score-wrong">0</span>
        </div>
        <div class="quiz-score-row">
          <span class="quiz-score-label">[ Skipped ]</span>
          <span class="quiz-score-val" id="score-skipped">0</span>
        </div>
        <div class="quiz-score-row" style="border-top:1px solid var(--border);margin-top:8px;padding-top:8px;">
          <span class="quiz-score-label">[ Remaining ]</span>
          <span class="quiz-score-val" id="score-remaining">5</span>
        </div>
      </div>

      <!-- Question Map -->
      <div class="section">
        <div class="section-title">[ Question Map ]</div>
        <div class="quiz-q-map" id="q-map"></div>
        <div class="quiz-map-legend">
          <span class="quiz-map-dot answered"></span> [ Answered ]
          <span class="quiz-map-dot current"></span> [ Current ]
          <span class="quiz-map-dot"></span> [ Pending ]
        </div>
      </div>

      <!-- Actions -->
      <div class="section">
        <div class="section-title">[ Actions ]</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button class="btn sm" data-modal-open="modal-quit">[ Quit Quiz ]</button>
          <button class="btn sm" id="restart-btn">[ Restart ]</button>
          <a href="quiz.php"><button class="btn sm">[ All Quizzes ]</button></a>
        </div>
      </div>

    </aside>

  </div>

  <!-- Results Screen (hidden until quiz ends) -->
  <div class="quiz-results section" id="quiz-results" style="display:none;">
    <div class="section-title">[ Results ]</div>
    <div class="quiz-results-inner">
      <div class="quiz-results-score">
        <div class="quiz-results-big" id="results-pct">[ 0% ]</div>
        <div style="font-size:13px;color:var(--text-muted);">[ Final Score ]</div>
      </div>
      <div class="quiz-results-breakdown">
        <div class="quiz-score-row"><span class="quiz-score-label">[ Correct ]</span><span class="quiz-score-val correct" id="res-correct">0</span></div>
        <div class="quiz-score-row"><span class="quiz-score-label">[ Wrong ]</span><span class="quiz-score-val wrong" id="res-wrong">0</span></div>
        <div class="quiz-score-row"><span class="quiz-score-label">[ Skipped ]</span><span class="quiz-score-val" id="res-skipped">0</span></div>
      </div>
      <div class="quiz-results-msg" id="results-msg">[ Placeholder result message based on score. ]</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;">
        <button class="btn primary" id="results-restart">[ Try Again ]</button>
        <a href="quiz.php"><button class="btn">[ Back to Quizzes ]</button></a>
      </div>
    </div>
  </div>

</main>

<!-- Quit Modal -->
<div class="modal-overlay" id="modal-quit">
  <div class="modal-box">
    <div class="modal-header"><strong>[ Quit Quiz? ]</strong><button class="modal-close">✕</button></div>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">[ Your progress will be lost. Are you sure you want to quit? ]</p>
    <div style="display:flex;gap:8px;">
      <a href="quiz.php"><button class="btn primary sm">[ Yes, Quit ]</button></a>
      <button class="btn sm modal-close">[ Cancel ]</button>
    </div>
  </div>
</div>

<?php include 'components/modal-profile.php'; ?>

<?php include 'components/scripts.php'; ?>
<script>
const quizData = [
  { q: '[ Question 1: Placeholder question text goes here? ]', opts: ['[ Option A ]', '[ Option B ]', '[ Option C ]', '[ Option D ]'], answer: 0 },
  { q: '[ Question 2: Placeholder question text goes here? ]', opts: ['[ Option A ]', '[ Option B ]', '[ Option C ]', '[ Option D ]'], answer: 1 },
  { q: '[ Question 3: Placeholder question text goes here? ]', opts: ['[ Option A ]', '[ Option B ]', '[ Option C ]', '[ Option D ]'], answer: 2 },
  { q: '[ Question 4: Placeholder question text goes here? ]', opts: ['[ Option A ]', '[ Option B ]', '[ Option C ]', '[ Option D ]'], answer: 3 },
  { q: '[ Question 5: Placeholder question text goes here? ]', opts: ['[ Option A ]', '[ Option B ]', '[ Option C ]', '[ Option D ]'], answer: 0 },
];

let current = 0;
let score = { correct: 0, wrong: 0, skipped: 0 };
let answered = new Array(quizData.length).fill(null);
let selected = null;

const qText     = document.getElementById('question-text');
const optList   = document.getElementById('options-list');
const nextBtn   = document.getElementById('next-btn');
const skipBtn   = document.getElementById('skip-btn');
const feedback  = document.getElementById('quiz-feedback');
const qCounter  = document.getElementById('q-counter');
const qScore    = document.getElementById('q-score');
const qNum      = document.getElementById('q-num');
const progFill  = document.getElementById('progress-fill');
const qMap      = document.getElementById('q-map');
const stepDots  = document.getElementById('step-dots');
const results   = document.getElementById('quiz-results');

function buildMap() {
  qMap.innerHTML = '';
  stepDots.innerHTML = '';
  quizData.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'quiz-map-btn';
    dot.textContent = i + 1;
    if (answered[i] === 'correct') dot.classList.add('correct');
    else if (answered[i] === 'wrong') dot.classList.add('wrong');
    else if (answered[i] === 'skipped') dot.classList.add('skipped');
    if (i === current) dot.classList.add('current');
    dot.addEventListener('click', () => { current = i; loadQuestion(); });
    qMap.appendChild(dot);

    const sd = document.createElement('span');
    sd.className = 'step-dot';
    if (answered[i] === 'correct') sd.classList.add('correct');
    else if (answered[i] === 'wrong') sd.classList.add('wrong');
    else if (answered[i] === 'skipped') sd.classList.add('skipped');
    if (i === current) sd.classList.add('current');
    stepDots.appendChild(sd);
  });
}

function updateScorePanel() {
  document.getElementById('score-correct').textContent = score.correct;
  document.getElementById('score-wrong').textContent = score.wrong;
  document.getElementById('score-skipped').textContent = score.skipped;
  const remaining = answered.filter(a => a === null).length;
  document.getElementById('score-remaining').textContent = remaining;
  qScore.textContent = `[ Score: ${score.correct} ]`;
}

function loadQuestion() {
  selected = null;
  feedback.style.display = 'none';
  nextBtn.disabled = true;

  const data = quizData[current];
  qText.textContent = data.q;
  qNum.textContent = `[ Q${current + 1} ]`;
  qCounter.textContent = `[ Question ${current + 1} of ${quizData.length} ]`;
  progFill.style.width = ((current + 1) / quizData.length * 100) + '%';

  optList.innerHTML = '';
  data.opts.forEach((opt, i) => {
    const li = document.createElement('li');
    li.className = 'option-item';
    li.dataset.idx = i;
    li.textContent = opt;

    if (answered[current] !== null) {
      li.style.pointerEvents = 'none';
      if (i === data.answer) li.classList.add('correct-ans');
      nextBtn.disabled = false;
    }

    li.addEventListener('click', () => {
      if (answered[current] !== null) return;
      optList.querySelectorAll('.option-item').forEach(o => o.classList.remove('selected'));
      li.classList.add('selected');
      selected = i;
      nextBtn.disabled = false;
    });
    optList.appendChild(li);
  });

  buildMap();
  updateScorePanel();
}

function submitAnswer(skipped) {
  if (answered[current] !== null) return;

  const data = quizData[current];
  optList.querySelectorAll('.option-item').forEach(o => o.style.pointerEvents = 'none');

  if (skipped) {
    answered[current] = 'skipped';
    score.skipped++;
    feedback.textContent = '[ Skipped — correct answer highlighted below ]';
    feedback.className = 'quiz-feedback skipped';
  } else {
    const isCorrect = selected === data.answer;
    if (isCorrect) {
      answered[current] = 'correct';
      score.correct++;
      feedback.textContent = '[ Correct! ]';
      feedback.className = 'quiz-feedback correct';
    } else {
      answered[current] = 'wrong';
      score.wrong++;
      feedback.textContent = '[ Wrong — see correct answer below ]';
      feedback.className = 'quiz-feedback wrong';
    }
  }

  optList.querySelectorAll('.option-item').forEach((li, i) => {
    if (i === data.answer) li.classList.add('correct-ans');
    else if (i === selected && !skipped) li.classList.add('wrong-ans');
  });

  feedback.style.display = 'block';
  nextBtn.disabled = false;
  nextBtn.textContent = current < quizData.length - 1 ? '[ Next Question ]' : '[ See Results ]';
  buildMap();
  updateScorePanel();
}

nextBtn.addEventListener('click', () => {
  if (answered[current] === null && selected !== null) submitAnswer(false);
  else if (answered[current] !== null) {
    if (current < quizData.length - 1) {
      current++;
      loadQuestion();
    } else {
      showResults();
    }
  }
});

skipBtn.addEventListener('click', () => {
  if (answered[current] !== null) return;
  submitAnswer(true);
});

function showResults() {
  document.querySelector('.quiz-play-layout').style.display = 'none';
  results.style.display = 'block';
  const total = quizData.length;
  const pct = Math.round((score.correct / total) * 100);
  document.getElementById('results-pct').textContent = `[ ${pct}% ]`;
  document.getElementById('res-correct').textContent = score.correct;
  document.getElementById('res-wrong').textContent = score.wrong;
  document.getElementById('res-skipped').textContent = score.skipped;
  const msg = pct >= 80 ? '[ Great job! You scored very well. ]'
            : pct >= 50 ? '[ Good effort! Keep practicing. ]'
            : '[ Keep going — review the material and try again. ]';
  document.getElementById('results-msg').textContent = msg;
}

function restartQuiz() {
  current = 0;
  score = { correct: 0, wrong: 0, skipped: 0 };
  answered = new Array(quizData.length).fill(null);
  selected = null;
  results.style.display = 'none';
  document.querySelector('.quiz-play-layout').style.display = '';
  nextBtn.textContent = '[ Next Question ]';
  loadQuestion();
}

document.getElementById('restart-btn').addEventListener('click', restartQuiz);
document.getElementById('results-restart').addEventListener('click', restartQuiz);

loadQuestion();
</script>
</body>
</html>
