import React from 'react';
import GrimList from './pages/GrimList';
import WriteGrim from './pages/WriteGrim';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/'></Route>
      <Route path="/write" element={<WriteGrim />} />
      <Route path="/list" element={<GrimList />} />
      {/* <Route path="/list/:userid" element={<GrimList />} /> */}
    </Routes>
  );
}

export default App;
