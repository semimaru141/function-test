import axios from 'axios';
import { AssistantMessage, ChatCompletionRequestFunction, ChatCompletionRequestMessage } from 'src/api/apiParam';

const functions: ChatCompletionRequestFunction[] = [
  {
    name: "insert_todo",
    description: "Insert a new todo",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The title of the todo",
        }, 
      },
      required: ['title'],
    }
  },
  {
    name: "get_todos",
    description: "Get all todos",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    }
  }
];

export const sendRequest = async (messages: ChatCompletionRequestMessage[]): Promise<AssistantMessage> => {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo-0613",
    messages,
    functions
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
    }
  });
  return response.data.choices[0].message;
};

