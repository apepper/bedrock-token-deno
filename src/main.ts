import { getBedrockToken } from "./token.ts";
import { converse } from "./converse.ts";

async function main() {
  const [command, ...rest] = Deno.args;

  switch (command) {
    case "token": {
      const token = await getBedrockToken();
      console.log(token);
      break;
    }
    case "converse": {
      const message = rest.join(" ") || "Hello";
      const result = await converse(message);
      console.log(JSON.stringify(result, null, 2));
      break;
    }
    default: {
      console.error("Usage: bedrock-token token | bedrock-token converse <message>");
      Deno.exit(1);
    }
  }
}

if (import.meta.main) {
  await main();
}
