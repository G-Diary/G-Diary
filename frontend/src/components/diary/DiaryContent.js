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
          <DateContent>23.01.07</DateContent>
          <Weathercontainer>
            <BsBrightnessHighFill size="27" color='red' 
              onMouseOver={({target})=>target.style.color='#ff7e7e'}  
              onMouseOut={({target})=>target.style.color='red'} />
            <BsFillCloudFill size="27" color="#4E5D79" 
              onMouseOver={({target})=>target.style.color='#7b869d'}  
              onMouseOut={({target})=>target.style.color='#4E5D79'}/>
            <BsFillCloudRainFill size="26" color="#5A5A5A" style={{paddingTop: '1.5px'}} 
              onMouseOver={({target})=>target.style.color='#919191'}  
              onMouseOut={({target})=>target.style.color='#5A5A5A'}/>
            <BsFillCloudSnowFill size="25" color='#FFFAFA' style={{paddingTop: '2px'}}
              onMouseOver={({target})=>target.style.color='#e2dfdf'}  
              onMouseOut={({target})=>target.style.color='#FFFAFA'}/>
          </Weathercontainer>
        </Dateline>
      </DateContainer>
      <TitleContainer>
        <Title>Title: </Title>
        <Titlecontent><input type="text" /></Titlecontent>
      </TitleContainer>
      <Canvas></Canvas>
      <ButtonContainer>
        <Modebutton style={{width:'80px'}}>Drawing</Modebutton>
        <Modebutton style={{width:'100px'}}>Reposition</Modebutton>
        <Savebutton>Save</Savebutton>
      </ButtonContainer>
      <Content><Manuscript /></Content>
    </DiviContainer>
  )
}

export default DiaryContent;

/*두쪽 페이지 틀에서 한쪽 영역 컨테이너*/
export const DiviContainer = styled.div`
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
export const DateContainer=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 60px;
`

export const Dateline=styled.div`
    width: 500px;
    height: 40px;
    background-color:#BCBCBC;
    display: flex;
    align-items: center;
    border-radius: 3px;
`

export const Datetitle=styled.p`
    margin-left: 5%;
    width: 10%;
    font-size: 25px;
    text-align: center;
    font-family:Comic Sans MS;
`

export const DateContent = styled.p`
    width: 25%;
    font-size: 23px;
    border: 2px solid transparent;
    border-radius: 30px;
    background: #D9D9D9;
    margin-left: 6%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 90%;
    color: #959292;
    font-family:Comic Sans MS;
`

export const Weathercontainer = styled.p`
    width: 32%;
    text-align: right;
    margin-left: auto;
    padding-right: 5px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
`

/*제목 container*/
export const TitleContainer = styled.div`
  width: 500px;
  height: 40px;
  background: #C7C7C7;
  display: flex;
  align-items: center;
  border-top-left-radius: 3px;
  border-top=right-radius: 3px;
  font-family:Comic Sans MS;
`

export const Title =styled.p`
  margin-left: 5%;
  width: 10%;
  text-align: left;
  font-size: 25px;
  font-family:Comic Sans MS;
`

export const Titlecontent = styled.p`
  width: 77%;
  margin-left: 4%;
  >input{
    width: 100%;
    margin-bottom:0.5%;
    font-size: 24px;
    border: 0;
    outline: none;
    background: transparent;
    font-family:Comic Sans MS;
  }
`

/*그림판 container*/
export const Canvas = styled.div`
  width: 500px;   
  height: 270px;
  background: white;
  border-bottom-left-radius:10px ;
  border-bottom-right-radius: 10px;
`

/*버튼 컨테이너(그림 편집)*/
export const ButtonContainer = styled.div`
  width: 500px;
  height: 25px;
  display: flex;
  align-items: center;
  margin-top: 2%;
`
export const Modebutton = styled.button`
  width: 75px;
  height: 30px;
  border-radius: 20px;
  font-size: 15px;
  text-align: center;
  background-color: transparent;
  margin-right: 1.5%;
  border: 2px solid black;
  transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
  font-family:Comic Sans MS;
  padding-bottom:0.5%;
  &:hover{
    box-shadow: 0 0 40px 40px  #404040 inset;
    color: white;
    border:none;
  }
`

export const Savebutton = styled.button`
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
  padding-bottom:0.5%;
  z-index:2;
  position: relative;
  overflow: hidden;
  transition: box-shadow, color 300ms ease-in-out;
  font-family:Comic Sans MS;
  &:hover{
    color: rgb(54, 54, 54);
    background-color: transparent;
    border: 3px solid rgb(54, 54, 54);
  }
`
/*내용 container*/
export const Content = styled.div`
  width: 520px;
  height: 300px;
`