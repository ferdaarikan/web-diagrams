import * as SRD from "storm-react-diagrams";
//import * as React from "react";
import React, { Component } from 'react';
//import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';

//require("../test.scss");
	
@connect((store)=>{
	return {
		user: 'ferda',
		engine: store.engine 
	//	store: store
	}
})
class Diagram extends Component {

  render() {

	console.log('Rendering diagram');
	console.log(this.props);
    var element = <SRD.DiagramWidget diagramEngine={this.props.engine}/>
               
    return ( element
    );
  }
}

export default Diagram;