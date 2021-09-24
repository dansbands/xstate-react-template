import { createMachine, assign } from "xstate";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

function invokeFetchTodos() {
  const data = fetch(apiUrl)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(`err`, err));

  return data;
}

const todoStateMachine = createMachine({
  id: "todos",
  initial: "idle",
  context: {
    todos: [],
  },
  states: {
    idle: {},
    loading: {
      invoke: {
        id: "fetch-data",
        src: invokeFetchTodos,
        onDone: {
          target: "success",
          actions: assign({
            todos: (context, event) => event.data,
          }),
        },
        onError: "error",
      },
    },
    success: {},
    error: {},
  },
  on: {
    SUBMIT: {
      target: "loading",
    },
  },
});

export default todoStateMachine;