const formReducer = (
  state = {
    title: "",
    artist: "",
    genre: "",
    rating: "",
  },
  action
) => {
  switch (action.type) {
    case "UPDATEFORM":
      return {
        ...state,
        [action.name]: action.value,
      };

    case "RESETFORM":
      return {
        ...state,
        [action.title]: "",
        [action.artist]: "",
        [action.genre]: "",
        [action.rating]: "",
      };

    default:
      return state;
  }
};

export default formReducer;
