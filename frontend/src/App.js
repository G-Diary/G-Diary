import React from 'react';
import './App.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Main from './pages/main';
import SignIn from './pages/signIn'
import SignUp from './pages/signUp';
import Manual from './pages/manual';

function App() {
  return (
    <BrowserRouter>
      <div style={{width: '100%', height: 'auto'}}>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/signIn'>
            <SignIn />
          </Route>
          <Route path='/signUp'>
            <SignUp />
          </Route>
          <Route path='/manual'>
            <Manual />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;