import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import todoListStateMachine from "./todoListStateMachine";
import { useMachine } from "@xstate/react";
import TodoList from "./components/TodoList";
import StateIndicator from "./components/StateIndicator";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Toolbar,
} from "@mui/material";

// TODO: Add second state machine for TodoCard
// TODO: Add ability to remove completed or show only completed

function App() {
  const [current, send] = useMachine(todoListStateMachine);
  const success = current.matches("success");
  const { todos } = current.context;

  return (
    <Box sx={{ flexGrow: 1 }} className="App">
      <AppBar sx={{ marginBottom: 5 }} color="transparent" position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            XState React Sandbox
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Grid item>
          <Button variant="contained" onClick={() => send("SUBMIT")}>Submit</Button>
          <StateIndicator state={current} />
          <TodoList success={success} todos={todos} />
        </Grid>
      </Container>
    </Box>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
