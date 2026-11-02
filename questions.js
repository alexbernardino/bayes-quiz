// Question bank for the illustrated Statistical Classification / Bayes chapter.
// answer is zero-based; explanations and activities are shown after submission.
export const questions = [
  {
    section: 'Classification & error',
    category: 'Concept',
    prompt: 'A classifier predicts the class with the largest discriminant score f_k(x). Which statement is correct?',
    options: [
      'Every score must lie between 0 and 1.',
      'The scores must sum to 1 across classes.',
      'The scores need not be probabilities; their ranking determines the prediction.',
      'The largest score is always the probability that the prediction is correct.'
    ],
    answer: 2,
    explanation: 'Discriminant functions assign comparable scores to classes. The rule chooses an index with the largest score, using a specified rule for ties. Posterior probabilities are one possible choice of scores, but arbitrary real-valued scores can also define a classifier.',
    activity: 'Add the same constant to every class score. Does the prediction change? Answer: no, because the ordering is unchanged.',
    slides: ['Discriminant functions', 'Classifier design']
  },
  {
    section: 'Classification & error',
    category: 'Calculation',
    prompt: 'Let f_0(x) = x_1 + x_2 and f_1(x) = 1. Break ties in favour of class 0. Which description gives the class-0 decision region and the prediction at x = (0.46, 0.67)?',
    options: [
      'Region x_1 + x_2 ≥ 1; prediction 0.',
      'Region x_1 + x_2 ≤ 1; prediction 1.',
      'Region x_1 + x_2 > 1; prediction 0.',
      'Region x_1 + x_2 ≥ 1; prediction 1.'
    ],
    answer: 0,
    explanation: 'Class 0 wins when f_0(x) ≥ f_1(x), including equality because of the tie rule. Thus its region is x_1 + x_2 ≥ 1, with boundary x_1 + x_2 = 1. At the given point, f_0 = 1.13 > 1, so the prediction is 0, regardless of the point’s true class.',
    activity: 'Classify x = (0.4, 0.6). Answer: class 0, because the scores tie and the stated tie rule applies.',
    slides: ['Discriminant functions', 'Decision regions and decision boundary']
  },
  {
    section: 'Classification & error',
    category: 'Calculation',
    prompt: 'A confusion-count matrix has true classes in rows and predicted classes in columns: [[4, 0], [1, 2]]. What are the empirical overall error and P̂(predicted 0 | true 1), respectively?',
    options: [
      '1/3 and 1/7.',
      '1/7 and 1/2.',
      '1/3 and 1/3.',
      '1/7 and 1/3.'
    ],
    answer: 3,
    explanation: 'There is one error among seven observations, so the empirical overall error is 1/7. Among the three true class-1 observations, one is predicted as class 0, giving 1/3. Dividing every entry by seven produces a joint-frequency matrix; dividing each row by its own total produces conditional frequencies.',
    activity: 'Find P̂(true 1, predicted 0). Answer: 1/7. It is a joint frequency, unlike the row-normalized value 1/3.',
    slides: ['Confusion Matrix and Probability of Error', 'How to compute the confusion matrix']
  },
  {
    section: 'Classification & error',
    category: 'Calculation',
    prompt: 'A classifier has P(predicted 1 | true 0) = 0.10 and P(predicted 0 | true 1) = 0.40. With class priors P_0 = 0.80 and P_1 = 0.20, what is its overall probability of error?',
    options: [
      '0.25.',
      '0.16.',
      '0.50.',
      '0.34.'
    ],
    answer: 1,
    explanation: 'Weight each within-class error by that class’s prior: P_{error} = 0.80 × 0.10 + 0.20 × 0.40 = 0.16. The unweighted average 0.25 gives equal importance to the two classes, but is not the overall error for these priors.',
    activity: 'Keep the same conditional errors but use equal priors. Answer: the overall error becomes 0.5 × 0.10 + 0.5 × 0.40 = 0.25.',
    slides: ['Confusion Matrix and Probability of Error', 'How to compute the confusion matrix']
  },
  {
    section: 'Classification & error',
    category: 'Calculation',
    prompt: 'For x ∈ [0, 1], let p(x | 0) = 1, p(x | 1) = 2x and P_0 = P_1 = 1/2. Predict 0 for x < T and 1 otherwise. Which threshold minimizes error, and what is that error?',
    options: [
      'T = 1/2; error = 3/8.',
      'T = 1/2; error = 1/4.',
      'T = 1; error = 0.',
      'T = 0; error = 1/2.'
    ],
    answer: 0,
    explanation: 'The two error probabilities are P_{01} = (1/2)(1 − T) and P_{10} = (1/2)T². Their sum has derivative −1/2 + T and positive second derivative, so its minimum is at T = 1/2. The minimum is 1/4 + 1/8 = 3/8. Overlapping class distributions prevent zero error.',
    activity: 'Compare T = 0.2 and T = 0.8. Answer: both give error 0.42, although they trade the two kinds of error differently.',
    slides: ['Example: Evaluating a Threshold Classifier', 'Moving the Threshold Trades One Error for Another']
  },
  {
    section: 'Bayes decisions & risk',
    category: 'Calculation',
    prompt: 'At a discrete observation x = 2, the class likelihoods are P(x = 2 | 0) = 0.20 and P(x = 2 | 1) = 0.30. The priors are P_0 = 0.40 and P_1 = 0.60. What is P(y = 1 | x = 2)?',
    options: [
      '0.30.',
      '0.18.',
      '9/13 ≈ 0.692.',
      '0.60.'
    ],
    answer: 2,
    explanation: 'The class-joint probabilities are 0.20 × 0.40 = 0.08 and 0.30 × 0.60 = 0.18. The evidence is their sum, 0.26. Bayes’ rule gives P(y = 1 | x = 2) = 0.18/0.26 = 9/13. Likelihood, prior, joint probability and posterior are different quantities.',
    activity: 'Find the other posterior and check normalization. Answer: P(y = 0 | x = 2) = 4/13, and the two posteriors sum to 1.',
    slides: ['The Posterior Distribution: Normalize the Class Evidence']
  },
  {
    section: 'Bayes decisions & risk',
    category: 'Calculation',
    prompt: 'At an observation x, let P_0 = 0.9, P_1 = 0.1, p(x | 0) = 0.2 and p(x | 1) = 0.6. Under 0–1 loss, what does the Bayes rule predict, and what is its conditional probability of error?',
    options: [
      'Class 1; conditional error 1/4.',
      'Class 1; conditional error 3/4.',
      'Class 0; conditional error 3/4.',
      'Class 0; conditional error 1/4.'
    ],
    answer: 3,
    explanation: 'Compare the prior-weighted likelihoods: 0.9 × 0.2 = 0.18 for class 0 and 0.1 × 0.6 = 0.06 for class 1. The common evidence 0.24 can be omitted when choosing the class. The class-0 posterior is 0.18/0.24 = 3/4, so choosing 0 has conditional error 1 − 3/4 = 1/4. The larger likelihood alone would choose the wrong Bayes action.',
    activity: 'Make the priors equal while keeping the likelihoods fixed. Answer: the Bayes prediction changes to class 1.',
    slides: ['Bayes Classifier: Largest Posterior, Smallest Error', 'Gaussian Features: Likelihood, Joint Density, Posterior']
  },
  {
    section: 'Bayes decisions & risk',
    category: 'Calculation',
    prompt: 'For x = 1, 2, 3, 4, the joint probabilities are p(x, y = 0) = (0.12, 0.08, 0.04, 0.16) and p(x, y = 1) = (0.12, 0.18, 0.24, 0.06). What is the minimum overall probability of error under 0–1 loss?',
    options: [
      '0.12.',
      '0.30.',
      '0.70.',
      '0.50.'
    ],
    answer: 1,
    explanation: 'At each x, predict a class with the larger joint probability. The error contribution is the smaller joint probability. Summing these contributions gives 0.12 + 0.08 + 0.04 + 0.06 = 0.30. At x = 1 the joint probabilities tie, so either class gives the same error contribution. A fixed tie rule makes the classifier fully specified.',
    activity: 'Find the predictions at x = 2, 3 and 4. Answer: classes 1, 1 and 0, respectively.',
    slides: ['Exercise 1: A Discrete Bayes Classifier', 'Bayes Classifier: Largest Posterior, Smallest Error']
  },
  {
    section: 'Bayes decisions & risk',
    category: 'Calculation',
    prompt: 'Rows of L are true classes and columns are decisions. Let L = [[0, 1], [5, 0]] and P(y = 1 | x) = 0.20. Which decision minimizes conditional expected loss?',
    options: [
      'Choose 0, because its posterior is 0.80.',
      'Choose 0, because its conditional cost is 0.20.',
      'Either class, because both conditional costs are 1.',
      'Choose 1, because its conditional cost is 0.80 rather than 1.'
    ],
    answer: 3,
    explanation: 'Choosing 0 costs 5 when the truth is 1, so c_0 = 5 × 0.20 = 1. Choosing 1 costs 1 when the truth is 0, so c_1 = 1 × 0.80 = 0.80. Choose 1. In general, writing q = P(y = 1 | x), choose 1 when 1 − q < 5q, or q > 1/6. MAP would choose 0 here, but MAP minimizes 0–1 loss, not this unequal loss.',
    activity: 'What happens at q = 1/6? Answer: both decisions have conditional cost 5/6, so either is optimal.',
    slides: ['Loss Functions: When Errors Have Different Costs', 'Bayes Decisions with General Loss: Minimize Conditional Cost']
  },
  {
    section: 'Bayes decisions & risk',
    category: 'Calculation',
    prompt: 'With true classes in rows and predictions in columns, a joint confusion matrix is P = [[0.72, 0.08], [0.05, 0.15]]. For loss L = [[0, 1], [5, 0]], what is the expected loss (risk)?',
    options: [
      '0.33.',
      '0.13.',
      '0.45.',
      '0.87.'
    ],
    answer: 0,
    explanation: 'Risk is the sum of each joint probability multiplied by its corresponding loss: R = Σ_{i,j} L_{ij}P_{ij} = 1 × 0.08 + 5 × 0.05 = 0.33. The probability of error is only 0.08 + 0.05 = 0.13. They differ because one type of error costs five times as much as the other.',
    activity: 'Replace L with 0–1 loss. Answer: the risk becomes the probability of error, 0.13.',
    slides: ['Why Pointwise Cost Minimization Minimizes Total Risk', 'Loss Functions: When Errors Have Different Costs']
  },
  {
    section: 'Bayes decisions & risk',
    category: 'Concept',
    prompt: 'Why does choosing a decision with minimum conditional cost c_j(x) at every observation minimize the total risk R = ∫ c_{ŷ(x)}(x)p(x) dx?',
    options: [
      'All observations have the same probability density.',
      'Every class must have the same prior probability.',
      'The weights p(x) are nonnegative, so pointwise smaller conditional costs cannot increase their weighted integral.',
      'Conditional cost is always the same as conditional probability of error.'
    ],
    answer: 2,
    explanation: 'For the unconstrained classification rules considered here, decisions can be chosen separately at each x. A pointwise minimum c_j(x) is no larger than the conditional cost of any other decision. Multiplying by p(x) ≥ 0 and integrating preserves that inequality. This argument allows unequal class priors and general loss matrices; only under 0–1 loss does conditional cost equal conditional error.',
    activity: 'What if two actions tie at some x? Answer: either action gives the same conditional cost there, and therefore the same contribution to total risk.',
    slides: ['Why Pointwise Cost Minimization Minimizes Total Risk']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Concept',
    prompt: 'In Multinomial Naive Bayes, x = (x_1, …, x_T) is the token sequence and z_i counts word w_i. Given the class k and observed length T, which statement describes the model?',
    options: [
      'The counts z_i are independent categorical draws.',
      'The tokens are independent categorical draws with P(x_t = w_i | k) = θ_{i,k}; the counts have fixed sum T and are generally dependent.',
      'The tokens are independent without conditioning on the class.',
      'Each word can appear at most once, so every z_i is 0 or 1.'
    ],
    answer: 1,
    explanation: 'Conditional on class and length, tokens are independent draws from the same categorical word distribution. The parameters satisfy θ_{i,k} ≥ 0 and Σ_i θ_{i,k} = 1. Counts summarize repeated tokens, but their fixed total Σ_i z_i = T couples them. The multinomial count likelihood is not a product of independent count marginals.',
    activity: 'For vocabulary (win, money, hello), convert “win money win” to counts. Answer: z = (2, 1, 0). Shuffling these tokens preserves z.',
    slides: ['Multinomial Naive Bayes: Problem and Assumptions', 'Word Probabilities and Their Estimation', 'Conditional Independence Leads to Word Counts']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Concept',
    prompt: 'The chapter assumes document length has the same distribution in every class and then conditions on the observed length implicitly. Why can document length be omitted from the class comparison?',
    options: [
      'The factor P(T | y = k) is common to all classes, so it cancels for the observed document.',
      'Every possible document length must have the same probability.',
      'A fixed observed length makes P(T | y = k) equal across classes without any model assumption.',
      'Conditioning on length makes all classes equally probable.'
    ],
    answer: 0,
    explanation: 'The assumption is P(T | y = k) = g(T), with the same length distribution g for every class. For an observed length with positive probability, this common factor cancels from Bayes comparisons and P(y = k | T) = P(y = k). The chapter also assumes word probabilities do not depend on length. Equal length distributions across classes do not mean that all possible lengths are equally probable. If length distributions differed by class, length could provide class evidence.',
    activity: 'Suppose length likelihoods satisfy P(T | spam)/P(T | ham) = 2. What extra factor enters the spam-to-ham odds? Answer: 2; it can no longer be dropped.',
    slides: ['Multinomial Naive Bayes: Problem and Assumptions']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Calculation',
    prompt: 'There are four training emails, two spam and two ham. Across the spam emails, the token counts for (win, money, hello) are (2, 3, 0). Without smoothing, what are the maximum-likelihood estimates π̂_{spam} and θ̂_{money,spam}?',
    options: [
      'π̂_{spam} = 2/5 and θ̂_{money,spam} = 3/5.',
      'π̂_{spam} = 2/4 and θ̂_{money,spam} = 3/4.',
      'π̂_{spam} = 3/5 and θ̂_{money,spam} = 2/4.',
      'π̂_{spam} = 2/4 and θ̂_{money,spam} = 3/5.'
    ],
    answer: 3,
    explanation: 'The prior uses email counts: π̂_{spam} = number of spam emails / number of all emails = 2/4. The word probability uses all token occurrences within that class: θ̂_{money,spam} = 3/(2 + 3 + 0) = 3/5. Repeated words count repeatedly when estimating multinomial word probabilities.',
    activity: 'Estimate θ̂_{win,spam} and θ̂_{hello,spam}. Answer: 2/5 and 0; the three word probabilities sum to 1.',
    slides: ['Word Probabilities and Their Estimation', 'Learning the Model from Labelled Emails']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Calculation',
    prompt: 'For vocabulary (win, money, hello), let θ_k = (0.4, 0.5, 0.1). Conditional on length T = 3, what is the probability of the count vector z = (2, 1, 0)?',
    options: [
      '0.08.',
      '0.48.',
      '0.24.',
      '0.90.'
    ],
    answer: 2,
    explanation: 'There are 3!/(2!1!0!) = 3 distinct sequences: “win win money”, “win money win” and “money win win”. Each has probability 0.4² × 0.5 = 0.08, so the count-vector probability is 3 × 0.08 = 0.24. In general, P(z | k, T) = [T!/(∏_i z_i!)] ∏_i θ_{i,k}^{z_i}, for nonnegative integer counts summing to T. The multinomial coefficient counts the sequences represented by z.',
    activity: 'What is the probability of the one ordered sequence “win money win”? Answer: 0.08; it does not include the factor of 3.',
    slides: ['Conditional Independence Leads to Word Counts', 'From Equally Probable Sequences to the Multinomial']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Concept',
    prompt: 'Assume positive priors and word probabilities. Which statement correctly describes the Multinomial Naive Bayes decision under 0–1 loss?',
    options: [
      'Keep the multinomial coefficient because it changes with the candidate class.',
      'Drop the common multinomial coefficient and maximize log π_k + Σ_i z_i log θ_{i,k}.',
      'Drop the class prior and maximize Σ_i z_i log θ_{i,k}, even when priors differ.',
      'Maximize log π_k + Σ_i log θ_{i,k}, giving every vocabulary word one factor.'
    ],
    answer: 1,
    explanation: 'For a fixed observed count vector, T!/(∏_i z_i!) is the same positive factor for every class. It therefore cancels from the comparison, as does the evidence in Bayes’ rule. Taking logarithms preserves the ranking and turns products into sums: s_k = log π_k + Σ_i z_i log θ_{i,k}. These scores are not probabilities; logs also help avoid numerical underflow from multiplying many small numbers.',
    activity: 'Swap the order of two tokens in a document. Answer: the counts, class scores and prediction are unchanged under this model.',
    slides: ['Multinomial Naive Bayes: Decision Rule', 'From Equally Probable Sequences to the Multinomial']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Calculation',
    prompt: 'A class has T_k = 20 training tokens over a vocabulary of M = 5 words. Word w_i occurs N_{i,k} = 3 times. With add-α smoothing and α = 2, what is θ̂_{i,k}?',
    options: [
      '3/20.',
      '5/22.',
      '5/30 = 1/6.',
      '3/30 = 1/10.'
    ],
    answer: 2,
    explanation: 'Add-α smoothing gives θ̂_{i,k} = (N_{i,k} + α)/(T_k + αM). Here it is (3 + 2)/(20 + 2 × 5) = 5/30 = 1/6. The denominator includes pseudocounts for every vocabulary word. This makes every estimated word probability positive when α > 0; α = 1 is Laplace (add-one) smoothing.',
    activity: 'What probability would a word with zero occurrences receive in this class? Answer: 2/30 = 1/15.',
    slides: ['Zero Counts and Laplace Smoothing']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Concept',
    prompt: 'After add-one smoothing, θ̂_{hello,spam} = 1/8. The test email is “win money”, so z_{hello} = 0. What contribution does “hello” make to the spam score?',
    options: [
      'A likelihood factor 1/8, because smoothing adds one observed “hello”.',
      'A likelihood factor 0, because “hello” is absent.',
      'A likelihood factor 7/8, because the word is absent.',
      'A likelihood factor (1/8)^0 = 1, or a log-score contribution 0.'
    ],
    answer: 3,
    explanation: 'Smoothing changes estimated model parameters, not the observed test counts. Since z_{hello} = 0, the direct factor is θ̂_{hello,spam}^0 = 1 and the log contribution is 0 × log(1/8) = 0. A factor for word absence, such as 1 − θ, belongs to a Bernoulli presence/absence model, not this multinomial model.',
    activity: 'Append one “hello” to the email. Answer: its count becomes 1, so it now contributes a factor 1/8 to the spam sequence likelihood, or log(1/8) to the class score.',
    slides: ['Zero Counts and Laplace Smoothing', 'Worked Mini-Example: Classifying ``win money\'\'']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Calculation',
    prompt: 'For (win, money, hello), the smoothed word probabilities are θ_{spam} = (3/8, 4/8, 1/8) and θ_{ham} = (1/8, 2/8, 5/8), with equal priors. For “win money”, what is the model posterior P(spam | email)?',
    options: [
      '3/32.',
      '6/7.',
      '1/7.',
      '6/11.'
    ],
    answer: 1,
    explanation: 'Using the ordered token sequence, the prior-weighted scores are a_{spam} = (1/2)(3/8)(4/8) = 3/32 = 6/64 and a_{ham} = (1/2)(1/8)(2/8) = 1/64. Normalize them: P(spam | email) = (6/64)/(7/64) = 6/7. Predict spam. In the count representation the multinomial coefficient is 2 for both classes, so it cancels from the same posterior calculation. The unnormalized score 3/32 is not a posterior.',
    activity: 'What are the spam-to-ham posterior odds? Answer: 6. The spam log score exceeds the ham log score by log 6.',
    slides: ['Worked Mini-Example: Classifying ``win money\'\'', 'Multinomial Naive Bayes: Decision Rule']
  },
  {
    section: 'Multinomial Naive Bayes',
    category: 'Calculation',
    prompt: 'For “win money”, the model’s spam-to-ham odds are 6. Each added “hello” has word-probability ratio θ_{hello,spam}/θ_{hello,ham} = 1/5. After adding two “hello” tokens, what are the odds and the 0–1-loss prediction?',
    options: [
      'Odds 6/25; predict ham.',
      'Odds 6/5; predict spam.',
      'Odds 6/25; predict spam.',
      'Odds 150; predict spam.'
    ],
    answer: 0,
    explanation: 'Repeated tokens contribute repeated evidence: the new odds are 6 × (1/5)² = 6/25 < 1, so ham is preferred. The model spam posterior is (6/25)/(1 + 6/25) = 6/31. In log space, two added “hello” tokens subtract 2 log 5 from the spam-to-ham log odds. The class-independent length and multinomial factors do not affect this class comparison.',
    activity: 'Add only one “hello” instead. Answer: odds 6/5, spam posterior 6/11, and the prediction remains spam.',
    slides: ['One More Word: How Does the Evidence Change?', 'Multinomial Naive Bayes: Decision Rule']
  }
];
