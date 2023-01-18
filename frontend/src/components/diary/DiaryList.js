import React from 'react';
import Manuscript from './Manuscript';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { Content, DateContainer, Dateline, Datetitle, DiviContainer, Weathercontainer, DateContent, TitleContainer, Title, Titlecontent, Canvas, Modebutton } from './DiaryContent';
import { ChoiceButtonContainer } from './GrimChoice';

function DiaryList(){
  return(
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>DATE</Datetitle>
          <DateContent>23.01.07</DateContent>
          <Weathercontainer>
            <BsBrightnessHighFill size="27" color='red' />
            <BsFillCloudFill size="27" color="#4E5D79" />
            <BsFillCloudRainFill size="26" color="#5A5A5A" style={{paddingTop: '1.5px'}} />
            <BsFillCloudSnowFill size="25" color='#FFFAFA' style={{paddingTop: '2px'}}/>
          </Weathercontainer>
        </Dateline>
      </DateContainer>
      <TitleContainer>
        <Title>Title: </Title>
        <Titlecontent></Titlecontent>
      </TitleContainer>
      <Canvas></Canvas>
      <ChoiceButtonContainer style={{height: '25px' ,marginTop:'2%', marginLeft:'2.2%'}}>
        <Modebutton style={{width: '130px', height:'30px'}}>Post on SNS</Modebutton>
      </ChoiceButtonContainer>
      <Content><Manuscript /></Content>
    </DiviContainer>
  )
}

export default DiaryList;