const StateIndicator = ({ state }) => {
  let text;
  switch (state.value) {
    case "loading":
    case "fetching":
      text = "Loading...";
      break;
    case "success":
      text = "Form submitted successfully!!!";
      break;
    case "error":
      text = "Error!!!";
      break;
    default:
      text = "Waiting for input";
      break;
  }

  return <h3>{text}</h3>;
};

export default StateIndicator;
