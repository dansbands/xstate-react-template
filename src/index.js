import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import todoStateMachine from "./todoStateMachine";
import { useMachine } from "@xstate/react";
import TodoList from "./components/TodoList";
import StateIndicator from "./components/StateIndicator";

function App() {
  const [current, send] = useMachine(todoStateMachine);
  const success = current.matches("success");
  const { todos } = current.context;

  return (
    <div className="App">
      <h1>XState React Sandbox</h1>
      <button onClick={() => send("SUBMIT")}>Submit</button>{" "}
      <StateIndicator state={current} />
      <TodoList success={success} todos={todos} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
