import SignIn from '../../pages/SignIn'
import IsLogin from './IsLogin'

type Props = {
  Component: React.ComponentType<{}>; // Component가 React 컴포넌트인 경우, any 대신에 해당 컴포넌트의 Props 타입을 명시하는 것이 더 안전함
};


const PrivatePages: React.FC<Props> = ({ Component }) => {
  return (
    IsLogin() ? <Component/> : <SignIn />
  )
};

export default PrivatePages;