import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import SignIn from './features/Auth/SignIn/SignIn';
import SignUp from './features/Auth/SignUp/SignUp';
import Home from './features/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/auth/signin">
            <SignIn />
          </Route>
          <Route path="/auth/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
