const StateIndicator = ({ state }) => {
  console.log(`StateIndicator`, state.value);
  let text;
  switch (state.value) {
    case "loading":
      text = "Loading...";
      break;
    case "success":
      text = "Form submitted successfully!!!";
      break;
    case "error":
      text = "Error!!!";
      break;
    default:
      text = "Nothing happening here";
      break;
  }

  return <h3>{text}</h3>;
};

export default StateIndicator;
