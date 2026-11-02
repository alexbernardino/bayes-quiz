import test from "node:test";
import assert from "node:assert/strict";
import { questions } from "../questions.js";

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} ≠ ${expected}`);
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
  assert.match(selected(3), /^1\/7 and 1\/3/);
  close(sum([0.8, 0.2].map((prior, k) => prior * [0.1, 0.4][k])), 0.16);
  assert.match(selected(4), /^0\.16/);
});

test("threshold minimum and discrete Bayes errors agree with the keyed answers", () => {
  const error = threshold => 0.5 * (1 - threshold) + 0.5 * threshold ** 2;
  const grid = Array.from({ length: 1001 }, (_, index) => index / 1000);
  const best = grid.reduce((winner, threshold) => error(threshold) < error(winner) ? threshold : winner);
  close(best, 0.5);
  close(error(best), 3 / 8);
  close(error(0.2), error(0.8));
  assert.match(selected(5), /T = 1\/2; error = 3\/8/);

  const joint = [[0.12, 0.08, 0.04, 0.16], [0.12, 0.18, 0.24, 0.06]];
  close(sum(joint.flat()), 1);
  close(sum(joint[0].map((value, index) => Math.min(value, joint[1][index]))), 0.3);
  assert.match(selected(8), /^0\.30/);
});

test("Bayes normalization uses both prior and likelihood", () => {
  const posterior = normalize([0.4 * 0.2, 0.6 * 0.3]);
  close(posterior[1], 9 / 13);
  close(sum(posterior), 1);
  assert.match(selected(6), /^9\/13/);
  const unequalPriors = normalize([0.9 * 0.2, 0.1 * 0.6]);
  assert.ok(unequalPriors[0] > unequalPriors[1]);
  close(1 - unequalPriors[0], 1 / 4);
  assert.match(selected(7), /^Class 0; conditional error 1\/4/);
});

test("unequal losses change the decision and differ from error probability", () => {
  const loss = [[0, 1], [5, 0]];
  const posterior = [0.8, 0.2];
  const costs = [0, 1].map(decision => sum(posterior.map((probability, truth) => probability * loss[truth][decision])));
  close(costs[0], 1);
  close(costs[1], 0.8);
  assert.ok(costs[1] < costs[0]);
  assert.match(selected(9), /^Choose 1/);
  const joint = [[0.72, 0.08], [0.05, 0.15]];
  const risk = sum(joint.map((row, truth) => sum(row.map((probability, decision) => probability * loss[truth][decision]))));
  close(risk, 0.33);
  assert.notEqual(risk, joint[0][1] + joint[1][0]);
  assert.match(selected(10), /^0\.33/);
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
  assert.match(selected(15), /^0\.24/);
});

test("smoothed training counts reproduce posterior and repeated-word evidence", () => {
  const smooth = (counts, alpha) => normalize(counts.map(count => count + alpha));
  const spam = smooth([2, 3, 0], 1);
  const ham = smooth([0, 1, 4], 1);
  assert.deepEqual(spam, [3 / 8, 4 / 8, 1 / 8]);
  assert.deepEqual(ham, [1 / 8, 2 / 8, 5 / 8]);
  assert.ok([...spam, ...ham].every(probability => probability > 0));
  close((3 + 2) / (20 + 2 * 5), 1 / 6);
  assert.match(selected(17), /5\/30 = 1\/6/);

  const sequenceLikelihood = (theta, words) => words.reduce((product, word) => product * theta[word], 1);
  const words = [0, 1];
  const posteriorFor = document => normalize([spam, ham].map(theta => 0.5 * sequenceLikelihood(theta, document)));
  close(posteriorFor(words)[0], 6 / 7);
  assert.match(selected(19), /^6\/7/);
  close(posteriorFor([...words, 2])[0], 6 / 11);
  const afterTwo = posteriorFor([...words, 2, 2]);
  close(afterTwo[0], 6 / 31);
  close(afterTwo[0] / afterTwo[1], 6 / 25);
  assert.ok(afterTwo[1] > afterTwo[0]);
  assert.match(selected(20), /Odds 6\/25; predict ham/);

  const z = [1, 1, 0];
  const countProduct = spam.reduce((product, theta, word) => product * theta ** z[word], 1);
  close(countProduct, sequenceLikelihood(spam, words));
  close(spam[2] ** z[2], 1);
  assert.match(selected(18), /\(1\/8\)\^0 = 1/);
});
