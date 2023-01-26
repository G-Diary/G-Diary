import SignIn from '../../pages/SignIn'
import IsLogin from './IsLogin'

export default function PrivatePages({Component}) {
  return (
    IsLogin() ? <Component /> : <SignIn />
  )
}