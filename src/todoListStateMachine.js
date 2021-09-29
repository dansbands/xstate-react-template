import { createMachine, assign, send } from "xstate";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

function invokeFetchTodos() {
  const data = fetch(apiUrl)
    .then((res) => res.json())
    .catch((err) => console.log(`err`, err));

  return data;
}

function updateTodo(props) {
  console.log(`props`, props);
  // console.log(`todos`, todos);
  console.log(`todoListStateMachine`, todoListStateMachine);
}

const todoStateMachine = createMachine({
  id: "todo",
  initial: "unchecked",
  isChecked: false,
  states: {
    checked: {
      on: {
        TOGGLE: "unchecked",
        invoke: {
          id: "checking",
          src: updateTodo,
          isChecked: false
        },
      },
    },
    unchecked: {
      on: {
        TOGGLE: "checked",
        invoke: {
          id: "unchecking",
          src: updateTodo,
          isChecked: true
        },
      },
    },
  },
});

const todoListStateMachine = createMachine({
  id: "todoList",
  initial: "idle",
  context: {
    todos: [],
  },
  states: {
    idle: {},
    loading: {
      after: {
        1000: {
          target: "fetching", // gotta be a better way
        },
      },
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
    success: {
      invoke: {
        id: "todo",
        src: todoStateMachine,
        onDone: "done",
      },
      on: {
        TOGGLE: {
          actions: send("TOGGLE", { to: "todo" }),
        },
      },
    },
    error: {},
    done: {},
  },
  on: {
    SUBMIT: {
      target: "loading",
    },
  },
});

export default todoListStateMachine;
