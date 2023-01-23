import Main from '../../pages/Main'
import isLogin from './isLogin'

export default function PublicPages({Component, restricted}) {
  return (
    (isLogin() && restricted) ? <Main /> : <Component />
  )
}