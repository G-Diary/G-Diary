import React from 'react';
import styled from 'styled-components';
import { IntroduceContainer } from './IntroduceL';
function IntroduceR(){
  return(
    <IntroduceContainer>
      <ServiceWrapper>
        <ServiceImg src="images/introduce.png" alt="service"/>
      </ServiceWrapper>
      <ServiceInfo>
        1. 해당 날짜의 <span style={{color:'red', fontWeight:'600'}}>일기를 작성</span>해주세요!<br />
        2. AI가 일기에서<span style={{color:'red', fontWeight:'600'}}> 키워드를 추출</span>하여 그림리스트를<br />&nbsp;&nbsp;&nbsp;제공해요~<br />
        3. <span style={{color:'red', fontWeight:'600'}}>원하는 그림을 선택</span>하거나 <span style={{color:'red', fontWeight:'600'}}>직접그림을 그려서</span><br />&nbsp;&nbsp;&nbsp;&nbsp;일기를 완성해보세요!
      </ServiceInfo>
    </IntroduceContainer>)
}

export default IntroduceR;

const ServiceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`
const ServiceImg = styled.img`
  width: 35rem;
  border: 3px dashed black;
  border-radius: 8px;
  @media screen and (max-width: 1400px), screen (max-height: 500px){
    width: 30rem;
  }
  @media screen and (max-width: 1200px), screen (max-height: 400px){
    width: 20rem;
  }
`

const ServiceInfo=styled.div`
  box-sizing: border-box;
  padding: 25px;
  text-align: start;
  line-height: 50px;
  width: 100%;
  font-size: 30px;
  font-family:KyoboHand;
  font-weight: bolder;
  @media screen and (max-width: 1400px), screen (max-height: 500px){
    font-size: 25px;
    line-height: 40px;
  }
  @media screen and (max-width: 1200px), screen (max-height: 400px){
    font-size: 20px;
    line-height: 35px;
  }
`