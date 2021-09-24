const TodoList = ({ todos, success }) => {
  const renderedItems = () => {
    return success ? (
      todos.map((todo) => {
        return <p key={todo.id}>{todo.title}</p>;
      })
    ) : (
      <p>All tasks completed!!!</p>
    );
  };

  return renderedItems();
};

export default TodoList;