import SignIn from '../../pages/SignIn'
import IsLogin from './IsLogin'

export default function PrivatePages({ Component} : any ) {
  return (
    IsLogin() ? <Component /> : <SignIn />
  )
}