import React from 'react';
import AfterLogin from '../Modal/AfterLogin';
import IsLogin from './IsLogin';

type Props = {
  Component: React.ComponentType<{}>; // Component가 React 컴포넌트인 경우, any 대신에 해당 컴포넌트의 Props 타입을 명시하는 것이 더 안전함
  restricted: boolean; // restricted가 boolean 타입임을 명시
};

const PublicPages: React.FC<Props> = ({ Component, restricted }) => {
  return (
    (IsLogin() && restricted) ? <AfterLogin /> : <Component />
  )
};

export default PublicPages;