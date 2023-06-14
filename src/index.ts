import axios from 'axios';
import { config } from 'dotenv';

config();

const prompt = `
あなたは、タスクの管理を行う私的な秘書です。
チャットボットのように振る舞ってください。

ユーザーへの返答を行う場合は、以下のルールに従ってください。
説明文は書かないでください。
一度に複数の会話を書かないでください。
あなたの側から話題を変えたり、
会話を終わらせようとは絶対にしません。
会話が続くようにします。
`

type UserMessage = {
  role: "user",
  content: string
}
type SystemMessage = {
  role: "system",
  content: string
}
type AssitantMessage = {
  role: "assistant",
  content: string | null,
  function_call: {
    name: string,
    arguments: string
  }
}
type FunctionMessage = {
  role: "function",
  name: string,
  content: string
}

type ChatCompletionRequestMessage = UserMessage | SystemMessage | AssitantMessage | FunctionMessage

type ChatCompletionRequestFunction = {
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

const messages: ChatCompletionRequestMessage[] = [
  {
    role: "system",
    content: prompt,
  },
  {
    role: "user",
    content: "「請求書の作成」をToDoに追加してください。",
  },
  {
    role: 'assistant',
    content: null,
    function_call: { name: 'insert_todo', arguments: '{\n  "title": "請求書の作成"\n}' }
  },
  {
    role: 'function',
    name: 'insert_todo',
    content: JSON.stringify({
      id: 1,
      title: "請求書の作成",
      created_at: "2021-06-13T12:00:00Z",
    })
  }
];

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

const run = async () => {
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
  console.log(response);
  console.log(response.data.choices[0]);
};

run()
