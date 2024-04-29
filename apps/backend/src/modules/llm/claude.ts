import { Type, Static } from '@sinclair/typebox';

const TClaudeMessages = Type.Array(
  Type.Object({
    role: Type.Union([Type.Literal('user'), Type.Literal('assistant')]),
    content: Type.String(),
  }),
);

const TClaudeGenerationParameters = Type.Object({
  model: Type.Readonly(
    Type.Union([
      Type.Literal('claude-3-opus-20240229'),
      Type.Literal('claude-3-sonnet-20240229'),
      Type.Literal('claude-3-haiku-20240307'),
    ]),
  ),
  apiKey: Type.Readonly(Type.String()),
  systemPrompt: Type.Readonly(Type.String()),
  temperature: Type.Readonly(Type.Number({ minimum: 0, maximum: 1.0 })),
  maxTokens: Type.Readonly(Type.Integer({ minimum: 1, maximum: 4096 })),
  stream: Type.ReadonlyOptional(Type.Boolean({ default: false })),
  messages: TClaudeMessages,
});

export const generate = async ({
  model,
  apiKey,
  systemPrompt,
  temperature,
  maxTokens,
  stream = false,
  messages,
}: Static<typeof TClaudeGenerationParameters>) => {
  const endpoint = 'https://api.anthropic.com/v1/messages';
  const headers = new Headers({
    'x-api-key': apiKey,
    'content-type': 'application/json',
  });
  const body = {
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
