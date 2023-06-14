export type UserMessage = {
  role: "user",
  content: string
}
export type SystemMessage = {
  role: "system",
  content: string
}
export type AssistantMessage = {
  role: "assistant",
  content: string | null,
  function_call?: {
    name: string,
    arguments: string
  }
}
export type FunctionMessage = {
  role: "function",
  name: string,
  content: string
}

export type ChatCompletionRequestMessage = UserMessage | SystemMessage | AssistantMessage | FunctionMessage

export type ChatCompletionRequestFunction = {
  name: string,
  description: string,
  parameters: {
    type: "object",
    properties: {
      [key: string]: {
        type: string,
        description: string
      }
    },
    required: string[],
  }
}
