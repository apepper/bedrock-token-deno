import { getBedrockToken } from "./token.ts";

/**
 * Sends a single-turn message to a Bedrock model via the Converse API,
 * authenticating with a short-term bearer token instead of SigV4 request
 * signing. Mirrors the "automatic refresh" example from the AWS docs:
 * https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys-generate.html
 */
export async function converse(
  message: string,
  options: { region?: string; modelId?: string } = {},
): Promise<unknown> {
  const region = options.region ?? Deno.env.get("AWS_REGION") ?? "eu-central-1";
  const modelId = options.modelId ?? "eu.anthropic.claude-sonnet-5";

  const url = `https://bedrock-runtime.${region}.amazonaws.com/model/${modelId}/converse`;
  const payload = {
    messages: [
      {
        role: "user",
        content: [{ text: message }],
      },
    ],
  };

  const token = await getBedrockToken();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Bedrock Converse request failed: ${response.status} ${response.statusText} - ${await response
        .text()}`,
    );
  }

  return await response.json();
}
