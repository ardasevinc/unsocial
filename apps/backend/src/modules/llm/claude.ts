import { Type, type Static } from '@sinclair/typebox';

const TClaudeMessages = Type.Array(
  Type.Object({
    role: Type.Union([Type.Literal('user'), Type.Literal('assistant')]),
    content: Type.Union([
      Type.String(),
      Type.Array(
        Type.Object({
          type: Type.Union([Type.Literal('text'), Type.Literal('image')]),
          source: Type.Optional(
            Type.Object({
              type: Type.Literal('base64'),
              media_type: Type.Union([
                Type.Literal('image/jpeg'),
                Type.Literal('image/png'),
                Type.Literal('image/gif'),
                Type.Literal('image/webp'),
              ]),
              data: Type.String({ contentEncoding: 'base64' }),
            }),
          ),
        }),
      ),
    ]),
  }),
);

enum ClaudeModels {
  OPUS = 'claude-3-opus-20240229',
  SONNET = 'claude-3-sonnet-20240229',
  HAIKU = 'claude-3-haiku-20240307',
}

const TClaudeGenerationParameters = Type.Object({
  model: Type.Readonly(Type.Enum(ClaudeModels)),
  apiKey: Type.Readonly(Type.String()),
  systemPrompt: Type.Readonly(Type.String()),
  temperature: Type.Readonly(Type.Number({ minimum: 0, maximum: 1.0 })),
  maxTokens: Type.Readonly(Type.Integer({ minimum: 1, maximum: 4096 })),
  stream: Type.ReadonlyOptional(Type.Boolean({ default: false })),
  messages: TClaudeMessages,
  metadata: Type.ReadonlyOptional(Type.Object({ user_id: Type.String() })),
  stopSequences: Type.ReadonlyOptional(Type.Array(Type.String())),
  topK: Type.ReadonlyOptional(Type.Integer()),
  topP: Type.ReadonlyOptional(Type.Number()),
  tools: Type.ReadonlyOptional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        description: Type.Optional(
          Type.String({
            description:
              "optional, but recommended description for what the tool does and doesn't",
          }),
        ),
        input_schema: Type.Any({
          description: 'valid JSON Schema for the tool',
        }),
      }),
    ),
  ),
});

const TClaudeApiBodyParameters = Type.Omit(TClaudeGenerationParameters, [
  'apiKey',
]);

enum StopReason {
  END_TURN = 'end_turn',
  MAX_TOKENS = 'max_tokens',
  STOP_SEQUENCE = 'stop_sequence',
  TOOL_USE = 'tool_use',
}

const TClaudeResponse = Type.Readonly(
  Type.Object({
    id: Type.String(),
    type: Type.Literal('message'),
    role: Type.Literal('assistant'),
    content: TClaudeMessages,
    model: Type.Enum(ClaudeModels),
    stop_reason: Type.Union([Type.Enum(StopReason)], Type.Null()),
    stop_sequence: Type.Union([Type.String(), Type.Null()]),
    usage: Type.Object({
      input_tokens: Type.Integer(),
      output_tokens: Type.Integer(),
    }),
  }),
);

enum ClaudeApiErrors {
  API_ERROR = 'api_error',
  AUTHENTICATION_ERROR = 'authentication_error',
  INVALID_REQUEST_ERROR = 'invalid_request_error',
  NOT_FOUND_ERROR = 'not_found_error',
  OVERLOADED_ERROR = 'overloaded_error',
  PERMISSION_ERROR = 'permission_error',
  RATE_LIMIT_ERROR = 'rate_limit_error',
}

const TClaudeErrorRespone = Type.Readonly(
  Type.Object({
    type: Type.Literal('error'),
    error: Type.Object({
      type: Type.Enum(ClaudeApiErrors),
      message: Type.Optional(Type.String()),
    }),
  }),
);

const generate = async ({
  model,
  apiKey,
  systemPrompt,
  temperature,
  maxTokens,
  stream = false,
  messages,
}: Static<typeof TClaudeGenerationParameters>) => {
  const endpoint = new URL('https://api.anthropic.com/v1/messages');
  const headers = new Headers();
  headers.set('x-api-key', apiKey);
  headers.set('Content-Type', 'application/json');
  headers.set('anthropic-version', '2023-06-01');

  const body = {
    model,
    messages,
    temperature: temperature,
    max_tokens: maxTokens,
    stream: stream,
    system: systemPrompt,
  };

  const response = await fetch(endpoint, {
    headers,
    body: JSON.stringify(body),
  });
  const completion = (await response.json()) as any;
  return completion[0].text;
};

export { generate };
