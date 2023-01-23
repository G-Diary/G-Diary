import SignIn from '../../pages/SignIn'
import isLogin from './isLogin'

export default function PrivatePages({Component}) {
  return (
    isLogin() ? <Component /> : <SignIn />
  )
}