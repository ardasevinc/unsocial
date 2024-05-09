import { type ClaudeResponse } from './claude.js';

type LLMProviderConfig = {
  apiKey: string;
  endpoint: string;
};

abstract class LLMProvider<Models, GenerationParameters, Response> {
  abstract readonly models: Models;

  abstract set tools(value: Map<string, any>);
  abstract get tools(): Map<string, any>;

  constructor(protected readonly config: LLMProviderConfig) {}

  abstract generate(params: GenerationParameters): Promise<Response>;
}

export { LLMProvider, type LLMProviderConfig };
