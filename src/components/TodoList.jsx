const TodoList = ({ todos, success }) => {
  const renderedItems = () => {
    return success ? (
      todos.map((todo) => {
        return <p>{todo.title}</p>;
      })
    ) : (
      <p>Something went wrong</p>
    );
  };
  
  return renderedItems();
};

export default TodoList;