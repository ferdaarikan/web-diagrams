import * as SRD from "storm-react-diagrams";
//import * as React from "react";
import React, { Component } from 'react';
//import * as ReactDOM from "react-dom";


// declare var require: {
//     <T>(path: string): T;
//     (paths: string[], callback: (...modules: any[]) => void): void;
//     ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// };

//require("../test.scss");

//window.onload = () => {
		
	function generateNodes(model, offsetX,offsetY){
		//3-A) create a default node
		var node1 = new SRD.DefaultNodeModel("Node 1","rgb(0,192,255)"); //
		var port1 = node1.addPort(new SRD.DefaultPortModel(false,"out-1","Out1"));
        node1.addPort(new SRD.DefaultPortModel(false,"out-2","Out2"));
        node1.addPort(new SRD.DefaultPortModel(true,"in-1","in1"));
		node1.x = 100 + offsetX;
		node1.y = 100 + offsetY;

		//3-B) create another default node
		var node2 = new SRD.DefaultNodeModel("Node 2","rgb(192,255,0)");
		var port2 = node2.addPort(new SRD.DefaultPortModel(true,"in-1","IN"));
		node2.x = 200 + offsetX;
		node2.y = 100 + offsetY;

		//3-C) link the 2 nodes together
		var link1 = new SRD.LinkModel();
		link1.setSourcePort(port1);
		link1.setTargetPort(port2);

		//4) add the models to the root graph
		model.addNode(node1);
		model.addNode(node2);
		model.addLink(link1);        
	}
	    
	//6) render the diagram!
	//ReactDOM.render(element, document.body);
	
//}

class Diagram extends Component {

  render() {
//1) setup the diagram engine
    var engine = new SRD.DiagramEngine();
	engine.registerNodeFactory(new SRD.DefaultNodeFactory());
	engine.registerLinkFactory(new SRD.DefaultLinkFactory());

	//2) setup the diagram model
	var model = new SRD.DiagramModel();
	
	for(var i =0;i < 2;i++){
		for(var j = 0;j < 2;j++){
			generateNodes(model, i*200, j*100);
		}
	}
			
	//5) load model into engine
	engine.setDiagramModel(model);
	//var element = React.createElement(SRD.DiagramWidget,{diagramEngine: engine});
    var element = <SRD.DiagramWidget diagramEngine={engine}/>
                
        //engine.addListener( );
		SRD.DiagramEngineListener
    return ( element
      /*<div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload...
        </p>
      </div>*/
    );
  }
}

export default Diagram;