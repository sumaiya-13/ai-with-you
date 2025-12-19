export default {
  id: "ValidateUserStep",

  run: async (input) => {
    const { userId, repoUrl } = input;

    if (!userId) {
      throw new Error("userId is required");
    }
    if (!repoUrl) {
      throw new Error("repoUrl is required");
    }

    return input;
  },
};
