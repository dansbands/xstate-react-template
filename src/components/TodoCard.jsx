import { Card, Checkbox, Grid } from "@mui/material";
import { useMachine } from "@xstate/react";
import todoListStateMachine from "../todoListStateMachine";

const TodoCard = ({ todo }) => {
  const [current, send] = useMachine(todoListStateMachine);

  const isTodo = Object.keys(todo).includes("completed");
  // console.log(`todo`, todo);
  const { completed, id, title, toggleCompleted } = todo;

  const styles = {
    minWidth: 275,
    display: "flex",
    alignItems: "center",
    padding: 2,
    marginBottom: 1,
  };

  const handleChange = event => {
    console.log(`handleChange`, event.target.checked)
    // TODO: reassign completed = !completed
    send('TOGGLE')
    console.log(`current`, current)
  }

  return (
    <Card variant="outlined" sx={styles} key={id}>
      <Grid item md={1}>
        {isTodo && <Checkbox checked={completed} onChange={handleChange} />}
      </Grid>
      <Grid item md={11}>
        {title}
      </Grid>
    </Card>
  );
};

export default TodoCard;
