import React, {useState} from 'react';
import styled from 'styled-components';
import Manuscript from './Manuscript';
import Emoji from './Emoji';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import Drawing from './Drawing';
import { useStore } from '../../store/store';
import api from '../../apis/axios';
import { format } from 'date-fns';

function DiaryContent(){
  const location = useLocation();
  const [grim, setGrim] = useState(true);  //그리기모드 버튼 클릭 여부
  const [title, setTitle]=useState(''); //제목
  const [content, setContent]=useState(''); //일기 내용
  const [weather, setWeather]=useState(); //날씨 선택
  const {updateCanvas}=useStore();
  const date=location.state?.date;
  let year=date.getFullYear();  //연도 구하기
  let todayMonth=date.getMonth()+1;  //월 구하기
  let todayDate=date.getDate();  //일 구하기
  
  const diaryData={
    'title': title,
    'weather': weather,
    'drawing_url': 'images/ateIcecream.png',
    'contents':content,
    'diary_date': format(date, 'yyyy-MM-dd')
  }
  console.log(diaryData);
  const user=sessionStorage.getItem('id');
  console.log(sessionStorage);
  //작성한 일기 보내기
  const grimDiary = () => {
    let form = new FormData();
    form.append('user_id',user);
    form.append('title',title);
    form.append('weather',weather);
    form.append('drawing_url','images/ateIcecream.png');
    form.append('contents',content);
    form.append('diary_date',format(date, 'yyyy-MM-dd'));

    api.post('diaries/', form)
      .then(function (response){
        console.log(response, JSON.stringify(response,null,7));
      })
      .catch(function (error){
        console.log(error);
      });
  }

  //제목 내용
  const onChange = (e)=>{
    setTitle(e.target.value);
  }
  
  //날씨 선택
  const weatherChange = (weatherName)=>{
    setWeather(weatherName);
  }
  //그리기 모드 버튼
  const clickedGrim = () => {
    setGrim((prev) => !prev);
  };

    
  return(
    <DiviContainer>
      <DateContainer>
        <Dateline>
          <Datetitle>DATE</Datetitle>
          {/* <DateContent>{year}.{todayMonth}.{todayDate}</DateContent> */}
          <DateContent>{year}.{todayMonth}.{todayDate}</DateContent>
          <Weathercontainer style={{marginTop: '5px'}}>
            <WeatherRadioBtn 
              type='radio' 
              id="sunny"
              checked={weather==='sunny'}
              onChange={()=>weatherChange(1)}
            />
            <label htmlFor="sunny">
              {weather===1?(<BsBrightnessHighFill size="29" color='red' />):(<BsBrightnessHighFill size="27" color='#8e8d8d'/>)}
            </label>
            <WeatherRadioBtn 
              type='radio' 
              id="cloudy"
              checked={weather==='cloudy'}
              onChange={()=>weatherChange(2)} 
            />
            <label htmlFor="cloudy">
              {weather===2?(  <BsFillCloudFill size="29" color='rgb(36 75 147)' />):(<BsFillCloudFill size="28" color='#8e8d8d' />)}
            </label>
            <WeatherRadioBtn 
              type='radio' 
              id="rainy"
              checked={weather==='rainy'}
              onChange={()=>weatherChange(3)}
            />
            <label htmlFor="rainy">
              {weather===3?(<BsFillCloudRainFill size="28" style={{paddingTop: '1.5px'}} color='rgb(76 76 76)' />):(<BsFillCloudRainFill size="26.5" style={{paddingTop: '1.5px'}} color='#8e8d8d' />)}
            </label>
            <WeatherRadioBtn 
              type='radio' 
              id="snow"
              checked={weather==='snow'}
              onChange={()=>weatherChange(4)} 
            />
            <label htmlFor="snow">
              {weather===4?( <BsFillCloudSnowFill size="28" style={{paddingTop: '2px'}} color='#FFFAFA' />):( <BsFillCloudSnowFill size="26" style={{paddingTop: '2px'}} color='#8e8d8d' />)}
            </label>
          </Weathercontainer>
        </Dateline>
      </DateContainer>
      <TitleContainer>
        <Title>Title: </Title>
        <Titlecontent><input type="text" onChange={onChange} value={title} /></Titlecontent>
        <Emoji />
      </TitleContainer>
      <Canvas>
        <Drawing grim={grim}/>
      </Canvas>
      <ButtonContainer>
        <Modebutton style={{width:'100px'}}>analyze</Modebutton>
        <Modebutton style={{width:'80px'}} onClick={clickedGrim}>{grim?'Drawing':'Stop'}</Modebutton>
        <Savebutton onClick={grimDiary}>Save</Savebutton>
      </ButtonContainer>
      <Content><Manuscript setContent={setContent}/></Content>
    </DiviContainer>
  );
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

export const Datetitle=styled.div`
    margin-left: 5%;
    width: 10%;
    font-size: 25px;
    text-align: center;
    font-family:Comic Sans MS;
`

export const DateContent = styled.div`
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

export const Weathercontainer = styled.div`
    width: 32%;
    text-align: right;
    margin-left: auto;
    padding-right: 8px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
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

export const Title =styled.div`
  margin-left: 5%;
  width: 10%;
  text-align: left;
  font-size: 25px;
  font-family:Comic Sans MS;
`

export const Titlecontent = styled.div`
  width: 70%;
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
  height: 290px;
  background: white;
  border-bottom-left-radius:10px;
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
  height: 280px;
`