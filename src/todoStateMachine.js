import { createMachine, assign } from "xstate";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

function invokeFetchTodos() {
  const data = fetch(apiUrl)
    .then((res) => res.json())
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
      after: {
        1000: {
          target: 'fetching' // gotta be a better way
        }
      }
    },
    fetching: {
      invoke: {
        id: "fetch-data",
        src: invokeFetchTodos,
        onDone: {
          target: "success",
          actions: assign({
            todos: (_context, event) => event.data,
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
