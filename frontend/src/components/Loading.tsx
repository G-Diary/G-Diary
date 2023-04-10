import React from 'react';
import styled from 'styled-components';
function Loading(){
  return (
    <Background>
      <LoadingText>LOADING</LoadingText>
      <img src="images/loading.gif" alt="로딩중" width='6%' />
    </Background>
  );
};
const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  // background: #F1F2F3;
  background: #ffffffb7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  z-index:99;
`;
const LoadingText = styled.div`
  // font: 2rem "Noto Sans KR";
  font: "Noto Sans KR";
  font-size: 40px;
  text-align: center;
  font-weight: 700;
`;
export default Loading;