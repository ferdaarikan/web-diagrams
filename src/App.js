import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./test.scss";
import Diagram from './components/diagram'
import store from './index'

function clickHandler(e){
  console.log(e.target.name);  
  switch (e.target.name) {
    case "btnnode1":
      store.dispatch({type: "ADD_NODE", payload: "node1" });
      break;
  case "btnnode2":
      store.dispatch({type: "ADD_NODE", payload: "node2" });
      break;
    default:
      break;
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Welcome</h2>          
        </div>
        <p className="App-intro">intro         
        </p>
               <div className="col-lg-2">
                <button name="btnnode1" onClick={clickHandler}>add node1</button>                  
                <button name="btnnode2" onClick={clickHandler}>add node2</button>                  
               </div>
               <Diagram className="col-lg-10"/> 
      </div>      
    );
  }
}

export default App;
