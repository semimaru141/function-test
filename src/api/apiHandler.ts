import { sendRequest } from "src/api/api";
import { ChatCompletionRequestMessage } from "src/api/apiParam";
import { SYSTEM_PROMPT } from "src/api/const";
import { addTodo, getTodos } from "src/function";

export const inputText = async (input: string) => {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    },
    {
      role: 'user',
      content: input
    }
  ]
  while(true) {
    const response = await sendRequest(messages);
    if(response.function_call !== undefined) {
      const result = await functionHandler(response.function_call.name, JSON.parse(response.function_call.arguments));
      messages.push({
        role: "function",
        name: response.function_call.name,
        content: JSON.stringify(result)
      });
    } else {
      return response.content;
    }
  }
}

export const functionHandler = async (functionName: string, args: {
  title?: string
}) => {
  switch(functionName) {
    case "get_todos": {
      return getTodos();
    }
    case "insert_todo": {
      if(args.title != undefined) {
        return addTodo(args.title);
      } else {
        throw new Error("Invalid arguments");
      }
    }
  }
}

