import React from 'react';
import styled from 'styled-components';
import Manuscript from './Manuscript';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';

function DiaryContent(){
  return(
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>DATE</Datetitle>
          <Date>23.01.07</Date>
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
      <ButtonContainer>
        <Modebutton>그림모드</Modebutton>
        <Modebutton>위치조정</Modebutton>
        <Savebutton>Save</Savebutton>
      </ButtonContainer>
      <Content><Manuscript /></Content>
    </DiviContainer>
  )
}

export default DiaryContent;

/*두쪽 페이지 틀에서 한쪽 영역 컨테이너*/
const DiviContainer = styled.div`
    position: absolute;  
    width: 600px;
    height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 90;
`
/*날짜&날씨 container*/
const DateContainer=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 60px;
`

const Dateline=styled.div`
    width: 500px;
    height: 40px;
    background-color:#BCBCBC;
    padding-top: 3px;
    display: flex;
    align-items: center;
`

const Datetitle=styled.p`
    margin-left: 5%;
    width: 10%;
    font-size: 25px;
    text-align: center;
    padding-top: 3px;
`

const Date = styled.p`
    width: 25%;
    font-size: 25px;
    border: 2px solid transparent;
    padding-top: 3px;
    border-radius: 30px;
    background: #D9D9D9;
    margin-left: 3%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 90%;
    color: #959292;
`

const Weathercontainer = styled.p`
    width: 32%;
    text-align: right;
    margin-left: auto;
    padding-right: 5px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
`

/*제목 container*/
const TitleContainer = styled.div`
  width: 500px;
  height: 40px;
  background: #C7C7C7;
  display: flex;
  align-items: center;
`

const Title =styled.p`
  margin-left: 5%;
  width: 10%;
  text-align: left;
  font-size: 25px;
  padding-top: 3px;
`

const Titlecontent = styled.p`
  width: 77%;
  font-size: 25px;
  margin-left: 3%;
  padding-top: 3px;
`

/*그림판 container*/
const Canvas = styled.div`
  width: 500px;   
  height: 270px;
  background: white;
  border-bottom-left-radius:10px ;
  border-bottom-right-radius: 10px;
`

/*버튼 컨테이너(그림 편집)*/
const ButtonContainer = styled.div`
  width: 500px;
  height: 35px;
  display: flex;
  align-items: center;
  margin-top: 2%;
`
const Modebutton = styled.button`
  width: 75px;
  height: 33px;
  border-radius: 20px;
  font-size: 15px;
  text-align: center;
  background-color: transparent;
  margin-right: 1.5%;
  padding-top: 0.7%;
  border: 2px solid black;
  transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
  &:hover{
    box-shadow: 0 0 40px 40px  #404040 inset;
    color: white;
    border:none;
  }
`

const Savebutton = styled.button`
  position: relative;
  width: 110px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 15px;
  text-align: center;
  border: none;
  margin-left: auto;
  font-size: 15px;
  z-index:2;
  position: relative;
  overflow: hidden;
  transition: box-shadow, color 300ms ease-in-out;
  &:hover{
    color: rgb(54, 54, 54);
    background-color: transparent;
    border: 3px solid rgb(54, 54, 54);
  }
`
/*내용 container*/
const Content = styled.div`
  width: 520px;
  height: 300px;
`