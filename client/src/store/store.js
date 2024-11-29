import { configureStore } from "@reduxjs/toolkit";
// import propertyReducer from "./reducer/propertyReducer";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;