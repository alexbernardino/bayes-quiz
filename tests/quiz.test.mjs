import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { questions } from "../questions.js";
import { escapeHtml, formatMathText } from "../math-text.js";

const quizSource = (await readFile(new URL("../quiz.js", import.meta.url), "utf8"))
  .replace(/^import .*;\r?\n/gm, "");

// The controller uses delegated clicks and innerHTML. A small document adapter
// exercises its real code without installing a DOM package or starting a server.
function openQuiz() {
  let click;
  const focusHistory = [];
  const root = {
    innerHTML: "",
    addEventListener(type, listener) {
      assert.equal(type, "click");
      click = listener;
    },
    querySelector(selector) {
      return { focus: () => focusHistory.push(selector) };
    }
  };
  vm.runInNewContext(quizSource, {
    questions,
    escapeHtml,
    formatMathText,
    document: {
      querySelector(selector) {
        assert.equal(selector, "#quiz-root");
        return root;
      }
    }
  }, { filename: "quiz.js" });
  function dispatch(kind, value) {
    const button = { dataset: { [kind]: String(value) } };
    click({ target: { closest: selector => selector === `[data-${kind}]` ? button : null } });
  }
  return {
    get html() { return root.innerHTML; },
    focusHistory,
    choose: value => dispatch("choice", value),
    action: value => dispatch("action", value),
    button(kind, value) {
      const match = root.innerHTML.match(new RegExp(`<button\\b([^>]*data-${kind}="${value}"[^>]*)>`));
      assert.ok(match, `Expected ${kind}=${value} button`);
      return match[1];
    }
  };
}

function finish(quiz, select = question => question.answer) {
  questions.forEach((question, index) => {
    assert.match(quiz.html, new RegExp(`Question ${index + 1} of 20`));
    quiz.choose(select(question, index));
    quiz.action("next");
  });
}

test("question bank contains 20 complete, distinct, single-answer questions", () => {
  assert.equal(questions.length, 20);
  assert.equal(new Set(questions.map(question => question.prompt)).size, 20);
  questions.forEach((question, index) => {
    for (const key of ["section", "category", "prompt", "explanation", "activity"]) {
      assert.equal(typeof question[key], "string", `Question ${index + 1}: ${key}`);
      assert.ok(question[key].trim().length > 0);
    }
    assert.equal(question.options.length, 4);
    assert.equal(new Set(question.options).size, 4);
    assert.ok(question.options.every(option => typeof option === "string" && option.trim()));
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4);
    assert.ok(Array.isArray(question.slides) && question.slides.length > 0);
    assert.ok(question.slides.every(slide => typeof slide === "string" && slide.trim()));
  });
});

test("answer positions are balanced and sections follow the chapter's 5/6/9 progression", () => {
  const positions = [0, 0, 0, 0];
  const sections = new Map();
  for (const question of questions) {
    positions[question.answer] += 1;
    sections.set(question.section, (sections.get(question.section) || 0) + 1);
  }
  assert.deepEqual(positions, [5, 5, 5, 5]);
  assert.deepEqual([...sections], [
    ["Classification & error", 5],
    ["Bayes decisions & risk", 6],
    ["Multinomial Naive Bayes", 9]
  ]);
  assert.deepEqual(questions.map(question => question.section), [
    ...Array(5).fill("Classification & error"),
    ...Array(6).fill("Bayes decisions & risk"),
    ...Array(9).fill("Multinomial Naive Bayes")
  ]);
});

test("math notation renders hats, products, combined indices and nested powers", () => {
  assert.equal(formatMathText("θ̂_{i,k}"), "θ̂<sub>i,k</sub>");
  assert.equal(formatMathText("π̂_{spam}"), "π̂<sub>spam</sub>");
  assert.equal(formatMathText("∏_i θ_{i,k}^{z_i}"), "∏<sub>i</sub> θ<sub>i,k</sub><sup>z<sub>i</sub></sup>");
  assert.equal(formatMathText("Σ_i z_i = T"), "Σ<sub>i</sub> z<sub>i</sub> = T");
  assert.equal(formatMathText("R = ∫ c_{ŷ(x)}(x)p(x) dx"), "R = ∫ c<sub>ŷ(x)</sub>(x)p(x) dx");
  assert.equal(formatMathText("P_{01} + P_{10}"), "P<sub>01</sub> + P<sub>10</sub>");
  assert.equal(formatMathText("(1/8)^0 = 1"), "(1/8)<sup>0</sup> = 1");
  assert.equal(formatMathText("P̂(predicted 0 | true 1)"), "P̂(predicted 0 | true 1)");
  assert.equal(formatMathText("No formula here; 3/8 = 0.375."), "No formula here; 3/8 = 0.375.");
});

test("all bank formulas are rendered, with no raw index markers left behind", () => {
  for (const question of questions) {
    for (const value of [question.prompt, ...question.options, question.explanation, question.activity]) {
      const rendered = formatMathText(value);
      assert.doesNotMatch(rendered, /[_^](?:\{|[\p{L}\p{N}])/u, value);
    }
  }
});

test("ordinary text and math index contents cannot inject HTML", () => {
  assert.equal(escapeHtml('<script a="x">&\'</script>'), "&lt;script a=&quot;x&quot;&gt;&amp;&#39;&lt;/script&gt;");
  assert.equal(formatMathText('<img src=x onerror="alert(1)">'), "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  assert.equal(formatMathText('θ̂_{<b>&"\'}</b>'), "θ̂<sub>&lt;b&gt;&amp;&quot;&#39;</sub>&lt;/b&gt;");
  assert.equal(formatMathText("x < 1 & y > 0"), "x &lt; 1 &amp; y &gt; 0");
  assert.equal(escapeHtml(42), "42");
});

test("initial state requires an answer before advancing", () => {
  const quiz = openQuiz();
  assert.match(quiz.html, /Question 1 of 20/);
  assert.match(quiz.html, /0 points/);
  assert.match(quiz.button("action", "previous"), /\bdisabled\b/);
  assert.match(quiz.button("action", "next"), /\bdisabled\b/);
  assert.doesNotMatch(quiz.html, /class="feedback/);
  for (let choice = 0; choice < 4; choice++) {
    assert.doesNotMatch(quiz.button("choice", choice), /\bdisabled\b/);
  }
  quiz.action("next");
  quiz.action("previous");
  assert.match(quiz.html, /Question 1 of 20/);
});

test("correct answer reveals explanation, locks choices and cannot be rescored on revisit", () => {
  const quiz = openQuiz();
  quiz.choose(questions[0].answer);
  assert.match(quiz.html, /class="feedback correct"/);
  assert.match(quiz.html, /<strong>Correct\.<\/strong>/);
  assert.match(quiz.html, /1 points/);
  assert.ok(quiz.html.includes(formatMathText(questions[0].explanation)));
  assert.ok(quiz.html.includes(formatMathText(questions[0].activity)));
  assert.equal(quiz.focusHistory.at(-1), ".feedback");
  assert.doesNotMatch(quiz.button("action", "next"), /\bdisabled\b/);
  for (let choice = 0; choice < 4; choice++) {
    assert.match(quiz.button("choice", choice), /\bdisabled\b/);
  }
  quiz.choose((questions[0].answer + 1) % 4);
  assert.match(quiz.html, /class="feedback correct"/);
  assert.match(quiz.html, /1 points/);
  quiz.action("next");
  assert.match(quiz.html, /Question 2 of 20/);
  assert.match(quiz.button("action", "next"), /\bdisabled\b/);
  quiz.action("previous");
  assert.match(quiz.html, /Question 1 of 20/);
  quiz.choose(questions[0].answer);
  assert.match(quiz.html, /1 points/);
  assert.match(quiz.button("choice", questions[0].answer), /answer-correct/);
});

test("incorrect answer is marked separately from the correct answer and earns zero", () => {
  const quiz = openQuiz();
  const wrong = (questions[0].answer + 1) % 4;
  quiz.choose(wrong);
  assert.match(quiz.html, /class="feedback incorrect"/);
  assert.match(quiz.html, /<strong>Not quite\.<\/strong>/);
  assert.match(quiz.html, /0 points/);
  assert.match(quiz.button("choice", wrong), /answer-wrong/);
  assert.match(quiz.button("choice", wrong), /aria-pressed="true"/);
  assert.match(quiz.button("choice", questions[0].answer), /answer-correct/);
  assert.match(quiz.button("choice", questions[0].answer), /aria-pressed="false"/);
  quiz.choose(questions[0].answer);
  assert.match(quiz.html, /0 points/);
});

test("all correct answers yield 20/20 and section totals of 5/5, 6/6 and 9/9", () => {
  const quiz = openQuiz();
  finish(quiz);
  assert.match(quiz.html, /20 out of 20 correct/);
  assert.match(quiz.html, /<span>20\/20<\/span>/);
  assert.match(quiz.html, /Classification &amp; error<\/span><strong>5 \/ 5/);
  assert.match(quiz.html, /Bayes decisions &amp; risk<\/span><strong>6 \/ 6/);
  assert.match(quiz.html, /Multinomial Naive Bayes<\/span><strong>9 \/ 9/);
  assert.equal(quiz.focusHistory.at(-1), "#results-title");
});

test("all incorrect answers yield 0/20 without losing section totals", () => {
  const quiz = openQuiz();
  finish(quiz, question => (question.answer + 1) % 4);
  assert.match(quiz.html, /0 out of 20 correct/);
  assert.match(quiz.html, /<span>0\/20<\/span>/);
  assert.match(quiz.html, /Classification &amp; error<\/span><strong>0 \/ 5/);
  assert.match(quiz.html, /Bayes decisions &amp; risk<\/span><strong>0 \/ 6/);
  assert.match(quiz.html, /Multinomial Naive Bayes<\/span><strong>0 \/ 9/);
});

test("mixed answers produce independent section scores and the last answer is required", () => {
  const quiz = openQuiz();
  questions.forEach((question, index) => {
    if (index === questions.length - 1) {
      assert.match(quiz.html, /See results/);
      assert.match(quiz.button("action", "next"), /\bdisabled\b/);
      quiz.action("next");
      assert.match(quiz.html, /Question 20 of 20/);
      assert.doesNotMatch(quiz.html, /Quiz complete/);
    }
    quiz.choose(index % 2 === 0 ? question.answer : (question.answer + 1) % 4);
    quiz.action("next");
  });
  assert.match(quiz.html, /10 out of 20 correct/);
  assert.match(quiz.html, /Classification &amp; error<\/span><strong>3 \/ 5/);
  assert.match(quiz.html, /Bayes decisions &amp; risk<\/span><strong>3 \/ 6/);
  assert.match(quiz.html, /Multinomial Naive Bayes<\/span><strong>4 \/ 9/);
});

test("review preserves responses and restart resets answers, score and navigation", () => {
  const quiz = openQuiz();
  finish(quiz);
  quiz.action("review");
  assert.match(quiz.html, /Question 1 of 20/);
  assert.match(quiz.html, /20 points/);
  assert.match(quiz.html, /class="feedback correct"/);
  assert.match(quiz.button("choice", questions[0].answer), /\bdisabled\b/);
  for (let index = 0; index < questions.length; index++) quiz.action("next");
  assert.match(quiz.html, /20 out of 20 correct/);
  quiz.action("restart");
  assert.match(quiz.html, /Question 1 of 20/);
  assert.match(quiz.html, /0 points/);
  assert.doesNotMatch(quiz.html, /class="feedback/);
  assert.match(quiz.button("action", "next"), /\bdisabled\b/);
  assert.match(quiz.button("action", "previous"), /\bdisabled\b/);
  assert.doesNotMatch(quiz.button("choice", questions[0].answer), /\bdisabled\b/);
  quiz.choose(questions[0].answer);
  assert.match(quiz.html, /1 points/);
  quiz.action("next");
  assert.match(quiz.button("action", "next"), /\bdisabled\b/);
});
