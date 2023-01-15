import React, {useState} from 'react';
import styled from 'styled-components';
import Manuscript from './Manuscript';
import Drawing from './Drawing';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { useStore } from '../../store/store';
import Reposition from './Reposition';

function DiaryContent(){
  const [grim, setGrim] = useState(true);  //그리기모드 버튼 클릭 여부
  const [weather, setWeather]=useState(''); //날씨 선택
  const {currentCanvas}=useStore();
  const [move, setMove]=useState(true);
  let now=new Date();  //현재 날짜
  console.log(currentCanvas);

  let year=now.getFullYear();  //연도 구하기
  let todayMonth=now.getMonth()+1;  //월 구하기
  let todayDate=now.getDate();  //일 구하기

  //날씨 선택
  const weatherChange = (weatherName)=>{
    setWeather(weatherName);
  }

  //그리기 모드 버튼
  const clickedGrim = () => {
    setGrim((prev) => !prev);
  };

  //크기조절 모드 버튼
  const clickedMove = () =>{
    setMove((prev)=>!prev);
  }

  //그림 이미지화
  const saveAsPNG = () => {
    const image = currentCanvas.toDataURL('image/png');
    console.log(image);
  };
    
  return(
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>DATE</Datetitle>
          <DateContent>{year}.{todayMonth}.{todayDate}</DateContent>
          <Weathercontainer>
            <WeatherRadioBtn 
              type='radio' 
              id="sunny"
              checked={weather==='sunny'}
              onChange={()=>weatherChange('sunny')}
            />
            <label htmlFor="sunny">
              {weather==='sunny'?(<BsBrightnessHighFill size="29" color='red' />):(<BsBrightnessHighFill size="27" color='#8e8d8d'/>)}
            </label>
            <WeatherRadioBtn 
              type='radio' 
              id="cloudy"
              checked={weather==='cloudy'}
              onChange={()=>weatherChange('cloudy')} 
            />
            <label htmlFor="cloudy">
              {weather==='cloudy'?(  <BsFillCloudFill size="29" color='rgb(36 75 147)' />):(<BsFillCloudFill size="28" color='#8e8d8d' />)}
            </label>
            <WeatherRadioBtn 
              type='radio' 
              id="rainy"
              checked={weather==='rainy'}
              onChange={()=>weatherChange('rainy')}
            />
            <label htmlFor="rainy">
              {weather==='rainy'?(<BsFillCloudRainFill size="28" style={{paddingTop: '1.5px'}} color='rgb(76 76 76)' />):(<BsFillCloudRainFill size="26.5" style={{paddingTop: '1.5px'}} color='#8e8d8d' />)}
            </label>
            <WeatherRadioBtn 
              type='radio' 
              id="snow"
              checked={weather==='snow'}
              onChange={()=>weatherChange('snow')} 
            />
            <label htmlFor="snow">
              {weather==='snow'?( <BsFillCloudSnowFill size="28" style={{paddingTop: '2px'}} color='#FFFAFA' />):( <BsFillCloudSnowFill size="26" style={{paddingTop: '2px'}} color='#8e8d8d' />)}
            </label>
          </Weathercontainer>
        </Dateline>
      </DateContainer>
      <TitleContainer>
        <Title>Title: </Title>
        <Titlecontent><input type="text" /></Titlecontent>
      </TitleContainer>
      <Canvas>
        {/* <Drawing grim={grim}/> */}
        <Reposition move={move}/>
      </Canvas>
      <ButtonContainer>
        <Modebutton style={{width:'100px'}} onClick={clickedMove}>{move?'Reposition':'Stop'}</Modebutton>
        <Modebutton style={{width:'80px'}} onClick={clickedGrim}>{grim?'Drawing':'Stop'}</Modebutton>
        <Savebutton onClick={saveAsPNG}>Save</Savebutton>
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
    color: #4b4b4b;
    font-family:Comic Sans MS;
`

export const Weathercontainer = styled.p`
    width: 32%;
    text-align: right;
    margin-left: auto;
    padding-right: 8px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-top:20px;
`

export const WeatherRadioBtn = styled.input`
  display:none;
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
    color:#4b4b4b;
    caret-color: transparent;
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