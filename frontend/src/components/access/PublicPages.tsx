import AfterLogin from '../Modal/AfterLogin'
import IsLogin from './IsLogin'

export default function PublicPages({Component, restricted} : any) {
  return (
    (IsLogin() && restricted) ? <AfterLogin /> : <Component />
  )
}