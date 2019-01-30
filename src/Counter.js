import React, { Component } from "react";
import { connect } from "react-redux";

class Counter extends Component {
  increment = () => {
    this.props.dispatch({ type: "INCREMENT" });
  };
  decrement = () => {
    this.props.dispatch({ type: "DECREMENT" });
  };
  render() {
    return (
      <div>
        <h3>Counter for {this.props.name}</h3>
        <div className="counter-frame">
          <div className="decrement button" onClick={this.decrement}>
            -
          </div>
          <div className="count">{this.props.count}</div>
          <div className="increment button" onClick={this.increment}>
            +
          </div>
        </div>
      </div>
    );
  }
}

// is this what lets you know which state properties you want on your props object?
const mapStateToProps = state => {
  return {
    name: state.name,
    count: state.count
  };
};

export default connect(mapStateToProps)(Counter); //wires up so that the redux store (where the state is stored) will be able to update state
// because the Provider component (with the store/or state prop) is a parent component, this connect will connect to the state and the changes in state.

// do not want redux to provide all the info in the entire state, so use the "mapStateToProps" function
