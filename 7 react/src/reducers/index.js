import songsReducer from "./songs";
import formReducer from "./formData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  songs: songsReducer,
  formData: formReducer,
});

export default allReducers;
