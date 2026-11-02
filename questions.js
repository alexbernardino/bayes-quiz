// Question bank for the final Statistical Classification / Bayes chapter.
// answer is zero-based; explanations and activities are shown after submission.
export const questions = [
  {
    section: 'Classification & metrics',
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
    activity: 'Can the indicator of each decision region be a discriminant score? Answer: yes. If the regions form a partition, exactly one score is 1 and all the others are 0, selecting that region’s class.',
    slides: ['Discriminant functions', 'Classifier design', 'Decision regions and decision boundary']
  },
  {
    section: 'Classification & metrics',
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
    section: 'Classification & metrics',
    category: 'Calculation',
    prompt: 'In the fish example, class 1 (swordfish) is positive. With true classes in rows and predictions in columns, the count matrix is [[4, 0], [1, 2]]. What are precision, recall and specificity?',
    options: [
      'Precision = 1; recall = 2/3; specificity = 1.',
      'Precision = 2/3; recall = 1; specificity = 1.',
      'Precision = 1; recall = 1; specificity = 2/3.',
      'Precision = 6/7; recall = 2/3; specificity = 4/7.'
    ],
    answer: 0,
    explanation: 'The entries give TN = 4, FP = 0, FN = 1 and TP = 2. Precision = TP/(TP + FP) = 1, recall = TP/(TP + FN) = 2/3, and specificity = TN/(TN + FP) = 1. The missed swordfish is a false negative. Perfect precision means that every predicted positive is correct; it does not mean that every actual positive was detected.',
    activity: 'What is the false positive rate? Answer: FPR = FP/(FP + TN) = 0. There is nevertheless one false negative.',
    slides: ['Binary Classification Metrics', 'Confusion Matrix and Probability of Error']
  },
  {
    section: 'Classification & metrics',
    category: 'Concept',
    prompt: 'For a binary classifier with both classes present, which pair of identities is correct?',
    options: [
      'TPR = recall; FPR = 1 − specificity.',
      'TPR = precision; FPR = 1 − specificity.',
      'TPR = recall; FPR = 1 − precision.',
      'TPR = specificity; FPR = 1 − recall.'
    ],
    answer: 0,
    explanation: 'TPR = TP/(TP + FN) is recall, also called sensitivity: the fraction of actual positives detected. FPR = FP/(FP + TN) is the fraction of actual negatives incorrectly predicted positive. It is 1 − specificity because specificity = TN/(TN + FP). Precision instead divides TP by the number of predicted positives, TP + FP. A ROC curve plots TPR vertically against FPR horizontally.',
    activity: 'If recall is 0.8 and specificity is 0.9, locate the ROC point. Answer: (FPR, TPR) = (0.1, 0.8), not (0.9, 0.8).',
    slides: ['Binary Classification Metrics', 'ROC AUC: Evaluation Before Choosing a Threshold']
  },
  {
    section: 'Classification & metrics',
    category: 'Calculation',
    prompt: 'A classifier has P(predicted 1 | true 0) = 0.10 and P(predicted 0 | true 1) = 0.40. With class priors P_0 = 0.80 and P_1 = 0.20, what is its overall probability of error?',
    options: [
      '0.25.',
      '0.16.',
      '0.50.',
      '0.34.'
    ],
    answer: 1,
    explanation: 'Weight each within-class error by that class’s prior: P_{error} = 0.80 × 0.10 + 0.20 × 0.40 = 0.16. The unweighted average 0.25 gives equal importance to the two classes, but is not the overall error for these priors. With class 1 positive, these conditional errors are FPR = 0.10 and FNR = 0.40. Balanced accuracy is (0.90 + 0.60)/2 = 0.75, whereas ordinary accuracy is 1 − 0.16 = 0.84.',
    activity: 'Keep the same conditional errors but use equal priors. Answer: the overall error becomes 0.5 × 0.10 + 0.5 × 0.40 = 0.25.',
    slides: ['Confusion Matrix and Probability of Error', 'How to compute the confusion matrix', 'Imbalanced Classes: Accuracy Can Hide Missed Positives']
  },
  {
    section: 'Classification & metrics',
    category: 'Calculation',
    prompt: 'A dataset contains 99 negatives and 1 positive. A classifier always predicts negative. What are its accuracy, F1-score and balanced accuracy?',
    options: [
      'Accuracy = 99%; F1 = 0; balanced accuracy = 50%.',
      'Accuracy = 99%; F1 = 0.99; balanced accuracy = 99%.',
      'Accuracy = 1%; F1 = 0; balanced accuracy = 50%.',
      'Accuracy = 99%; F1 is undefined; balanced accuracy = 99%.'
    ],
    answer: 0,
    explanation: 'Here TN = 99, FP = 0, FN = 1 and TP = 0. Accuracy is 99/100 even though recall is zero. The count formula gives F1 = 2TP/(2TP + FP + FN) = 0/1 = 0. Specificity is 1, so balanced accuracy = (recall + specificity)/2 = 50%. Precision is mathematically undefined because TP + FP = 0, but the count formula for F1 has a nonzero denominator and gives zero.',
    activity: 'Replace the 99 negatives with 999 negatives, still predicting every case as negative. Answer: accuracy rises to 99.9%, while recall and F1 remain 0 and balanced accuracy remains 50%.',
    slides: ['Imbalanced Classes: Accuracy Can Hide Missed Positives']
  },
  {
    section: 'Classification & metrics',
    category: 'Calculation',
    prompt: 'A binary classifier has TN = 90, FP = 10, FN = 10 and TP = 10. What are its F1-score and balanced accuracy?',
    options: [
      'F1 = 0.70; balanced accuracy = 0.50.',
      'F1 = 0.50; balanced accuracy = 0.70.',
      'F1 = 0.50; balanced accuracy ≈ 0.833.',
      'F1 = 0.50; balanced accuracy = 0.30.'
    ],
    answer: 1,
    explanation: 'Precision and recall are both 10/20 = 0.5, so their harmonic mean is F1 = 0.5. Equivalently, F1 = 2TP/(2TP + FP + FN) = 20/40. Specificity is 90/100 = 0.9, giving balanced accuracy = (0.5 + 0.9)/2 = 0.7. Ordinary accuracy is 100/120 ≈ 0.833. F1 focuses on the positive class and does not use TN; balanced accuracy gives equal weight to the recall of each class.',
    activity: 'Exchange the positive and negative class labels. Answer: balanced accuracy stays 0.70, while F1 becomes 2 × 90/(2 × 90 + 10 + 10) = 0.90. The choice of positive class matters for F1.',
    slides: ['Imbalanced Classes: Accuracy Can Hide Missed Positives', 'Binary Classification Metrics']
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
    explanation: 'Risk is the sum of each joint probability multiplied by its corresponding loss: R = Σ_{i,j} L_{ij}P_{ij} = 1 × 0.08 + 5 × 0.05 = 0.33. The probability of error is only 0.08 + 0.05 = 0.13. They differ because one type of error costs five times as much as the other. Minimizing conditional cost at every observation minimizes its integral because the density weights are nonnegative.',
    activity: 'Replace L with 0–1 loss. Answer: the risk becomes the probability of error, 0.13.',
    slides: ['Why Pointwise Cost Minimization Minimizes Total Risk', 'Loss Functions: When Errors Have Different Costs']
  },
  {
    section: 'Bayes decisions & risk',
    category: 'Concept',
    prompt: 'A model produces scores, but its user will choose error costs and a decision threshold later. Why is ROC AUC useful for evaluation now?',
    options: [
      'It summarizes ranking performance across thresholds without requiring one threshold to be chosen.',
      'It identifies one threshold that is optimal for every possible loss matrix.',
      'A larger AUC guarantees lower risk for every possible choice of error costs.',
      'It recovers the full score-based ROC curve from a single confusion matrix.'
    ],
    answer: 0,
    explanation: 'ROC AUC is the area under the curve of recall (TPR) against false positive rate (FPR) as the threshold varies. It summarizes score ranking without selecting one operating threshold. The random-ranking reference has AUC 0.5 and perfect ranking has AUC 1. The user still chooses the final threshold using the application’s loss; a larger AUC does not guarantee smaller risk for every loss matrix.',
    activity: 'Does changing only the selected threshold change the ROC AUC of fixed scores on fixed labelled data? Answer: no. It changes the confusion matrix and the operating point, not the full score-based ROC curve.',
    slides: ['ROC AUC: Evaluation Before Choosing a Threshold', 'Why Pointwise Cost Minimization Minimizes Total Risk']
  },
  {
    section: 'Bayes decisions & risk',
    category: 'Calculation',
    prompt: 'In the chapter’s threshold example, FPR = 1 − T and TPR = 1 − T² for T between 0 and 1. What is the ROC AUC?',
    options: [
      '1/2.',
      '3/8.',
      '2/3.',
      '3/4.'
    ],
    answer: 2,
    explanation: 'Write u = FPR = 1 − T, so T = 1 − u. Then TPR = 1 − (1 − u)² = 2u − u². The area from u = 0 to u = 1 is AUC = [u² − u³/3] evaluated from 0 to 1 = 2/3. At T = 1/2 the ROC point is (1/2, 3/4); that one point does not determine the area. The minimum error 3/8 under equal priors is a different quantity.',
    activity: 'Raise T from 0.5 to 0.8. Answer: the ROC point moves from (0.5, 0.75) to (0.2, 0.36). FPR falls, but recall also falls, so the false-negative rate rises.',
    slides: ['ROC AUC: Evaluation Before Choosing a Threshold', 'Example: Evaluating a Threshold Classifier', 'Moving the Threshold Trades One Error for Another']
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
    explanation: 'Conditional on class and length, tokens are independent draws from the same categorical word distribution. The parameters satisfy θ_{i,k} ≥ 0 and Σ_i θ_{i,k} = 1. Counts summarize repeated tokens, but their fixed total Σ_i z_i = T couples them. The multinomial count likelihood is not a product of independent count marginals. The chapter assumes the same document-length distribution in every class and word probabilities independent of length. The common length factor therefore cancels from class comparisons; this does not require every possible length to be equally probable.',
    activity: 'For vocabulary (win, money, hello), convert “win money win” to counts. Answer: z = (2, 1, 0). Shuffling these tokens preserves z.',
    slides: ['Multinomial Naive Bayes: Problem and Assumptions', 'Word Probabilities and Their Estimation', 'Conditional Independence Leads to Word Counts']
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
    activity: 'Append one “hello”, whose spam-to-ham word-probability ratio is 1/5. Answer: the odds change from 6 to 6/5, giving spam posterior 6/11; spam is still preferred under 0–1 loss.',
    slides: ['Worked Mini-Example: Classifying ``win money\'\'', 'Multinomial Naive Bayes: Decision Rule', 'One More Word: How Does the Evidence Change?']
  }
];
