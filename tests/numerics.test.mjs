import test from "node:test";
import assert from "node:assert/strict";
import { questions } from "../questions.js";

const close = (actual, expected, tolerance = 1e-12) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);
const selected = number => questions[number - 1].options[questions[number - 1].answer];
const sum = values => values.reduce((total, value) => total + value, 0);
const normalize = values => values.map(value => value / sum(values));

test("confusion frequencies distinguish total error from within-class error", () => {
  const counts = [[4, 0], [1, 2]];
  const n = sum(counts.flat());
  const totalError = sum(counts.map((row, truth) => sum(row.filter((_, prediction) => truth !== prediction)))) / n;
  const errorAmongClass1 = counts[1][0] / sum(counts[1]);
  close(totalError, 1 / 7);
  close(errorAmongClass1, 1 / 3);
  assert.match(selected(2), /^1\/7 and 1\/3/);
  close(sum([0.8, 0.2].map((prior, k) => prior * [0.1, 0.4][k])), 0.16);
  assert.match(selected(5), /^0\.16/);
});

test("fish metrics use actual-class and predicted-class denominators", () => {
  const [tn, fp, fn, tp] = [4, 0, 1, 2];
  const precision = tp / (tp + fp);
  const recall = tp / (tp + fn);
  const specificity = tn / (tn + fp);
  const fpr = fp / (tn + fp);
  close(precision, 1);
  close(recall, 2 / 3);
  close(specificity, 1);
  close(fpr, 1 - specificity);
  assert.match(selected(3), /1.*2\/3.*1/);
});

test("an all-negative classifier has 99% accuracy, zero F1 and 50% balanced accuracy", () => {
  const [tn, fp, fn, tp] = [99, 0, 1, 0];
  const accuracy = (tn + tp) / (tn + fp + fn + tp);
  const recall = tp / (tp + fn);
  const specificity = tn / (tn + fp);
  const precision = tp / (tp + fp);
  const f1 = 2 * tp / (2 * tp + fp + fn);
  const balancedAccuracy = (recall + specificity) / 2;
  close(accuracy, 0.99);
  close(recall, 0);
  close(specificity, 1);
  assert.ok(Number.isNaN(precision), "No positive predictions makes precision undefined, not zero.");
  close(f1, 0);
  close(balancedAccuracy, 0.5);
  assert.match(selected(6), /99%.*0.*50%/);
});

test("balanced accuracy is unchanged by swapping class names, while positive-class F1 changes", () => {
  const metrics = ([tn, fp, fn, tp]) => ({
    f1: 2 * tp / (2 * tp + fp + fn),
    balancedAccuracy: (tp / (tp + fn) + tn / (tn + fp)) / 2
  });
  const original = metrics([90, 10, 10, 10]);
  close(original.f1, 0.5);
  close(original.balancedAccuracy, 0.7);
  const swapped = metrics([10, 10, 10, 90]);
  close(swapped.f1, 0.9);
  close(swapped.balancedAccuracy, original.balancedAccuracy);
  assert.match(selected(7), /0\.5.*0\.7/);
});

test("Bayes normalization uses both prior and likelihood", () => {
  const posterior = normalize([0.4 * 0.2, 0.6 * 0.3]);
  close(posterior[1], 9 / 13);
  close(sum(posterior), 1);
  assert.match(selected(8), /^9\/13/);
  const unequalPriors = normalize([0.9 * 0.2, 0.1 * 0.6]);
  assert.ok(unequalPriors[0] > unequalPriors[1]);
  close(1 - unequalPriors[0], 1 / 4);
  assert.match(selected(9), /^Class 0; conditional error 1\/4/);
});

test("unequal losses change the decision and differ from error probability", () => {
  const loss = [[0, 1], [5, 0]];
  const posterior = [0.8, 0.2];
  const costs = [0, 1].map(decision => sum(posterior.map((probability, truth) => probability * loss[truth][decision])));
  close(costs[0], 1);
  close(costs[1], 0.8);
  assert.ok(costs[1] < costs[0]);
  assert.match(selected(10), /^Choose 1/);
  const joint = [[0.72, 0.08], [0.05, 0.15]];
  const risk = sum(joint.map((row, truth) => sum(row.map((probability, decision) => probability * loss[truth][decision]))));
  close(risk, 0.33);
  assert.notEqual(risk, joint[0][1] + joint[1][0]);
  assert.match(selected(11), /^0\.33/);
});

test("integrating class-conditional densities and their threshold sweep gives ROC AUC 2/3", () => {
  // Integrate the densities independently of the closed-form ROC expression.
  const integrate = (f, lower, upper, steps = 10000) => {
    const dx = (upper - lower) / steps;
    let total = 0;
    for (let i = 0; i < steps; i++) {
      const left = lower + i * dx;
      total += (f(left) + f(left + dx)) * dx / 2;
    }
    return total;
  };
  for (const threshold of [0, 0.2, 0.5, 0.8, 1]) {
    close(integrate(() => 1, threshold, 1), 1 - threshold);
    close(integrate(x => 2 * x, threshold, 1), 1 - threshold ** 2);
  }
  // With u = FPR = 1-T, TPR = 1-(1-u)^2.
  close(integrate(u => 1 - (1 - u) ** 2, 0, 1), 2 / 3, 2e-9);
  assert.match(selected(13), /^2\/3/);
});

test("enumerating token sequences recovers the multinomial count probability", () => {
  const theta = [0.4, 0.5, 0.1];
  const byCounts = new Map();
  let matchingSequences = 0;
  for (let first = 0; first < 3; first++) {
    for (let second = 0; second < 3; second++) {
      for (let third = 0; third < 3; third++) {
        const sequence = [first, second, third];
        const counts = theta.map((_, word) => sequence.filter(token => token === word).length);
        const key = counts.join(",");
        const probability = sequence.reduce((product, token) => product * theta[token], 1);
        byCounts.set(key, (byCounts.get(key) || 0) + probability);
        if (key === "2,1,0") {
          matchingSequences += 1;
          close(probability, 0.08);
        }
      }
    }
  }
  close(sum([...byCounts.values()]), 1);
  assert.equal(matchingSequences, 3);
  close(byCounts.get("2,1,0"), 0.24);
  assert.match(selected(16), /^0\.24/);
});

test("smoothed training counts reproduce the posterior and absent-word contribution", () => {
  const smooth = (counts, alpha) => normalize(counts.map(count => count + alpha));
  const spam = smooth([2, 3, 0], 1);
  const ham = smooth([0, 1, 4], 1);
  assert.deepEqual(spam, [3 / 8, 4 / 8, 1 / 8]);
  assert.deepEqual(ham, [1 / 8, 2 / 8, 5 / 8]);
  assert.ok([...spam, ...ham].every(probability => probability > 0));
  close((3 + 2) / (20 + 2 * 5), 1 / 6);
  assert.match(selected(18), /5\/30 = 1\/6/);

  const sequenceLikelihood = (theta, words) => words.reduce((product, word) => product * theta[word], 1);
  const words = [0, 1];
  const posteriorFor = document => normalize([spam, ham].map(theta => 0.5 * sequenceLikelihood(theta, document)));
  close(posteriorFor(words)[0], 6 / 7);
  assert.match(selected(20), /^6\/7/);

  const z = [1, 1, 0];
  const countProduct = spam.reduce((product, theta, word) => product * theta ** z[word], 1);
  close(countProduct, sequenceLikelihood(spam, words));
  close(spam[2] ** z[2], 1);
  assert.match(selected(19), /\(1\/8\)\^0 = 1/);
});
