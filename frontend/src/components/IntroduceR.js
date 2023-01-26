import React from 'react';
import styled from 'styled-components';
import { IntroduceContainer } from './IntroduceL';
function IntroduceR(){
  return(
    <IntroduceContainer>
      <ServiceImg src="images/introduce.png" alt="service" />
      <ServiceInfo>
        1. <span style={{color:'red', fontWeight:'600'}}>Write</span> a diary for that day. <br />
        2. <span style={{color:'red', fontWeight:'600'}}>AI imports the picture</span> that corresponds &nbsp;&nbsp;&nbsp;&nbsp;to what you create. <br />
        3. Complete the Grim diary by <span style={{color:'red', fontWeight:'600'}}>choosing the &nbsp;&nbsp;picture you want!</span>
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
  font-size: 25px;
  font-family:KyoboHand;
  font-weight: bolder;
`