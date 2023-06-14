export const getTodos = () => {
  // DBからデータを受け取る
  return [
    {
      id: 1,
      title: "請求書作成",
      created_at: "2021-06-13T12:00:00Z",
    }
  ]
}

export const addTodo = (todo: string) => {
  console.log(`addTodoが呼ばれた, todo: ${todo}`)
  // DBへ挿入を行う
  return {
    id: 1,
    title: todo,
    created_at: "2021-06-13T12:00:00Z",
  }
}
