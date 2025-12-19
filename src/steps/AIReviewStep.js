export default {
  id: "AIReviewStep",

  run: async (input) => {
    const { repoUrl } = input;

    // Simulated test + run output
    const fakeTestOutput = `
    Tests Failed:
    - auth.test.js: login validation failed
    - db.test.js: connection timeout
    `;

    // Simulated AI review (tomorrow we make this real)
    const aiReview = {
      summary: "Found issues in authentication and database handling.",
      issues: [
        "Login validation logic is incomplete",
        "Database connection timeout not handled properly",
      ],
      suggestion: "I can fix these issues by improving validation and adding retry logic."
    };

    return {
      ...input,
      testOutput: fakeTestOutput,
      aiReview,
    };
  },
};
