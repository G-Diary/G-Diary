import React, {useEffect} from 'react';
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
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  typography: {
    fontFamily:'KyoboHand'
  }
})

function App() {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<PublicPages Component={Main}/>} />
        <Route path="/signin" element={<PublicPages Component={SignIn} restricted/>} />
        <Route path="/main" element={<PrivatePages Component={AfterLogin}/>} />
        <Route path="/signup" element={<PublicPages Component={SignUp} restricted/>} />
        <Route path="/about" element={<PublicPages Component={Manual}/>} />
        <Route path="/write" element={<PrivatePages Component={WriteGrim}/>} />
        <Route path="/list" element={<PrivatePages Component={GrimList}/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;