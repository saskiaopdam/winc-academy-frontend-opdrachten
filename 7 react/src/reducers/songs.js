const songsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADDSONG":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default songsReducer;
