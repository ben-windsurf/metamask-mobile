import enContent from '../../../../locales/languages/en.json';

/**
 * Selector IDs for the SRP quiz get started modal elements.
 * Used for automated testing of the Secret Recovery Phrase security quiz introduction.
 */
export const SrpQuizGetStartedSelectorsIDs = {
  CONTAINER: 'quiz-get-started-modal',
  BUTTON: 'quiz-get-started-button',
  DISMISS: 'quiz-get-started-dismiss-button',
};

/**
 * Text selectors for the SRP quiz get started modal.
 * Contains localized text content used in the quiz introduction.
 */
export const SrpQuizGetStartedSelectorsText = {
  INTRODUCTION: enContent.srp_security_quiz.introduction,
};

/**
 * Selector IDs for the first SRP security quiz question modal elements.
 * Used for automated testing of the first question in the Secret Recovery Phrase security quiz.
 */
export const SrpSecurityQuestionOneSelectorsIDs = {
  CONTAINER: 'srp-question-one-modal',
  DISMISS: 'srp-question-one-dismiss-button',
  WRONG_ANSWER: 'srp-question-one-wrong-answer',
  RIGHT_ANSWER: 'srp-question-one-right-answer',
  WRONG_ANSWER_TRY_AGAIN_BUTTON: 'srp-question-one-wrong-answer-try-again',
  RIGHT_CONTINUE: 'srp-question-one-right-continue',
};

/**
 * Text selectors for the first SRP security quiz question.
 * Contains localized text content for question one including questions, answers, and response messages.
 */
export const SrpSecurityQuestionOneSelectorsText = {
  QUESTION: enContent.srp_security_quiz.question_one.question,
  RIGHT_ANSWER_RESPONSE_DESCRIPTION:
    enContent.srp_security_quiz.question_one.right_answer_description,
  RIGHT_ANSWER_RESPONSE_TITLE:
    enContent.srp_security_quiz.question_one.right_answer_title,
  WRONG_ANSWER_RESPONSE_DESCRIPTION:
    enContent.srp_security_quiz.question_one.wrong_answer_description,
  WRONG_ANSWER_RESPONSE_TITLE:
    enContent.srp_security_quiz.question_one.wrong_answer_title,
};

/**
 * Selector IDs for the second SRP security quiz question modal elements.
 * Used for automated testing of the second question in the Secret Recovery Phrase security quiz.
 */
export const SrpSecurityQuestionTwoSelectorsIDs = {
  CONTAINER: 'srp-question-two-modal',
  DISMISS: 'srp-question-two-dismiss-button',
  WRONG_ANSWER: 'srp-question-two-wrong-answer',
  RIGHT_ANSWER: 'srp-question-two-right-answer',
  WRONG_ANSWER_TRY_AGAIN_BUTTON: 'srp-question-two-wrong-answer-try-again',
  RIGHT_CONTINUE: 'srp-question-two-right-continue',
};

/**
 * Text selectors for the second SRP security quiz question.
 * Contains localized text content for question two including questions, answers, and response messages.
 */
export const SrpSecurityQuestionTwoSelectorsText = {
  QUESTION: enContent.srp_security_quiz.question_two.question,
  RIGHT_ANSWER_RESPONSE_DESCRIPTION:
    enContent.srp_security_quiz.question_two.right_answer_description,
  RIGHT_ANSWER_RESPONSE_TITLE:
    enContent.srp_security_quiz.question_two.right_answer_title,
  WRONG_ANSWER_RESPONSE_DESCRIPTION:
    enContent.srp_security_quiz.question_two.wrong_answer_description,
  WRONG_ANSWER_RESPONSE_TITLE:
    enContent.srp_security_quiz.question_two.wrong_answer_title,
};
