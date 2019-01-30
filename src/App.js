import React, { Component } from "react";
import Counter from "./Counter";
import "./App.css";
import { createStore } from "redux";
import { Provider } from "react-redux";

// stores the state .. parameter == a function that tells what the initial state is and what the changes are to be.

const initialState = { count: 0, name: "Jerry" };

// reducer formats and returns a state object
function reducer(state = initialState, action) {
  //action = {type: "CAPITAL_STRING"}
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
const store = createStore(reducer); //this sets the store to equal the state of whatever the reducer function returns

// this can be a stateless function now:
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Counter />
        </div>
      </Provider>
    );
  }
}

export default App;
