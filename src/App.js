import './App.css';
import List from './components/List'
import EditItem from './components/EditItem';
import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

function App() {
  return (
   
    <React.Fragment>
       <Router>
        <Route exact path="/">
            <Redirect to="/services"/>
        </Route>
        <Route path="/services/:id" component={EditItem}/>
        <Route exact path="/services" component={List}/>
        
      </Router>
    </React.Fragment>
  );
}

export default App;
