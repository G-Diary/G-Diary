import React from 'react';
import styled from 'styled-components';
import { IntroduceContainer } from './IntroduceL';
function IntroduceR(){
  return(
    <IntroduceContainer>
      <ServiceImg src="images/introduce.png" alt="service"/>
      <ServiceInfo style={{marginTop: '20px'}}>
        1. 해당 날짜의 <span style={{color:'red', fontWeight:'600'}}>일기를 작성</span>해주세요!<br />
        2. AI가 일기에서<span style={{color:'red', fontWeight:'600'}}> 키워드를 추출</span>하여 그림리스트를<br />&nbsp;&nbsp;&nbsp;제공해요~<br />
        3. <span style={{color:'red', fontWeight:'600'}}>원하는 그림을 선택</span>하거나 <span style={{color:'red', fontWeight:'600'}}>직접그림을 그려서</span><br />&nbsp;&nbsp;&nbsp;&nbsp;일기를 완성해보세요!
      </ServiceInfo>
    </IntroduceContainer>)
}

export default IntroduceR;

const ServiceImg = styled.img`
  margin-top:10%;
  width: 90%;
  height: 45%;
  border: 3px dashed black;
  border-radius: 8px;
`

const ServiceInfo=styled.div`
  padding-top: 20px;
  text-align: start;
  line-height: 50px;
  width: 90%;
  height: 40%;
  font-size: 30px;
  font-family:KyoboHand;
  font-weight: bolder;
`