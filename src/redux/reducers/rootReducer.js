import { combineReducers } from "redux";
import documentsReducer from "./documentsReducer";

const rootReducer = combineReducers({
  documents: documentsReducer,
});

export default rootReducer;
