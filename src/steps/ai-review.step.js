export const config = {
  name: "AIReviewStep",
  type: "event",
  subscribes: ["ai-with-you.tests.completed"],
  emits: ["ai-with-you.review.completed"],
};

export const handler = async (input, { logger, emit }) => {
  logger.info("AIReviewStep received test results");

  const failed = input.tests?.success === false;
  const manualApproval =
    input.userDecision?.toUpperCase() === "YES";

  const approvalStatus = manualApproval
    ? "APPROVED"
    : failed
    ? "PENDING"
    : "APPROVED";

  const review = {
    reviewSummary: failed
      ? "Automated tests failed"
      : "All automated tests passed",
    issues: failed ? ["Some tests failed. See test logs."] : [],
    suggestion: failed
      ? "Fix failing tests and rerun"
      : "No issues found",
    approvalStatus,
  };

  await emit({
    topic: "ai-with-you.review.completed",
    data: review,
  });

  return review;
};
