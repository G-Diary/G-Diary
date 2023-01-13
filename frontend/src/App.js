import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import GrimList from './pages/GrimList';
import WriteGrim from './pages/WriteGrim';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Manual from './pages/Manual';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
<<<<<<< HEAD
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Manual" element={<Manual />} />
=======
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<Manual />} />
>>>>>>> frontend
      <Route path="/write" element={<WriteGrim />} />
      <Route path="/list" element={<GrimList />} />
      {/* <Route path="/list/:userid" element={<GrimList />} /> */}
    </Routes>
  );
}

export default App;