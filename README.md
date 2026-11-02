# Bayes classification concept check

A 20-question formative quiz for the MSc Machine Learning chapter on statistical classification, Bayesian decision theory and Multinomial Naive Bayes.

The appearance and interactions follow the existing [MLP quiz](https://alexbernardino.github.io/mlp-quiz/) and [CNN/Transformer quiz](https://alexbernardino.github.io/cnn-transformer-quiz/): a learning-path sidebar, four answer choices, immediate explanations, short “Check it” exercises, progress and score, a section summary, answer review and restart. Each explanation also lists the relevant lecture-slide titles.

## Coverage

| Questions | Section | Main topics |
|---|---|---|
| 1–5 | Classification & error | Discriminant scores, decision regions, confusion matrices, class priors and threshold errors |
| 6–11 | Bayes decisions & risk | Bayes' rule, MAP, conditional versus overall error, unequal loss, expected risk and pointwise minimization |
| 12–20 | Multinomial Naive Bayes | Tokens versus counts, length assumptions, parameter estimation, multinomial coefficient, log scores, smoothing and email classification |

Each question has one best answer. Correct answers are balanced across A–D. The quiz combines short calculations with conceptual questions. The longer Gaussian, binomial and exponential derivations are left for the lecture exercises.

Notation follows the chapter: x is the document's token sequence; z is its count vector; k indexes classes; i indexes vocabulary words; t indexes token positions. The email model conditions on observed document length, with the same length distribution in every class.

The question bank is based on the illustrated chapter prepared on 2 November 2026. Slide references use titles so reordering the course does not invalidate them.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Open **http://localhost:8000/**. Stop the server with Ctrl+C when finished. Use a local server because the quiz loads JavaScript modules; double-clicking index.html may not work.

The published quiz is a static site. It requires no build, package installation, backend, account or third-party runtime library. It has no external fonts or analytics. Responses remain in memory in the open browser tab, and refreshing starts a new attempt.

## Publish in your bayes-quiz repository

Your repository is [alexbernardino/bayes-quiz](https://github.com/alexbernardino/bayes-quiz). It was empty when this quiz was prepared. The following steps publish the quiz there.

### Option 1: upload through GitHub

1. Extract the supplied ZIP.
2. Open the repository and choose **Add file → Upload files**. On an empty repository, use the **uploading an existing file** link if shown.
3. Upload the **contents** of the bayes-quiz folder to the repository root. Do not upload the ZIP itself or place the whole folder one level below the root. In particular, index.html must be at the top level. Commit the upload to main.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
6. Select **main** and **/(root)**, then click **Save**.
7. Wait for the Pages deployment to finish. GitHub shows the published link in the Pages settings; deployment status is available in Actions.

The expected URL after publication is:

**https://alexbernardino.github.io/bayes-quiz/**

The six runtime files are index.html, styles.css, quiz.js, questions.js, math-text.js and favicon.svg. README.md, QUESTION_GUIDE.md, tests, package.json and the QR images support teaching and maintenance; they can be uploaded with the site. The optional hidden .nojekyll file explicitly disables Jekyll processing.

### Option 2: push from Terminal

Open Terminal in this extracted bayes-quiz folder, then run:

```sh
git init
git add .
git commit -m "Add Bayes classification quiz"
git branch -M main
git remote add origin https://github.com/alexbernardino/bayes-quiz.git
git push -u origin main
```

Then configure **Settings → Pages → Deploy from a branch → main → /(root)** as above. If you have added commits to the repository since this quiz was prepared, clone the repository first, copy these files into that clone, and commit and push normally.

[Official GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Editing and checking

- Edit questions.js to change the live question bank.
- QUESTION_GUIDE.md is a readable question bank with an answer key, explanations and follow-up exercises for the instructor. Update it when changing the bank.
- The answer field is a zero-based option index: 0 = A, 1 = B, 2 = C, 3 = D.
- Each question includes section, category, prompt, four options, answer, explanation, activity and slides.
- The local math renderer supports Unicode symbols, braced subscripts and superscripts, including estimated parameters. It is not a full LaTeX renderer; avoid LaTeX commands.

With Node.js 22 or later, run:

```sh
npm test
```

No package installation is required. The checks cover the question bank, notation rendering and quiz interactions.

## QR codes for your slides

- bayes-quiz-qr.png: raster image for slides.
- bayes-quiz-qr.svg: scalable image for printing.

Both encode the expected published URL above. The link becomes available after you publish the repository through GitHub Pages.
