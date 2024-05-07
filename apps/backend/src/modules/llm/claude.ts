import { Type, type Static } from '@sinclair/typebox';
import { Nullable, ValidationError } from '@/lib/types.js';
import { LLMProvider, LLMProviderConfig } from './base-provider.js';
import { Check } from '@sinclair/typebox/value';

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

enum ClaudeModel {
  OPUS = 'claude-3-opus-20240229',
  SONNET = 'claude-3-sonnet-20240229',
  HAIKU = 'claude-3-haiku-20240307',
}

const TClaudeTool = Type.Object({
  name: Type.String(),
  description: Type.Optional(
    Type.String({
      description:
        "optional, but recommended description for what the tool does and doesn't",
    }),
  ),
  input_schema: Type.Any(),
});

type ClaudeTool = Static<typeof TClaudeTool>;

const TClaudeGenerationParameters = Type.Object({
  model: Type.Readonly(Type.Enum(ClaudeModel)),
  systemPrompt: Type.Readonly(Type.String()),
  temperature: Type.Readonly(Type.Number({ minimum: 0, maximum: 1.0 })),
  maxTokens: Type.Readonly(Type.Integer({ minimum: 1, maximum: 4096 })),
  stream: Type.ReadonlyOptional(Type.Boolean({ default: false })),
  messages: TClaudeMessages,
  metadata: Type.ReadonlyOptional(Type.Object({ user_id: Type.String() })),
  stopSequences: Type.ReadonlyOptional(Type.Array(Type.String())),
  topK: Type.ReadonlyOptional(Type.Integer()),
  topP: Type.ReadonlyOptional(Type.Number()),
});

const TClaudeApiBodyParameters = Type.Composite([
  TClaudeGenerationParameters,
  Type.Object({ tools: Type.Optional(TClaudeTool) }),
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
    content: Type.Readonly(
      Type.Array(
        Type.Object({
          type: Type.String({
            description:
              'the only value possible right now is `text` but kept as generic string for future compatibility as to not break the validation if this changes',
          }),
          text: Type.String(),
        }),
      ),
    ),
    model: Type.Enum(ClaudeModel),
    stop_reason: Nullable(Type.Enum(StopReason)),
    stop_sequence: Nullable(Type.String()),
    usage: Type.Object({
      input_tokens: Type.Integer(),
      output_tokens: Type.Integer(),
    }),
  }),
);

type ClaudeResponse = Static<typeof TClaudeResponse>;

enum ClaudeApiError {
  API_ERROR = 'api_error',
  AUTHENTICATION_ERROR = 'authentication_error',
  INVALID_REQUEST_ERROR = 'invalid_request_error',
  NOT_FOUND_ERROR = 'not_found_error',
  OVERLOADED_ERROR = 'overloaded_error',
  PERMISSION_ERROR = 'permission_error',
  RATE_LIMIT_ERROR = 'rate_limit_error',
}

const TClaudeErrorResponse = Type.Readonly(
  Type.Object({
    type: Type.Literal('error'),
    error: Type.Object({
      type: Type.Enum(ClaudeApiError),
      message: Type.Optional(Type.String()),
    }),
  }),
);

type GenerateReturnParameters = {
  completion: Static<typeof TClaudeResponse>;
};

class ClaudeError extends Error {
  readonly type;
  constructor(type: ClaudeApiError | ValidationError, ...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClaudeError);
    }

    this.name = 'ClaudeError';
    this.type = type;
  }
}

class Anthropic extends LLMProvider<
  typeof ClaudeModel,
  Static<typeof TClaudeGenerationParameters>
> {
  readonly models = ClaudeModel;
  private _tools: Map<string, ClaudeTool> = new Map();

  get tools() {
    return this._tools;
  }

  set tools(value) {
    this._tools = value;
  }

  constructor({ apiKey, endpoint }: LLMProviderConfig) {
    super({ apiKey, endpoint });
  }

  async generate({
    model,
    systemPrompt,
    temperature,
    maxTokens,
    stream,
    messages,
    metadata,
    stopSequences,
    topK,
    topP,
  }: Static<typeof TClaudeGenerationParameters>) {
    const endpoint = new URL(this.config.endpoint);
    const headers = new Headers();
    headers.set('x-api-key', this.config.apiKey);
    headers.set('Content-Type', 'application/json');
    headers.set('anthropic-version', '2023-06-01');

    const body = {
      model,
      messages,
      temperature: temperature,
      max_tokens: maxTokens,
      stream: stream,
      system: systemPrompt,
      metadata,
      stop_sequences: stopSequences,
      top_k: topK,
      top_p: topP,
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const isClaudeErrorResponse = Check(TClaudeErrorResponse, responseData);
      if (isClaudeErrorResponse) {
        const { error } = responseData;
        throw new ClaudeError(error.type);
      } else {
        throw new ClaudeError(
          ValidationError.ERROR_RESPONSE_VALIDATION_ERROR,
          `Error Response Validation Failed. statusCode: ${response.status}, statusText: ${response.statusText}`,
        );
      }
    } else if (Check(TClaudeResponse, responseData)) {
      return responseData;
    } else {
      throw new ClaudeError(
        ValidationError.RESPONSE_VALIDATION_ERROR,
        `Response Validation Failed statusCode: ${response.status}, statusText: ${response.statusText}`,
      );
    }
  }
}

export { Anthropic, type ClaudeResponse };
