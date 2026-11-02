import { questions } from "./questions.js";
import { escapeHtml, formatMathText } from "./math-text.js";

const root = document.querySelector("#quiz-root");
const sections = [...new Set(questions.map(question => question.section))];
let answers = Array(questions.length).fill(null);
let current = 0;
let finished = false;

function score() {
  return answers.reduce((total, choice, index) => total + Number(choice === questions[index].answer), 0);
}

function visual(question) {
  const section = question.section;
  const shell = (label, content) => `<svg class="mini-visual" viewBox="0 0 240 170" role="img" aria-label="${label}"><rect width="240" height="170" fill="#f4f1e8"/>${content}</svg>`;
  if (question.slides[0] === "ROC AUC: Evaluation Before Choosing a Threshold") {
    return shell("Illustrative ROC curve with shaded area, recall on the vertical axis and false positive rate on the horizontal axis", `
      <text x="120" y="19" text-anchor="middle">Across thresholds</text>
      <path d="M36 135Q124 34 212 34V135Z" fill="#dce5f8"/>
      <path d="M36 28V135H220" fill="none" stroke="#697183"/>
      <path d="M36 135L212 34" fill="none" stroke="#697183" stroke-dasharray="4 3"/>
      <path d="M36 135Q124 34 212 34" fill="none" stroke="#315fc7" stroke-width="2.5"/>
      <circle cx="124" cy="59.25" r="4" fill="#bc7639"/>
      <text x="13" y="88" text-anchor="middle" transform="rotate(-90 13 88)">Recall</text>
      <text x="124" y="156" text-anchor="middle">False positive rate</text>`);
  }
  if (section === "Classification & metrics") {
    return shell("Schematic feature space with two decision regions and a boundary", `
      <path d="M32 137V30H212Z" fill="#dce5f8"/>
      <path d="M32 137H212V30Z" fill="#f5e6d1"/>
      <path d="M32 23V137H218" fill="none" stroke="#697183"/>
      <path d="M32 137L212 30" stroke="#697183" stroke-width="1.5" stroke-dasharray="4 3"/>
      <circle cx="65" cy="55" r="5" fill="#315fc7"/><circle cx="95" cy="75" r="5" fill="#315fc7"/><circle cx="130" cy="46" r="5" fill="#315fc7"/>
      <rect x="151" y="103" width="10" height="10" fill="#bc7639"/><rect x="186" y="77" width="10" height="10" fill="#bc7639"/>
      <text x="42" y="21">Feature space</text><text x="196" y="153">x₁</text><text x="16" y="36">x₂</text>
      <text x="33" y="161" class="visual-caption">Regions turn observations into decisions</text>`);
  }
  if (section === "Bayes decisions & risk") {
    return shell("Bayesian decision pipeline from priors and likelihoods to posteriors and a loss-based decision", `
      <rect x="22" y="18" width="76" height="30" rx="5" fill="#dce5f8" stroke="#8ca6df"/><text x="60" y="37" text-anchor="middle">Priors</text>
      <rect x="128" y="18" width="90" height="30" rx="5" fill="#f5e6d1" stroke="#bc9166"/><text x="173" y="37" text-anchor="middle">Likelihoods</text>
      <path d="M60 48V62H120V76M173 48V62H120M116 71L120 77L124 71" fill="none" stroke="#697183"/>
      <rect x="69" y="78" width="102" height="28" rx="5" fill="#e5f3ed" stroke="#61aa92"/><text x="120" y="96" text-anchor="middle">Posteriors</text>
      <path d="M120 106V122M116 117L120 123L124 117" fill="none" stroke="#697183"/><text x="136" y="119" class="visual-caption">+ loss</text>
      <rect x="69" y="125" width="102" height="27" rx="5" fill="#172139"/><text x="120" y="142" text-anchor="middle" style="fill:#fff">Decision</text>`);
  }
  return shell("Token order can be summarized by word counts in Multinomial Naive Bayes", `
    <text x="120" y="21" text-anchor="middle">Tokens → counts</text>
    <rect x="14" y="38" width="61" height="28" rx="5" fill="#dce5f8" stroke="#8ca6df"/><text x="44" y="56" text-anchor="middle">win</text>
    <rect x="87" y="38" width="66" height="28" rx="5" fill="#e9def6" stroke="#b8a0d0"/><text x="120" y="56" text-anchor="middle">money</text>
    <rect x="165" y="38" width="61" height="28" rx="5" fill="#dce5f8" stroke="#8ca6df"/><text x="195" y="56" text-anchor="middle">win</text>
    <path d="M44 68L82 103M120 68L155 103M195 68L82 103" fill="none" stroke="#a6adbc"/>
    <rect x="52" y="106" width="61" height="31" rx="5" fill="#dce5f8" stroke="#8ca6df"/><text x="82" y="125" text-anchor="middle">win: 2</text>
    <rect x="126" y="106" width="66" height="31" rx="5" fill="#e9def6" stroke="#b8a0d0"/><text x="159" y="125" text-anchor="middle">money: 1</text>
    <text x="120" y="158" text-anchor="middle" class="visual-caption">Repeated words contribute repeated evidence</text>`);
}

function renderQuestion() {
  const q = questions[current];
  const choice = answers[current];
  const answered = choice !== null;
  root.innerHTML = `<div class="quiz-layout">
    <aside class="lesson-rail" aria-label="Learning path">
      <p class="eyebrow">Learning path</p>
      <h2>From evidence to a class decision</h2>
      <ol>${sections.map((section, index) => `<li class="${q.section === section ? "active" : ""}" ${q.section === section ? 'aria-current="step"' : ""}><span>0${index + 1}</span>${escapeHtml(section)}</li>`).join("")}</ol>
      <div class="rail-note"><p>Answer first, then read the explanation. Your responses stay in this browser tab; nothing is submitted.</p></div>
    </aside>
    <section class="question-stage" aria-label="Quiz question">
      <p class="setup-note"><strong>Chapter scope:</strong> Classification metrics, Bayesian decisions, ROC AUC and Multinomial Naïve Bayes. Use the assumptions stated in each question. Choose one best answer, then check the explanation.</p>
      <div class="progress-row"><span>Question ${current + 1} of ${questions.length}</span><div class="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${current + 1}"><div style="width:${((current + 1) / questions.length) * 100}%"></div></div><strong>${score()} points</strong></div>
      <article class="question-card">
        <div class="question-top"><div><p class="question-label">${escapeHtml(q.category)}</p><h2 id="question-title" tabindex="-1">${formatMathText(q.prompt)}</h2></div>${visual(q)}</div>
        <div class="answers" role="group" aria-label="Answer choices">${q.options.map((option, index) => {
          const status = answered ? (index === q.answer ? "answer-correct" : index === choice ? "answer-wrong" : "") : "";
          const mark = answered && index === q.answer ? "✓" : answered && index === choice ? "×" : String.fromCharCode(65 + index);
          return `<button type="button" data-choice="${index}" ${answered ? "disabled" : ""} aria-pressed="${choice === index}" class="${status}"><span class="answer-mark" aria-hidden="true">${mark}</span><span class="answer-text">${formatMathText(option)}</span></button>`;
        }).join("")}</div>
        ${answered ? `<div class="feedback ${choice === q.answer ? "correct" : "incorrect"}" role="status" tabindex="-1"><strong>${choice === q.answer ? "Correct." : "Not quite."}</strong><p>${formatMathText(q.explanation)}</p><div class="try-it"><b>Check it:</b> ${formatMathText(q.activity)}</div><details class="slide-references"><summary>Revisit the chapter</summary><ul>${q.slides.map(title => `<li>${escapeHtml(title.replaceAll("``", "“").replaceAll("''", "”"))}</li>`).join("")}</ul></details></div>` : ""}
        <div class="card-actions"><button type="button" class="secondary" data-action="previous" ${current === 0 ? "disabled" : ""}>← Previous</button><button type="button" class="primary" data-action="next" ${!answered ? "disabled" : ""}>${current === questions.length - 1 ? "See results" : "Next question →"}</button></div>
      </article>
    </section>
  </div>`;
}

function renderResults() {
  const total = score();
  const summary = sections.map(section => {
    const indices = questions.map((question, index) => question.section === section ? index : -1).filter(index => index >= 0);
    const correct = indices.filter(index => answers[index] === questions[index].answer).length;
    return `<li><span>${escapeHtml(section)}</span><strong>${correct} / ${indices.length}</strong></li>`;
  }).join("");
  root.innerHTML = `<section class="results" aria-labelledby="results-title">
    <p class="eyebrow">Quiz complete</p>
    <div class="score-ring" style="--score:${(total / questions.length) * 360}deg"><span>${total}/${questions.length}</span></div>
    <h2 id="results-title" tabindex="-1">${total} out of ${questions.length} correct</h2>
    <p>Review the explanations to connect classification metrics, score ranking, error costs and word-count evidence.</p>
    <ul class="section-results">${summary}</ul>
    <div class="result-actions"><button type="button" class="secondary" data-action="review">Review answers</button><button type="button" class="primary" data-action="restart">Restart quiz</button></div>
  </section>`;
}

function render(focusTarget) {
  if (finished) renderResults(); else renderQuestion();
  if (focusTarget) root.querySelector(focusTarget)?.focus();
}

root.addEventListener("click", event => {
  const choiceButton = event.target.closest("[data-choice]");
  if (choiceButton && answers[current] === null) {
    answers[current] = Number(choiceButton.dataset.choice);
    render(".feedback");
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "previous" && current > 0) {
    current -= 1;
    render("#question-title");
  } else if (action === "next" && answers[current] !== null) {
    if (current === questions.length - 1) {
      finished = true;
      render("#results-title");
    } else {
      current += 1;
      render("#question-title");
    }
  } else if (action === "review") {
    finished = false;
    current = 0;
    render("#question-title");
  } else if (action === "restart") {
    answers = Array(questions.length).fill(null);
    current = 0;
    finished = false;
    render("#question-title");
  }
});

render();


