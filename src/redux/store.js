import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";

// import thunk from "redux-thunk";
// let composeEnhancers;

// if (typeof window !== "undefined") {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// } else {
//   composeEnhancers = compose;
// }

// const store = createStore(userReducer, composeEnhancers());
// const store = createStore(userReducer);
// console.log(store.getState());
import thunk from "redux-thunk";
let composeWithDevTools;
composeWithDevTools = require("redux-devtools-extension").composeWithDevTools;
const store = createStore(
  rootReducer,
  // userReducer,

  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
