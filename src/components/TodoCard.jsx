import { Card, Checkbox, Grid } from "@mui/material";

const TodoCard = ({ todo }) => {
  const isTodo = Object.keys(todo).includes("completed");
  console.log(`isTodo`, isTodo);
  const { completed, id, title } = todo;

  const styles = {
    minWidth: 275,
    display: "flex",
    alignItems: "center",
    padding: 2,
    marginBottom: 1,
  };

  const handleChange = () => {
    console.log(`handleChange`, completed)
    // TODO: reassign completed = !completed
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
