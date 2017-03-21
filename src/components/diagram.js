import * as SRD from "storm-react-diagrams";
//import * as React from "react";
import React, { Component } from 'react';
//import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';

//require("../test.scss");
	
@connect((store)=>{
	return {		
		engine: store.engine,
		version:store.engine.version	
	}
})
class Diagram extends Component {

  render() {

	console.log('Rendering diagram ', name);
	console.log(this.props);

    var element = <SRD.DiagramWidget diagramEngine={this.props.engine}/>
               
    return ( element );
		
  }
}

export default Diagram;