import { getTokenProvider } from "@aws/bedrock-token-generator";

/**
 * Reusable token provider. Uses the default AWS credentials and region
 * providers (env vars, shared config/credentials files, IMDS, etc.).
 * https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys-generate.html
 */
const provideToken = getTokenProvider();

/**
 * Fetches a short-term Bedrock bearer token (valid up to 12 hours).
 */
export async function getBedrockToken(): Promise<string> {
  return await provideToken();
}
