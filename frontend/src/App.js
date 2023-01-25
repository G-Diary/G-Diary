import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import GrimList from './pages/GrimList';
import WriteGrim from './pages/WriteGrim';
import Main from './pages/Main';
import AfterLogin from './components/Modal/AfterLogin';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Manual from './pages/Manual';
import PrivatePages from './components/access/PrivatePages';
import PublicPages from './components/access/PublicPages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPages Component={Main}/>} />
      <Route path="/signin" element={<PublicPages Component={SignIn} restricted/>} />
      <Route path="/main/:id" element={<PrivatePages Component={AfterLogin}/>} />
      <Route path="/signup" element={<PublicPages Component={SignUp} restricted/>} />
      <Route path="/about" element={<PublicPages Component={Manual}/>} />
      <Route path="/write/:id" element={<PrivatePages Component={WriteGrim}/>} />
      <Route path="/list/:id" element={<PrivatePages Component={GrimList}/>} />
    </Routes>
  );
}

export default App;