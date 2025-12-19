import type { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'AI-With-You API',
  type: 'api',
  path: '/hello',
  method: 'POST',
  description: 'Triggers AI-With-You workflow',

  // REQUIRED by Motia even if unused
  emits: [],

  // Directly trigger your workflow
  flows: ['ai_with_you_flow'],

  responseSchema: {
    200: z.object({
      success: z.boolean(),
      reviewSummary: z.string().optional(),
      issues: z.array(z.string()).optional(),
      suggestion: z.string().optional(),
      approvalStatus: z.string(),
      message: z.string()
    })
  }
};

// IMPORTANT: no emit, no context destructuring
export const handler: Handlers['HelloAPI'] = async (input) => {
  // Normalize input (Motia sometimes nests body)
  const data = input?.body ?? input;

  const decision = String(data?.userDecision || "")
    .trim()
    .toUpperCase();

  const approved = decision === "YES";

  return {
    status: 200,
    body: {
      success: true,
      reviewSummary: "Found issues in authentication and database handling.",
      issues: [
        "Login validation logic is incomplete",
        "Database connection timeout not handled properly"
      ],
      suggestion: "I can fix these issues by improving validation and adding retry logic.",
      approvalStatus: approved ? "APPROVED" : "PENDING",
      message: approved
        ? "User approved AI changes"
        : "Waiting for user approval"
    }
  };
};
