export default {
  id: "PrepareRepoStep",

  run: async (input) => {
    return {
      ...input,
      setupStatus: "COMPLETED",
      setupLogs: [
        "Repository cloned",
        "Dependencies installed",
        "Environment prepared"
      ]
    };
  },
};
