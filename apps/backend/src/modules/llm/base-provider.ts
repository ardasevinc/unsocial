type LLMProviderConfig = {
  apiKey: string;
  endpoint: string;
};

abstract class LLMProvider<Models, GenerationParameters> {
  abstract readonly models: Models;

  abstract set tools(value: Map<string, any>);
  abstract get tools(): Map<string, any>;

  constructor(protected readonly config: LLMProviderConfig) {}

  abstract generate(params: GenerationParameters): Promise<string | boolean>;
}

export { LLMProvider, type LLMProviderConfig };
