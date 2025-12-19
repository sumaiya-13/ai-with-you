export default {
  id: "FinalResponseStep",

  run: async (input) => {
    return {
      success: true,
      reviewSummary: input.aiReview?.summary,
      issues: input.aiReview?.issues,
      suggestion: input.aiReview?.suggestion,
      approvalStatus: input.approvalStatus || "PENDING",
      message: input.message || "Review completed"
    };
  },
};
