export default {
  id: "UserApprovalStep",

  run: async (input) => {
    const { userDecision } = input;

    if (!userDecision) {
      return {
        ...input,
        approvalStatus: "PENDING",
        message: "Waiting for user approval"
      };
    }

    if (userDecision === "YES") {
      return {
        ...input,
        approvalStatus: "APPROVED",
        message: "User approved AI changes"
      };
    }

    return {
      ...input,
      approvalStatus: "REJECTED",
      message: "User rejected AI changes"
    };
  },
};
