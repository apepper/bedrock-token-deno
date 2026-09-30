# bedrock-token-deno

Generates short-term
[Amazon Bedrock API key](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys-generate.html)
bearer tokens from Deno, using AWS's official
[`@aws/bedrock-token-generator`](https://www.npmjs.com/package/@aws/bedrock-token-generator) npm package
(loaded via Deno's `npm:` specifier support).

Tokens are derived locally from your AWS credentials (env vars, shared config/credentials file,
IMDS, etc. via the default credential provider chain) and are valid for up to 12 hours. A token is
bound to the region it was generated for (via `AWS_REGION`, or the region resolved from the default
region provider chain if unset) and can't be used in a different region.

## Requirements

To run, whether via `deno task` or the compiled binary:

- AWS credentials available via the
  [default provider chain](https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html)
  (e.g. `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_SESSION_TOKEN`, or a configured
  profile via `AWS_PROFILE`), with permissions to call Bedrock.

To develop or compile the binary yourself, additionally:

- [Deno](https://deno.com/) 2.x

## Usage

Print a bearer token:

```sh
deno task token
```

Send a one-off message through the Bedrock Converse API using the token:

```sh
deno task converse "Hello, Claude"
```

## Compiling a standalone binary

```sh
deno task compile
AWS_REGION=eu-central-1 AWS_PROFILE=my-profile ./bedrock-token token
AWS_REGION=eu-central-1 AWS_PROFILE=my-profile ./bedrock-token converse "Hello, Claude"
```

This bundles the script and the Deno runtime into a single `bedrock-token` executable that doesn't
require Deno to be installed to run.

## Development

```sh
deno task fmt      # format
deno task lint     # lint
deno task check    # type-check
```
