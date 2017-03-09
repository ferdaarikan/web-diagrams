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
  tested : false
};

const reducer = (state = initialState, action)=> {
  switch (action.type)
  {
    case "TEST_EVENT":{
        return {...state, testing:true}
      break;
    }
    case "TEST_DONE":{
      return {...state, tested:true, testing: false}
    break;
    }
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

ReactDOM.render( <Provider store={store}>
<App className="col-lg-12" />
</Provider>, document.getElementById('root') );
