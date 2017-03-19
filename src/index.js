import * as SRD from "storm-react-diagrams";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import './index.css';
import './test.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initialState = {
  testing : false,
  tested : false,
  engine: {}
};

const reducer = (state = initialState, action)=> {
  switch (action.type)
  {
    case "TEST_EVENT":
        return {...state, testing:true}
      break;
    
    case "TEST_DONE":
      return {...state, tested:true, testing: false}
    break;     
    
 case "SET_ENGINE":
      return {...state, engine:action.payload }
    break;     
   case "ADD_NODE":
      var model = state.engine.getDiagramModel();
      console.log(model);
      model.addNode(node);      
      return {...state};//, engine:action.payload }
    break;
  default:        
  return {...state}
  }
  return state;
};

const middleware = applyMiddleware(logger(), thunk);
const store = createStore(reducer, middleware);
export default store;

store.dispatch({type: 'TEST_EVENT'});
setTimeout(()=> {
store.dispatch({type: 'TEST_DONE'})
}, 2000);


/////////////////////////
	
function nodeDefinition(name="node", color="gray", inputs=[], outputs=[], x = 0,y=0){
return {
  name: name,
  color:color,
  inputs: inputs,
  outputs: outputs,
  x:x,
  y:y
}
}

function nodeBuilder(definition){

	var node = new SRD.DefaultNodeModel(definition.name,definition.color); //
	
  definition.inputs.forEach(function(input) {
    console.log(input);
    node.addPort(new SRD.DefaultPortModel(true,input,input));
  }, this);

  definition.outputs.forEach(function(output) {
    console.log(output);
    node.addPort(new SRD.DefaultPortModel(false,output,output));
  }, this);

		node.x = definition.x;
		node.y = definition.y;
    return node;
}

const nodeTemplate = {
name: "", 
color: "", 
inputs:[], 
outputs:[],
x:0,
y:0
}

const def = nodeDefinition("myNode", "rgb(255,0,0)", ["in1", "in2"], ["out1", "out2"],
200,200);
console.log(def);
const node = nodeBuilder(def);
console.log(node);

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

		var idx = model.getNodes().length;
		node1.key = idx+1;
		node2.key = idx+2;
		port1.key = idx+1;
		port2.key = idx+2;
		link1.key = idx+1;

		//4) add the models to the root graph
		model.addNode(node1);
		model.addNode(node2);
		model.addLink(link1);        
	}
	    
  var engine = new SRD.DiagramEngine();
	engine.registerNodeFactory(new SRD.DefaultNodeFactory());
	engine.registerLinkFactory(new SRD.DefaultLinkFactory());

	//2) setup the diagram model
	var model = new SRD.DiagramModel();
	
  //console.log(this.props);

	for(var i =0;i < 2;i++){
		for(var j = 0;j < 2;j++){
			generateNodes(model, i*200, j*100);
		}
	}
			
	//5) load model into engine
	engine.setDiagramModel(model);
//console.log('RAISE ENGINE');
  //store.dispatch({type: 'SET_ENGINE', engine: engine });

//setTimeout(()=> {
  store.dispatch({type: 'SET_ENGINE', payload: engine });
//}, 4000);
//////////////////////////////////////////



  ReactDOM.render( <Provider store={store}>
<App className="col-lg-12" />
</Provider>, document.getElementById('root') );
