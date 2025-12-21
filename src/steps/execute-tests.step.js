import simpleGit from "simple-git";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

export const config = {
  name: "ExecuteRepoTests",
  type: "event",
  subscribes: ["ai-with-you.start"],
  emits: ["ai-with-you.tests.completed"],
};

export const handler = async (input, { logger, emit }) => {
  const { githubUsername, repoName } = input;

  logger.info("ExecuteRepoTests started", { githubUsername, repoName });

  if (!githubUsername || !repoName) {
    throw new Error("githubUsername and repoName are required");
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ai-with-you-"));
  const repoPath = path.join(tempDir, repoName);
  const repoUrl = `https://github.com/${githubUsername}/${repoName}.git`;

  const git = simpleGit();
  await git.clone(repoUrl, repoPath);

  logger.info("Repository cloned", { repoPath });

  const run = (cmd) =>
    new Promise((resolve) => {
      exec(cmd, { cwd: repoPath, timeout: 60000 }, (err, stdout, stderr) => {
        const output = stdout || stderr || "";
        const passed =
          !err ||
          output.toLowerCase().includes("pass") ||
          output.toLowerCase().includes("passing");

        resolve({
          success: passed,
          logs: output,
        });
      });
    });

  logger.info("Installing dependencies");
  await run("npm install");

  logger.info("Running tests");
  const testResult = await run("npm test");

  await emit({
    topic: "ai-with-you.tests.completed",
    data: {
      tests: testResult,
      userDecision: input.userDecision, // forward decision
    },
  });

  return { tests: testResult };
};
