import { config } from 'dotenv';
import { createInterface } from 'readline'
import { inputText } from 'src/api/apiHandler';

config();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', async (input) => {
  // ここで入力に対する処理を行います
  const response = await inputText(input);
  console.log(`ChatGPT: ${response}`);
  rl.close();
});
