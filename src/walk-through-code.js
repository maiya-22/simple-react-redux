// instructions: use create-react-app to generate a react app.
// go to the App.js
// delete everything in the App.js file and replace it with this code:
// Go line by line to see what react-redux is doing. Then, the more complicated apps, where everything is in separate files should be easier to understand.

import React from "react";

// simulating a response to axios:
const axios = {};
axios.get = function(urlPath) {
  // return data asynch. It will either be a response with data, or an error
  // to simulate a success, make the timeOut on the "success" faster
};
const reactRedux = "react-redux";
const redux = "redux";

const initialState = {
  video: null,
  videoLoading: false,
  loggedIn: false // a lot of other properties for other components in the app
};

//this function is being passed to redux.createStore (ie where you store the state)
// the store, will then be passed to reactRedux.Provider. The Provider function will then act under the hood. Every time a "dispatch" function is fired, it will pass the current state to the reducer function.  When the reducer function returns a brand new state object, the provider will use that to update and setState where necessary.
// use the combine all reducers:  redux.combineReducers let allReducers = combineReducers({videos: videosReducer, users: usersReducer})
function reducer(state = initialState, action) {
  switch (action.type) {
    case "VIDEO_LOADING":
      return { ...state, videoLoading: true };
     case "SET_VIDEO":
     return { ...state, video: action.video, videoLoading: false };
     case "VIDEO_LOADING_ERROR":
     return { ...state, error: action.error, videoLoading: false };
    default:
      return state;
  }
}

const reduxThunk = "redux-thunk";
const applyMiddleware = redux.applyMiddleware;
const thunk = "thunk";
const store = redux.createStore(reducer, applyMiddleware(thunk)); //one tutorial is saying second arg can be initial state? and third would be dev tools on the window?
// under the hood, the thunk makes it so that when an asych promise event happens in an action function, the Provider is able to interact with the dispatch function.
console.log(store.getState())

// THE COMPONENT THAT NEEDS TO GET STATE FROM THE PROVIDER:
class Video extends React.Component {

    constructor(){
        super(props)
        this.setVideo = this.setVideo.bind(this)
    }

  setVideo(e){
    let info = "get some information from the e."
    this.props.loadVideo(info)
  }
  componentDidMount() {
    //set default video
  }
  render() {
    loadVideo=(e)=>{
     
    }
    return (
      <div>
        <div>
          <button onClick={this.setVideo}>load video titled Couple in the Morning</button>
        </div>
        <video src={this.props.video} />
      </div>
    );
  }
}


// This function will be passed to a function mapDispatchToProps that will be passed to the connect, that the component will be passed to, that will be passed to the Provider.
// action functions fire the dispatch function.
// the dispatch function passes a "type" object to the reducer function. The Provider passes the state to the reducer function when the dispatch action is fired. //disptacher
function loadVideoActionCreator(title){
    // format the url based on whatever info you're getting from the component:
    let url = `https://videos/${title.split(" ").join("-")}`
    // return a function that the Provider will later pass its dispatch function, and its getState function.
    return(dispatch, getState, title) => { //confused here, do you need the 'getState'?
        dispatch({type: "VIDEO_LOADING"}) ; 
        axios.get(url).then(res =>{
        dispatch({type: "SET_VIDEO", video: res.data})
        }).catch(err => {
        dispatch({type: "VIDEO_LOADING_ERROR", error: err.message})
    })
}


// simplified:
let loadVideoAction = {type: "SET_VIDEO", payload: {title: "Couple in the Morning"}}
store.dispatch(loadVideoAction)

// thie is where you will put the action functions. Then pass this function to the connect function
// creates this.props.loadVideo = loadVideoAction();
function MapActionsToProps() { //or map actions to props
    return {
        loadVideo: loadVideoActionCreator // not sure how you get params into this, actually.

        } 
}


// when it's passed to the connect, it creates  this.props.video: {} //whatever video is on the state being held in the store
function mapStateToProps(state) {
  return {
    video: state.video
  };
}

// the Video class is now not just a plain class. There's some stuff being done under the hood, so that when it is invoked inside the App component and react.Redux.Provider() scope, it will be the Provider function will be able to interact with its state.
Video = reactRedux.connect(mapStateToProps)(Video);
//.connect can take three args: mapStateToProps, mapDispatchToProps
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <reactRedux.Provider store={store}>
          <Video />
          {/* Other components go here, that use other properties in the initialState object */}
        </reactRedux.Provider>
      </div>
    );
  }
}

export default App;
