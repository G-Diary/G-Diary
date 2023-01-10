import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GrimList from './pages/GrimList';
import WriteGrim from './pages/WriteGrim';
import Main from './pages/main';
import SignIn from './pages/signIn'
import SignUp from './pages/signUp';
import Manual from './pages/manual';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<Manual />} />
      <Route path="/write" element={<WriteGrim />} />
      <Route path="/list" element={<GrimList />} />
      {/* <Route path="/list/:userid" element={<GrimList />} /> */}
    </Routes>
  );
}

export default App;