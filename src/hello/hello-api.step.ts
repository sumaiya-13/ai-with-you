import type { ApiRouteConfig, Handlers } from "motia";
import { z } from "zod";

export const config: ApiRouteConfig = {
  name: "AI-With-You API",
  type: "api",
  path: "/hello",
  method: "POST",
  description: "Starts AI-With-You automated review workflow",

  // REQUIRED by Motia
  emits: [],

  flows: ["ai_with_you_flow"],

  responseSchema: {
    200: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
};

export const handler: Handlers["HelloAPI"] = async (input, { emit, logger }) => {
  const data = input?.body ?? input;

  logger.info("AI-With-You API API received request", data);

  // 🔥 Start the workflow
  await emit({
    topic: "ai-with-you.start",
    data,
  });

  return {
    status: 200,
    body: {
      success: true,
      message: "Workflow started. Repository is being analyzed.",
    },
  };
};
