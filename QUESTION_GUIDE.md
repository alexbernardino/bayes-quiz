# Bayes quiz — instructor question guide

This guide is generated from `questions.js`, the single question bank used by the quiz. It contains exactly 20 multiple-choice questions with one best answer each. Students may use paper and a basic calculator.

The quiz follows the illustrated classification chapter: five questions on classification and error, six on Bayes decisions and risk, and nine on Multinomial Naive Bayes. It prioritizes the central concepts and short calculations; the Gaussian, binomial and exponential derivation exercises remain in the slide deck.

Notation follows the chapter: x is an ordered token sequence in the email model, z is its count vector, k is a class index, i is a vocabulary index and t is a token position. Document-length conditioning is implicit under the chapter’s stated assumptions. In the earlier general-classification questions, x denotes the observed feature vector or scalar observation, as in the slides.

## Answer key

| Question | Section | Answer |
|---|---|---|
| 1 | Classification & error | C |
| 2 | Classification & error | A |
| 3 | Classification & error | D |
| 4 | Classification & error | B |
| 5 | Classification & error | A |
| 6 | Bayes decisions & risk | C |
| 7 | Bayes decisions & risk | D |
| 8 | Bayes decisions & risk | B |
| 9 | Bayes decisions & risk | D |
| 10 | Bayes decisions & risk | A |
| 11 | Bayes decisions & risk | C |
| 12 | Multinomial Naive Bayes | B |
| 13 | Multinomial Naive Bayes | A |
| 14 | Multinomial Naive Bayes | D |
| 15 | Multinomial Naive Bayes | C |
| 16 | Multinomial Naive Bayes | B |
| 17 | Multinomial Naive Bayes | C |
| 18 | Multinomial Naive Bayes | D |
| 19 | Multinomial Naive Bayes | B |
| 20 | Multinomial Naive Bayes | A |

Answer positions are balanced: five A, five B, five C and five D.

## Classification & error

### Question 1 — Concept

A classifier predicts the class with the largest discriminant score f_k(x). Which statement is correct?

A. Every score must lie between 0 and 1.

B. The scores must sum to 1 across classes.

C. The scores need not be probabilities; their ranking determines the prediction.

D. The largest score is always the probability that the prediction is correct.

**Correct answer: C.** Discriminant functions assign comparable scores to classes. The rule chooses an index with the largest score, using a specified rule for ties. Posterior probabilities are one possible choice of scores, but arbitrary real-valued scores can also define a classifier.

**Follow-up:** Add the same constant to every class score. Does the prediction change? Answer: no, because the ordering is unchanged.

**Slides:** “Discriminant functions”; “Classifier design”.

### Question 2 — Calculation

Let f_0(x) = x_1 + x_2 and f_1(x) = 1. Break ties in favour of class 0. Which description gives the class-0 decision region and the prediction at x = (0.46, 0.67)?

A. Region x_1 + x_2 ≥ 1; prediction 0.

B. Region x_1 + x_2 ≤ 1; prediction 1.

C. Region x_1 + x_2 > 1; prediction 0.

D. Region x_1 + x_2 ≥ 1; prediction 1.

**Correct answer: A.** Class 0 wins when f_0(x) ≥ f_1(x), including equality because of the tie rule. Thus its region is x_1 + x_2 ≥ 1, with boundary x_1 + x_2 = 1. At the given point, f_0 = 1.13 > 1, so the prediction is 0, regardless of the point’s true class.

**Follow-up:** Classify x = (0.4, 0.6). Answer: class 0, because the scores tie and the stated tie rule applies.

**Slides:** “Discriminant functions”; “Decision regions and decision boundary”.

### Question 3 — Calculation

A confusion-count matrix has true classes in rows and predicted classes in columns: [[4, 0], [1, 2]]. What are the empirical overall error and P̂(predicted 0 | true 1), respectively?

A. 1/3 and 1/7.

B. 1/7 and 1/2.

C. 1/3 and 1/3.

D. 1/7 and 1/3.

**Correct answer: D.** There is one error among seven observations, so the empirical overall error is 1/7. Among the three true class-1 observations, one is predicted as class 0, giving 1/3. Dividing every entry by seven produces a joint-frequency matrix; dividing each row by its own total produces conditional frequencies.

**Follow-up:** Find P̂(true 1, predicted 0). Answer: 1/7. It is a joint frequency, unlike the row-normalized value 1/3.

**Slides:** “Confusion Matrix and Probability of Error”; “How to compute the confusion matrix”.

### Question 4 — Calculation

A classifier has P(predicted 1 | true 0) = 0.10 and P(predicted 0 | true 1) = 0.40. With class priors P_0 = 0.80 and P_1 = 0.20, what is its overall probability of error?

A. 0.25.

B. 0.16.

C. 0.50.

D. 0.34.

**Correct answer: B.** Weight each within-class error by that class’s prior: P_{error} = 0.80 × 0.10 + 0.20 × 0.40 = 0.16. The unweighted average 0.25 gives equal importance to the two classes, but is not the overall error for these priors.

**Follow-up:** Keep the same conditional errors but use equal priors. Answer: the overall error becomes 0.5 × 0.10 + 0.5 × 0.40 = 0.25.

**Slides:** “Confusion Matrix and Probability of Error”; “How to compute the confusion matrix”.

### Question 5 — Calculation

For x ∈ [0, 1], let p(x | 0) = 1, p(x | 1) = 2x and P_0 = P_1 = 1/2. Predict 0 for x < T and 1 otherwise. Which threshold minimizes error, and what is that error?

A. T = 1/2; error = 3/8.

B. T = 1/2; error = 1/4.

C. T = 1; error = 0.

D. T = 0; error = 1/2.

**Correct answer: A.** The two error probabilities are P_{01} = (1/2)(1 − T) and P_{10} = (1/2)T². Their sum has derivative −1/2 + T and positive second derivative, so its minimum is at T = 1/2. The minimum is 1/4 + 1/8 = 3/8. Overlapping class distributions prevent zero error.

**Follow-up:** Compare T = 0.2 and T = 0.8. Answer: both give error 0.42, although they trade the two kinds of error differently.

**Slides:** “Example: Evaluating a Threshold Classifier”; “Moving the Threshold Trades One Error for Another”.

## Bayes decisions & risk

### Question 6 — Calculation

At a discrete observation x = 2, the class likelihoods are P(x = 2 | 0) = 0.20 and P(x = 2 | 1) = 0.30. The priors are P_0 = 0.40 and P_1 = 0.60. What is P(y = 1 | x = 2)?

A. 0.30.

B. 0.18.

C. 9/13 ≈ 0.692.

D. 0.60.

**Correct answer: C.** The class-joint probabilities are 0.20 × 0.40 = 0.08 and 0.30 × 0.60 = 0.18. The evidence is their sum, 0.26. Bayes’ rule gives P(y = 1 | x = 2) = 0.18/0.26 = 9/13. Likelihood, prior, joint probability and posterior are different quantities.

**Follow-up:** Find the other posterior and check normalization. Answer: P(y = 0 | x = 2) = 4/13, and the two posteriors sum to 1.

**Slides:** “The Posterior Distribution: Normalize the Class Evidence”.

### Question 7 — Calculation

At an observation x, let P_0 = 0.9, P_1 = 0.1, p(x | 0) = 0.2 and p(x | 1) = 0.6. Under 0–1 loss, what does the Bayes rule predict, and what is its conditional probability of error?

A. Class 1; conditional error 1/4.

B. Class 1; conditional error 3/4.

C. Class 0; conditional error 3/4.

D. Class 0; conditional error 1/4.

**Correct answer: D.** Compare the prior-weighted likelihoods: 0.9 × 0.2 = 0.18 for class 0 and 0.1 × 0.6 = 0.06 for class 1. The common evidence 0.24 can be omitted when choosing the class. The class-0 posterior is 0.18/0.24 = 3/4, so choosing 0 has conditional error 1 − 3/4 = 1/4. The larger likelihood alone would choose the wrong Bayes action.

**Follow-up:** Make the priors equal while keeping the likelihoods fixed. Answer: the Bayes prediction changes to class 1.

**Slides:** “Bayes Classifier: Largest Posterior, Smallest Error”; “Gaussian Features: Likelihood, Joint Density, Posterior”.

### Question 8 — Calculation

For x = 1, 2, 3, 4, the joint probabilities are p(x, y = 0) = (0.12, 0.08, 0.04, 0.16) and p(x, y = 1) = (0.12, 0.18, 0.24, 0.06). What is the minimum overall probability of error under 0–1 loss?

A. 0.12.

B. 0.30.

C. 0.70.

D. 0.50.

**Correct answer: B.** At each x, predict a class with the larger joint probability. The error contribution is the smaller joint probability. Summing these contributions gives 0.12 + 0.08 + 0.04 + 0.06 = 0.30. At x = 1 the joint probabilities tie, so either class gives the same error contribution. A fixed tie rule makes the classifier fully specified.

**Follow-up:** Find the predictions at x = 2, 3 and 4. Answer: classes 1, 1 and 0, respectively.

**Slides:** “Exercise 1: A Discrete Bayes Classifier”; “Bayes Classifier: Largest Posterior, Smallest Error”.

### Question 9 — Calculation

Rows of L are true classes and columns are decisions. Let L = [[0, 1], [5, 0]] and P(y = 1 | x) = 0.20. Which decision minimizes conditional expected loss?

A. Choose 0, because its posterior is 0.80.

B. Choose 0, because its conditional cost is 0.20.

C. Either class, because both conditional costs are 1.

D. Choose 1, because its conditional cost is 0.80 rather than 1.

**Correct answer: D.** Choosing 0 costs 5 when the truth is 1, so c_0 = 5 × 0.20 = 1. Choosing 1 costs 1 when the truth is 0, so c_1 = 1 × 0.80 = 0.80. Choose 1. In general, writing q = P(y = 1 | x), choose 1 when 1 − q < 5q, or q > 1/6. MAP would choose 0 here, but MAP minimizes 0–1 loss, not this unequal loss.

**Follow-up:** What happens at q = 1/6? Answer: both decisions have conditional cost 5/6, so either is optimal.

**Slides:** “Loss Functions: When Errors Have Different Costs”; “Bayes Decisions with General Loss: Minimize Conditional Cost”.

### Question 10 — Calculation

With true classes in rows and predictions in columns, a joint confusion matrix is P = [[0.72, 0.08], [0.05, 0.15]]. For loss L = [[0, 1], [5, 0]], what is the expected loss (risk)?

A. 0.33.

B. 0.13.

C. 0.45.

D. 0.87.

**Correct answer: A.** Risk is the sum of each joint probability multiplied by its corresponding loss: R = Σ_{i,j} L_{ij}P_{ij} = 1 × 0.08 + 5 × 0.05 = 0.33. The probability of error is only 0.08 + 0.05 = 0.13. They differ because one type of error costs five times as much as the other.

**Follow-up:** Replace L with 0–1 loss. Answer: the risk becomes the probability of error, 0.13.

**Slides:** “Why Pointwise Cost Minimization Minimizes Total Risk”; “Loss Functions: When Errors Have Different Costs”.

### Question 11 — Concept

Why does choosing a decision with minimum conditional cost c_j(x) at every observation minimize the total risk R = ∫ c_{ŷ(x)}(x)p(x) dx?

A. All observations have the same probability density.

B. Every class must have the same prior probability.

C. The weights p(x) are nonnegative, so pointwise smaller conditional costs cannot increase their weighted integral.

D. Conditional cost is always the same as conditional probability of error.

**Correct answer: C.** For the unconstrained classification rules considered here, decisions can be chosen separately at each x. A pointwise minimum c_j(x) is no larger than the conditional cost of any other decision. Multiplying by p(x) ≥ 0 and integrating preserves that inequality. This argument allows unequal class priors and general loss matrices; only under 0–1 loss does conditional cost equal conditional error.

**Follow-up:** What if two actions tie at some x? Answer: either action gives the same conditional cost there, and therefore the same contribution to total risk.

**Slides:** “Why Pointwise Cost Minimization Minimizes Total Risk”.

## Multinomial Naive Bayes

### Question 12 — Concept

In Multinomial Naive Bayes, x = (x_1, …, x_T) is the token sequence and z_i counts word w_i. Given the class k and observed length T, which statement describes the model?

A. The counts z_i are independent categorical draws.

B. The tokens are independent categorical draws with P(x_t = w_i | k) = θ_{i,k}; the counts have fixed sum T and are generally dependent.

C. The tokens are independent without conditioning on the class.

D. Each word can appear at most once, so every z_i is 0 or 1.

**Correct answer: B.** Conditional on class and length, tokens are independent draws from the same categorical word distribution. The parameters satisfy θ_{i,k} ≥ 0 and Σ_i θ_{i,k} = 1. Counts summarize repeated tokens, but their fixed total Σ_i z_i = T couples them. The multinomial count likelihood is not a product of independent count marginals.

**Follow-up:** For vocabulary (win, money, hello), convert “win money win” to counts. Answer: z = (2, 1, 0). Shuffling these tokens preserves z.

**Slides:** “Multinomial Naive Bayes: Problem and Assumptions”; “Word Probabilities and Their Estimation”; “Conditional Independence Leads to Word Counts”.

### Question 13 — Concept

The chapter assumes document length has the same distribution in every class and then conditions on the observed length implicitly. Why can document length be omitted from the class comparison?

A. The factor P(T | y = k) is common to all classes, so it cancels for the observed document.

B. Every possible document length must have the same probability.

C. A fixed observed length makes P(T | y = k) equal across classes without any model assumption.

D. Conditioning on length makes all classes equally probable.

**Correct answer: A.** The assumption is P(T | y = k) = g(T), with the same length distribution g for every class. For an observed length with positive probability, this common factor cancels from Bayes comparisons and P(y = k | T) = P(y = k). The chapter also assumes word probabilities do not depend on length. Equal length distributions across classes do not mean that all possible lengths are equally probable. If length distributions differed by class, length could provide class evidence.

**Follow-up:** Suppose length likelihoods satisfy P(T | spam)/P(T | ham) = 2. What extra factor enters the spam-to-ham odds? Answer: 2; it can no longer be dropped.

**Slides:** “Multinomial Naive Bayes: Problem and Assumptions”.

### Question 14 — Calculation

There are four training emails, two spam and two ham. Across the spam emails, the token counts for (win, money, hello) are (2, 3, 0). Without smoothing, what are the maximum-likelihood estimates π̂_{spam} and θ̂_{money,spam}?

A. π̂_{spam} = 2/5 and θ̂_{money,spam} = 3/5.

B. π̂_{spam} = 2/4 and θ̂_{money,spam} = 3/4.

C. π̂_{spam} = 3/5 and θ̂_{money,spam} = 2/4.

D. π̂_{spam} = 2/4 and θ̂_{money,spam} = 3/5.

**Correct answer: D.** The prior uses email counts: π̂_{spam} = number of spam emails / number of all emails = 2/4. The word probability uses all token occurrences within that class: θ̂_{money,spam} = 3/(2 + 3 + 0) = 3/5. Repeated words count repeatedly when estimating multinomial word probabilities.

**Follow-up:** Estimate θ̂_{win,spam} and θ̂_{hello,spam}. Answer: 2/5 and 0; the three word probabilities sum to 1.

**Slides:** “Word Probabilities and Their Estimation”; “Learning the Model from Labelled Emails”.

### Question 15 — Calculation

For vocabulary (win, money, hello), let θ_k = (0.4, 0.5, 0.1). Conditional on length T = 3, what is the probability of the count vector z = (2, 1, 0)?

A. 0.08.

B. 0.48.

C. 0.24.

D. 0.90.

**Correct answer: C.** There are 3!/(2!1!0!) = 3 distinct sequences: “win win money”, “win money win” and “money win win”. Each has probability 0.4² × 0.5 = 0.08, so the count-vector probability is 3 × 0.08 = 0.24. In general, P(z | k, T) = [T!/(∏_i z_i!)] ∏_i θ_{i,k}^{z_i}, for nonnegative integer counts summing to T. The multinomial coefficient counts the sequences represented by z.

**Follow-up:** What is the probability of the one ordered sequence “win money win”? Answer: 0.08; it does not include the factor of 3.

**Slides:** “Conditional Independence Leads to Word Counts”; “From Equally Probable Sequences to the Multinomial”.

### Question 16 — Concept

Assume positive priors and word probabilities. Which statement correctly describes the Multinomial Naive Bayes decision under 0–1 loss?

A. Keep the multinomial coefficient because it changes with the candidate class.

B. Drop the common multinomial coefficient and maximize log π_k + Σ_i z_i log θ_{i,k}.

C. Drop the class prior and maximize Σ_i z_i log θ_{i,k}, even when priors differ.

D. Maximize log π_k + Σ_i log θ_{i,k}, giving every vocabulary word one factor.

**Correct answer: B.** For a fixed observed count vector, T!/(∏_i z_i!) is the same positive factor for every class. It therefore cancels from the comparison, as does the evidence in Bayes’ rule. Taking logarithms preserves the ranking and turns products into sums: s_k = log π_k + Σ_i z_i log θ_{i,k}. These scores are not probabilities; logs also help avoid numerical underflow from multiplying many small numbers.

**Follow-up:** Swap the order of two tokens in a document. Answer: the counts, class scores and prediction are unchanged under this model.

**Slides:** “Multinomial Naive Bayes: Decision Rule”; “From Equally Probable Sequences to the Multinomial”.

### Question 17 — Calculation

A class has T_k = 20 training tokens over a vocabulary of M = 5 words. Word w_i occurs N_{i,k} = 3 times. With add-α smoothing and α = 2, what is θ̂_{i,k}?

A. 3/20.

B. 5/22.

C. 5/30 = 1/6.

D. 3/30 = 1/10.

**Correct answer: C.** Add-α smoothing gives θ̂_{i,k} = (N_{i,k} + α)/(T_k + αM). Here it is (3 + 2)/(20 + 2 × 5) = 5/30 = 1/6. The denominator includes pseudocounts for every vocabulary word. This makes every estimated word probability positive when α > 0; α = 1 is Laplace (add-one) smoothing.

**Follow-up:** What probability would a word with zero occurrences receive in this class? Answer: 2/30 = 1/15.

**Slides:** “Zero Counts and Laplace Smoothing”.

### Question 18 — Concept

After add-one smoothing, θ̂_{hello,spam} = 1/8. The test email is “win money”, so z_{hello} = 0. What contribution does “hello” make to the spam score?

A. A likelihood factor 1/8, because smoothing adds one observed “hello”.

B. A likelihood factor 0, because “hello” is absent.

C. A likelihood factor 7/8, because the word is absent.

D. A likelihood factor (1/8)^0 = 1, or a log-score contribution 0.

**Correct answer: D.** Smoothing changes estimated model parameters, not the observed test counts. Since z_{hello} = 0, the direct factor is θ̂_{hello,spam}^0 = 1 and the log contribution is 0 × log(1/8) = 0. A factor for word absence, such as 1 − θ, belongs to a Bernoulli presence/absence model, not this multinomial model.

**Follow-up:** Append one “hello” to the email. Answer: its count becomes 1, so it now contributes a factor 1/8 to the spam sequence likelihood, or log(1/8) to the class score.

**Slides:** “Zero Counts and Laplace Smoothing”; “Worked Mini-Example: Classifying “win money””.

### Question 19 — Calculation

For (win, money, hello), the smoothed word probabilities are θ_{spam} = (3/8, 4/8, 1/8) and θ_{ham} = (1/8, 2/8, 5/8), with equal priors. For “win money”, what is the model posterior P(spam | email)?

A. 3/32.

B. 6/7.

C. 1/7.

D. 6/11.

**Correct answer: B.** Using the ordered token sequence, the prior-weighted scores are a_{spam} = (1/2)(3/8)(4/8) = 3/32 = 6/64 and a_{ham} = (1/2)(1/8)(2/8) = 1/64. Normalize them: P(spam | email) = (6/64)/(7/64) = 6/7. Predict spam. In the count representation the multinomial coefficient is 2 for both classes, so it cancels from the same posterior calculation. The unnormalized score 3/32 is not a posterior.

**Follow-up:** What are the spam-to-ham posterior odds? Answer: 6. The spam log score exceeds the ham log score by log 6.

**Slides:** “Worked Mini-Example: Classifying “win money””; “Multinomial Naive Bayes: Decision Rule”.

### Question 20 — Calculation

For “win money”, the model’s spam-to-ham odds are 6. Each added “hello” has word-probability ratio θ_{hello,spam}/θ_{hello,ham} = 1/5. After adding two “hello” tokens, what are the odds and the 0–1-loss prediction?

A. Odds 6/25; predict ham.

B. Odds 6/5; predict spam.

C. Odds 6/25; predict spam.

D. Odds 150; predict spam.

**Correct answer: A.** Repeated tokens contribute repeated evidence: the new odds are 6 × (1/5)² = 6/25 < 1, so ham is preferred. The model spam posterior is (6/25)/(1 + 6/25) = 6/31. In log space, two added “hello” tokens subtract 2 log 5 from the spam-to-ham log odds. The class-independent length and multinomial factors do not affect this class comparison.

**Follow-up:** Add only one “hello” instead. Answer: odds 6/5, spam posterior 6/11, and the prediction remains spam.

**Slides:** “One More Word: How Does the Evidence Change?”; “Multinomial Naive Bayes: Decision Rule”.

## Updating the question bank

Edit `questions.js` to change the quiz. After editing a prompt, answer, explanation or slide mapping, regenerate this guide from that same bank so the instructor key stays consistent with the student quiz.
