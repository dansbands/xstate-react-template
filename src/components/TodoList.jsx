import TodoCard from "./TodoCard";

const TodoList = ({ todos, success }) => {
  const completed = { id: 1, title: "All tasks completed!!!" };

  const renderedItems = () => {
    return success ? (
      todos.map((todo) => {
        return <TodoCard key={todo.id} todo={todo} />;
      })
    ) : (
      <TodoCard todo={completed} />
    );
  };

  return renderedItems();
};

export default TodoList;
