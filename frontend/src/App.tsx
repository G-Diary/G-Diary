import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import GrimList from './pages/GrimList';
import WriteGrim from './pages/WriteGrim';
import Main from './pages/Main';
import AfterLogin from './components/Modal/AfterLogin';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Manual from './pages/Manual';
import PrivatePages from './components/access/PrivatePages';
import PublicPages from './components/access/PublicPages';
import ErrorPage from './pages/ErrorPage';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Root from './pages/Root';

const theme = createTheme({
  typography: {
    fontFamily:'KyoboHand'
  }
})

const router= createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {path:'/', element:<PublicPages Component={Main} restricted={undefined}/>},
      {path:'/signin', element:<PublicPages Component={SignIn} restricted/>},
      {path:'/main', element:<AfterLogin />},
      {path:'/signup', element:<PublicPages Component={SignUp} restricted/>},
      {path:'/about', element:<PublicPages Component={Manual} restricted={undefined}/>},
      // {path:'/write', element:<PrivatePages Component={WriteGrim}/>},
      // {path:'/list', element:<PrivatePages Component={GrimList}/>},
      {path:'/write', element:<WriteGrim />},
      {path:'/list', element:<GrimList />},
    ]
  }
])

function App() {
  // window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;