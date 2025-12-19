export default {
  id: "PrepareRepoStep",

  run: async (input) => {
    return {
      ...input,
      repoStatus: "Repository prepared (simulated)",
    };
  },
};
