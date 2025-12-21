export const config = {
  name: "FinalResponseStep",
  type: "event",
  subscribes: ["ai-with-you.review.completed"],
  emits: [],
};

export const handler = async (input, { logger }) => {
  logger.info("FinalResponseStep reached");

  // ✅ Correct string logging
  logger.info(`FINAL REVIEW SUMMARY: ${input.reviewSummary}`);
  logger.info(`APPROVAL STATUS: ${input.approvalStatus}`);

  if (Array.isArray(input.issues) && input.issues.length > 0) {
    input.issues.forEach((issue, i) => {
      logger.info(`ISSUE ${i + 1}: ${issue}`);
    });
  } else {
    logger.info("No issues found");
  }

  return input;
};
